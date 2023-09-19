from rest_framework.decorators import (
    api_view,
    # authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Count
from django.db.models import Q
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from rest_framework.response import Response

from .models import (Focus, Comment, Share, Serie)
from users.models import ProfilUser
from users.serializers import ProfilUserSerializer
from .serializers import (
    FocusSerializer,
    CommentSerializer,
    ShareSerializer,
    SerieSerializer,
)
from Professionnels.models import Professionnel
from Etudiants.models import Etudiants
from .compressed import compress_audio, compres_image
from api.models import Category

import os
import uuid
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

from django.utils.text import slugify
from django.core.files import File


# Create focus
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_focus(request):
    """create focus"""
    description = request.data.get("description")
    categorie = request.data.get("categorie")
    prof_id = request.data.get("prof_id")
    payant = request.data.get("payant")
    audio_file = request.FILES.get("audio")
    titre = request.data.get("titre")
    # bg = request.FILES.get("bg")

    if None in [prof_id, titre, description, audio_file, payant]:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # try:
    #     prof_data = Professionnel.objects.get(id=request.data.get("prof_id"))
    # except Professionnel.DoesNotExist:
    #     return Response(
    #         {"error": "Professionnel does not exists"},
    #         status=status.HTTP_400_BAD_REQUEST,
    #     )

    # Convert payant to a boolean value
    payant = bool(payant)

    # Get or create the category with a unique slug based on the name
    category_name = (
        categorie or "Podcasts"
    )  # Use 'Podcasts' as the default category name if not provided
    slug = slugify(category_name)
    categori_get, _ = Category.objects.get_or_create(
        name=category_name, defaults={"slug": slug}
    )

    # Compresser l'audio
    compressed_audio_path = compress_audio(audio_file)

    # Enregistrer le fichier audio compressé dans le modèle Focus
    focus = Focus.objects.create(
        professionnel=prof_id, titre=titre, description=description
    )

    # Ouvrir le fichier compressé
    with open(compressed_audio_path, "rb") as compressed_file:
        # Enregistrer le fichier dans le champ podcast
        focus.podcast.save(compressed_audio_path.name, File(compressed_file))

    # Supprimer le fichier temporaire
    os.remove(compressed_audio_path)
    serielizer = FocusSerializer(focus, many=False)
    return Response(serielizer.data)


# create focus and add image in the cloudianry
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_focus_cloudinary(request):
    description = request.data.get("description")
    categorie = request.data.get("categorie")
    prof_id = request.data.get("prof_id")
    payant = request.data.get("payant", False)
    audio_file = request.FILES.get("audio")
    titre = request.data.get("titre")
    bg = request.FILES.get("bg")

    if None in [prof_id, titre, description, audio_file, payant]:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        prof_data = Professionnel.objects.get(id=request.data.get("prof_id"))
    except Professionnel.DoesNotExist:
        return Response(
            {"error": "Professionnel does not exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Convert payant to a boolean value
    payant = bool(payant)

    # Get or create the category with a unique slug based on the name
    category_name = (
        categorie or "Podcasts"
    )  # Use 'Podcasts' as the default category name if not provided
    slug = slugify(category_name)
    categori_get, _ = Category.objects.get_or_create(
        name=category_name, defaults={"slug": slug}
    )

    # Enregistrez la nouvelle instance de Focus dans la base de données.
    focus = Focus.objects.create(
        id=uuid.uuid4(),
        professionnel=prof_data,
        titre=titre,
        description=description,
        payant=payant,
        categorie=categori_get,
    )
    # comprese audio
    compressed_audio_path = compress_audio(audio_file)
    # Upload the podcast file to Cloudinary. resource_type='auto',
    result_audio = upload(
        compressed_audio_path, resource_type="video", folder="podcasts"
    )
    podcast_url, options = cloudinary_url(
        result_audio["public_id"],
        format=result_audio["format"],
        resource_type="video"
    )

    focus.podcast = podcast_url
    # Fermer et supprimer le fichier compressé après l'upload
    os.remove(compressed_audio_path)

    #  Upload du background compressé vers Cloudinary.
    if bg is not None:
        # comprese image
        compressed_img = compres_image(bg)
        # upload image to cloudinary
        result_img = upload(compressed_img, folder="bg")
        bg_url, options = cloudinary_url(
            result_img["public_id"], format=result_img["format"]
        )
        focus.bg = bg_url

    # Save the focus instance after setting all fields
    focus.save()

    serielizer = FocusSerializer(focus, many=False)
    return Response(serielizer.data)


# Delete focus
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_focus(request, id):
    try:
        # Get id UserPublication
        focus = Focus.objects.get(id=id)
    except Focus.DoesNotExist:
        return Response({"message": "Focus does not found"}, status=404)
    # delete UserPublication
    focus.delete()
    return Response(
        {"message": "Focus deleted successfully"},
        status=status.HTTP_200_OK
    )


# List_all_focus
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_focus(request):
    try:
        focus = Focus.objects.all().order_by("-createdAt")[:10]
    except Focus.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = FocusSerializer(focus, many=True)
    return Response(serializer.data)


# List_all_focus by professionel_id
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_focus_pro(request, id):
    try:
        focus_pro = Professionnel.objects.get(id=id)
    except Professionnel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    focus = focus_pro.focus_professionnel.all().order_by("-createdAt")
    serializer = FocusSerializer(focus, many=True)
    return Response(serializer.data)


# Create Like Focus
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def likes_focus(request):
    user = request.data.get("user_id")
    focus_id = request.data.get("focus_id")

    if user is None or focus_id is None:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # fetch user
    try:
        user = ProfilUser.objects.get(id=user)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not found"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # fetch focus
    try:
        focus = Focus.objects.get(id=focus_id)
    except Focus.DoesNotExist:
        return Response(
            {"message": "Focus not found"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # condion
    if user in focus.liked_by.all():
        focus.liked_by.remove(user)
    else:
        focus.liked_by.add(user)

    focus_serializer = FocusSerializer(focus)
    return Response(focus_serializer.data, status=status.HTTP_200_OK)


# =================COMMENT==============
# Create comment
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_comment(request):
    try:
        focus = Focus.objects.get(id=request.data.get("focus_id"))
    except Focus.DoesNotExist:
        return Response(
            {"message": "Focus not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if "user_id" not in request.data:
        return Response(
            {"message": "user_id is required "},
            status=status.HTTP_404_NOT_FOUND
        )
    try:
        user = ProfilUser.objects.get(id=request.data.get("user_id"))
    except ProfilUser.DoesNotExist:
        return
    # Check if request has comment text
    if "comment_text" not in request.data:
        return Response({"message": "Comment text is required"}, status=400)

    comment_text = request.data["comment_text"]
    comment = Comment.objects.create(
        focus=focus,
        user=user,
        comment_text=comment_text)
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# Update a comment
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response(
            {"message": "Comment does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = CommentSerializer(comment, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete a comment
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response(
            {"message": "Comment does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    comment.delete()
    return Response(
        {"message": "Delete Successful"},
        status=status.HTTP_204_NO_CONTENT
    )


# Create list_all_comment
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_all_comment(request, focus_id):
    try:
        focus = Focus.objects.get(id=focus_id)
    except Focus.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    comments = Comment.objects.filter(focus=focus).order_by("-createdAt")
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


# ======================SHARE========================


# Create Share
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_share(request):
    # récupérer les données de la requête
    data = request.data

    # extraire les champs "focus_id" et "user_id"
    focus_id = data.get("focus_id")
    user_id = data.get("user_id")

    # valider les données extraites
    if not focus_id or not user_id:
        return Response(
            {"error": 'Le champ "focus_id" et "user_id" sont obligatoires.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # récupérer les instances de Focus et ProfilUser correspondantes
        focus = Focus.objects.get(id=focus_id)
        user = ProfilUser.objects.get(id=user_id)
    except (Focus.DoesNotExist, ProfilUser.DoesNotExist):
        return Response(
            {"error": "Focus ou Utilisateur introuvable."},
            status=status.HTTP_404_NOT_FOUND,
        )

    description = request.data.get("description")
    # créer une instance de Share en utilisant les données valides
    share = Share.objects.create(
        focus=focus,
        user=user,
        description=description
    )
    serializer = ShareSerializer(share)
    return Response(serializer.data)


#  Update Share
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_share(request, share_id):
    # récupérer l'instance de Share correspondante à l'ID
    try:
        share = Share.objects.get(id=share_id)
    except Share.DoesNotExist:
        return Response(
            {"error": "Partage introuvable."}, status=status.HTTP_404_NOT_FOUND
        )

    if request.data.get("description") is not None:
        share.description = request.data["description"]
    # valider les données de la requête
    share.save()
    serializer = ShareSerializer(share)
    return Response(serializer.data)


# Delete Share
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_share(request, share_id):
    try:
        share = Share.objects.get(id=share_id)
    except Share.DoesNotExist:
        return Response({"detail": "Share not found."}, status=404)
    share.delete()
    return Response({"message": "Delete Successful"}, status=204)


# Focus number listen
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_listen(request):
    user = request.data.get("user_id")
    focus_id = request.data.get("focus_id")
    if user is None or focus_id is None:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        focus = Focus.objects.get(id=focus_id)
    except Focus.DoesNotExist:
        return Response(
            {"detail": "Focus not found."}, status=status.HTTP_404_NOT_FOUND
        )

    duration = request.data.get("duration", None)
    # if user.is_authenticated and duration and int(duration) >= 10:
    if duration and int(duration) >= 10:
        focus.add_listen(user)
        serializer = FocusSerializer(focus)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(
        {"detail": "Invalid request."},
        status=status.HTTP_400_BAD_REQUEST
    )


# get listened users
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_listened_users(request, focus_id):
    try:
        focus = Focus.objects.get(id=focus_id)
    except Focus.DoesNotExist:
        return Response(
            {"detail": "Focus not found."}, status=status.HTTP_404_NOT_FOUND
        )

    users = focus.number_listen.all()
    serializer = ProfilUserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# GET one focus
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_one_focus(request, id):
    try:
        focus = Focus.objects.get(id=id)
    except Focus.DoesNotExist:
        return Response(status=404)
    serializer = FocusSerializer(focus, many=False)
    return Response(serializer.data)


# GET one focus by category
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_one_focus_by_category(request, id):
    try:
        category = Category.objects.get(id=id)
        focus = Focus.objects.filter(categorie=category)
    except Focus.DoesNotExist:
        return Response(status=404)
    serializer = FocusSerializer(focus, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_focus_ofProf_by_category(request, category, id):
    try:
        # Get the Category and Professionnel objects
        categorie = Category.objects.get(name=category)
        prof = Professionnel.objects.get(id=id)

        # Retrieve all the focus items for
        # the specified Category and Professionnel
        focus = Focus.objects.filter(categorie=categorie, professionnel=prof)

        # Serialize the queryset using the FocusSerializer
        serializer = FocusSerializer(focus, many=True)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response({"message": "Category not found"}, status=404)
    except Professionnel.DoesNotExist:
        return Response({"message": "Professionnel not found"}, status=404)
    except Focus.DoesNotExist:
        return Response(
            {"message":
                "No focus items found for this category and professional"},
            status=404,
        )


# focus plus populaire
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def get_focus_populaire(request):
    try:
        top_focused = (
            Focus.objects.annotate(num_likes=Count("liked_by"))
            .order_by("-num_likes")
            .order_by("-createdAt")[:10]
        )
    except Focus.DoesNotExist:
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = FocusSerializer(top_focused, many=True)
    return Response(serializer.data)


# focus populaire by categorie
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def focus_populaire_category(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Récupérer la liste des IDs des catégories de l'utilisateur
    user_categories_ids = user.categories.values_list("id", flat=True)

    # Récupérer les Focus qui ont la même catégorie
    # que l'utilisateur, triés par ordre décroissant du nombre total
    # de liked_by et number_listen
    focus_list = (
        Focus.objects.filter(categorie_id__in=user_categories_ids)
        .annotate(
            total_likes=Count("liked_by"),
            total_listens=Count("number_listen"))
        .order_by("-total_likes", "-total_listens", "-createdAt")[:10]
    )

    serializer = FocusSerializer(focus_list, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_preferred_focus(request):
    student = Etudiants.objects.get(id=request.data.get("etudiant_id"))
    if student is None:
        return Response(
            {"error": "user is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    student_preferences = student.preferences.all()
    all_focus = Focus.objects.all()
    preferred_focus = []
    for focus in all_focus:
        focus_category = focus.categorie
        # focus_views = focus.number_listen.all().count()
        # focus_likes = focus.liked_by.all().count()
        if student_preferences.filter(category=focus_category).exists():
            focus_data = {
                "title": focus.titre,
                "description": focus.description,
                "category": focus.categorie.name,
                "views": focus.number_listen.count(),
                "likes": focus.liked_by.count(),
            }
            preferred_focus.append(focus_data)
    return Response(preferred_focus)


# Focus professionnel followed
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_followed_professionals_focuses(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    professionnels_followed = user.followers.filter(
        professeur__isnull=False
    ).values_list("professeur__id", flat=True)
    focus_followed = Focus.objects.filter(
        Q(professionnel_id__in=professionnels_followed)
    ).order_by("-createdAt")[:10]
    serializer = FocusSerializer(focus_followed, many=True)
    return Response(serializer.data)


#  Focus popular
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_popular_focus(request):
    # obtenir les 10 focus les plus populaires
    popular_focus = Focus.objects.annotate(
        num_listen=Count("number_listen")).order_by(
            "-num_listen", "-createdAt"
        )[:10]
    serializer = FocusSerializer(popular_focus, many=True)
    return Response(serializer.data)


#  New focus days
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_new_focus_today(request, id):
    try:
        # Récupérer l'utilisateur étudiant connecté
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Récupérer les préférences de catégorie de l'étudiant
    preferred_categories = user.categories.all()

    # Récupérer les focuses créés aujourd'hui pour
    # l'étudiant dans ses catégories préférées
    all_focus = Focus.objects.filter(
        createdAt__date=datetime.date.today(),
        categorie__id__in=preferred_categories
    ).order_by("-createdAt")
    serializer = FocusSerializer(all_focus, many=True)
    return Response(serializer.data)


# FOCUS new 24h
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_focus_last_24H(request, id):
    try:
        # Récupérer l'utilisateur étudiant connecté
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Récupérer les professionnels que l'étudiant suit
    professionnels_suivis = Professionnel.objects.filter(
        user__in=user.followers.all())

    # Calculer la date et l'heure d'il y a 24 heures
    date_limite = datetime.now() - timedelta(hours=24)

    # Récupérer les nouveaux focus de
    # professionnels depuis les dernières 24 heures
    nouveaux_focus = Focus.objects.filter(
        professionnel__in=professionnels_suivis, createdAt__gte=date_limite
    ).order_by("-createdAt")
    serializer = FocusSerializer(nouveaux_focus, many=True)
    return Response(serializer.data)


# FOCUS recommandation
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_focus_recommandation(request, id):
    try:
        # Récupérer l'utilisateur étudiant connecté
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Get the IDs of the professionals that the user is following
    following_ids = user.followers.all().values_list("id", flat=True)
    # Récupérer les professionnels que l'étudiant suit
    prof_suivis = Professionnel.objects.filter(user__in=following_ids)

    # Get the categories of the authenticated user
    user_categories = user.categories.all()
    # Récupérer les nouveaux focus de pr
    # ofessionnels depuis les dernières 24 heures
    nouveaux_focus = (
        Focus.objects.exclude(professionnel__in=prof_suivis)
        .filter(categorie__in=user_categories)
        .order_by("-createdAt")
    )
    serializer = FocusSerializer(nouveaux_focus, many=True)
    return Response(serializer.data)


# =================================SERIE==========================================


# creation de serie
@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def create_serie(request):
    # variable
    titre = request.data.get("titre")
    prof_id = request.data.get("prof_id")
    description = request.data.get("description")

    # if prof id doest exist
    if prof_id is None or titre is None:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        prof = Professionnel.objects.get(id=prof_id)
    except Professionnel.DoesNotExist:
        return Response(
            {"detail": "professionnel not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    # Créer une instance de Série avec les informations fournies
    serie = Serie.objects.create(
        professionnel=prof, titre=titre, description=description
    )

    # return serie data
    serializer = SerieSerializer(serie, many=False)
    return Response(serializer.data)


# update serie
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_serie(request, serie_id):
    try:
        serie = Serie.objects.get(id=serie_id)
    except Serie.DoesNotExist:
        return Response(
            {"error": "serie introuvable."}, status=status.HTTP_404_NOT_FOUND
        )

    # titre
    if request.data.get("titre") is not None:
        serie.titre = request.data["titre"]

    # description
    if request.data.get("description") is not None:
        serie.description = request.data["description"]

    # valider les données de la requête
    serie.save()
    serializer = SerieSerializer(serie, many=False)
    return Response(serializer.data)


# delete serie
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_serie(request, serie_id):
    try:
        serie = Serie.objects.get(id=serie_id)
    except Serie.DoesNotExist:
        return Response(
            {"error": "serie introuvable."}, status=status.HTTP_404_NOT_FOUND
        )

    # delete serie
    serie.delete()
    return Response({"message": "Delete Successful"},
                    status=status.HTTP_204_NO_CONTENT)


# get all serie
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_serie(request):
    try:
        series = Serie.objects.all().order_by("-createdAt")
    except Serie.DoesNotExist:
        return Response(
            {"error": "serie introuvable."}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = SerieSerializer(series, many=True)
    return Response(serializer.data)


# get serie by user id
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_serie_by_user_id(request, user_id):
    try:
        user = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not found"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        prof = Professionnel.objects.get(user=user)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "rofessionnel not found"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # filter serie
    series = Serie.objects.filter(professionnel=prof)

    serializer = SerieSerializer(series, many=True)
    return Response(serializer.data)


# get serie by profesionel id
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_serie_by_prof_id(request, prof_id):
    try:
        prof = Professionnel.objects.get(id=prof_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "proffesionel not found"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # filter serie
    series = Serie.objects.filter(professionnel=prof)

    serializer = SerieSerializer(series, many=True)
    return Response(serializer.data)


# get one serie
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_one_serie(request, serie_id):
    try:
        serie = Serie.objects.get(id=serie_id)
    except Serie.DoesNotExist:
        return Response(
            {"error": "serie introuvable."}, status=status.HTTP_404_NOT_FOUND
        )

    # filter serie

    serializer = SerieSerializer(serie, many=False)
    return Response(serializer.data)


# add focus into serie
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_focus_in_serie(request):
    # variable
    serie_id = request.data.get("serie_id")
    focus_id = request.data.get("focus_id")

    # if serie and focus id doest exist
    if serie_id is None or focus_id is None:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Retrieve the serie and focus instances
        serie = Serie.objects.get(id=serie_id)
        focus = Focus.objects.get(id=focus_id)
    except Serie.DoesNotExist:
        return Response(
            {"error": "Serie not found."},
            status=status.HTTP_404_NOT_FOUND
        )
    except Focus.DoesNotExist:
        return Response(
            {"error": "Focus not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    # add focus into serie
    if serie.add_focus(focus):
        serializer = SerieSerializer(serie)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "You can only add your own focuses to this serie."},
            status=status.HTTP_403_FORBIDDEN,
        )


# get serie with id of focus
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_serie_with_id_of_focus(request, focus_id):
    # Utilisez get_object_or_404 pour récupérer la série associée au focus
    serie = get_object_or_404(Serie, focuses__id=focus_id)

    # Si la série est trouvée, renvoyez-la avec un code de statut HTTP 200 OK
    if (serie):
        serializer = SerieSerializer(serie)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Si la série n'est pas trouvée, renvoyez une réponse 404
        return Response(
            {"error": "serie does not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# get focus gratuit
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_focus_gratuit_ofProf(request, id):
    try:
        prof = Professionnel.objects.get(id=id)
    except Professionnel.DoesNotExist:
        return Response(
            {"message": "proffesionel not found"},
            status=status.HTTP_400_BAD_REQUEST
        )

    nouveaux_focus = Focus.objects.filter(professionnel=prof, payant=False)
    serializer = FocusSerializer(nouveaux_focus, many=True)
    return Response(serializer.data)


# focus search
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_focus(request):
    search_query = request.query_params.get(
        "q", ""
    )  # Obtenez la requête de recherche de l'utilisateur

    # Filtrez les focus en fonction du titre,
    # de la description et de la catégorie
    focus_results = Focus.objects.filter(
        Q(titre__icontains=search_query)
        | Q(description__icontains=search_query)
        | Q(categorie__name__icontains=search_query)
    ).order_by("-createdAt")

    serializer = FocusSerializer(focus_results, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
