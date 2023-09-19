from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from datetime import datetime, timedelta
import os
from .models import HighLight
from .serializers import HighLightSerializer
from Professionnels.models import Professionnel

# from Etudiants.models import Etudiants
from users.models import ProfilUser
from api.models import Category
from api.compressed import compres_image, compress_and_cut_video
from django.db.models import Count
from django.db.models import Q

from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url


# gar all highlights
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_highlight(request):
    highLight = HighLight.objects.all().order_by("-createdAt")[:30]
    serializer = HighLightSerializer(highLight, many=True)
    return Response(serializer.data)


# for user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_highlight_for_user(request, id):
    try:
        professionnel = Professionnel.objects.get(id=id)
    except Professionnel.DoesNotExist:
        return Response(
            {"error": "professionnel does not exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # get all professionnel filter
    highLight = HighLight.objects.filter(professionnel=professionnel).order_by(
        "-createdAt"
    )[:30]
    serializer = HighLightSerializer(highLight, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_highlight_img(request):
    if (
        request.data.get("file") is None
        or request.data.get("id_pro") is None
        or request.data.get("id_category") is None
    ):
        return Response(
            {"error": "Your request missing something"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # selec user by id user
    try:
        prof = Professionnel.objects.get(id=request.data.get("id_pro"))
    except Professionnel.DoesNotExist:
        return Response(
            {"error": "professionnel does not exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # select category
    try:
        category = Category.objects.get(id=request.data.get("id_category"))
    except Category.DoesNotExist:
        return Response(
            {"error": "category does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # get file from request
    compressed_file = compres_image(request.data["file"])

    # Get description from request
    description = request.data.get("description", "")

    # Télécharger l'image compressée sur Cloudinary
    cloudinary_response = upload(compressed_file, folder="HighLight")
    cloudinary_public_id = cloudinary_response["public_id"]

    # Obtenir l'URL Cloudinary de l'image téléchargée
    cloudinary_url_tuple = cloudinary_url(
        cloudinary_public_id, format=cloudinary_response["format"]
    )
    cloudinary_url1 = cloudinary_url_tuple[
        0
    ]  # Assurez-vous que la variable est correctement assignée

    # create new focus
    new_highlight = HighLight.objects.create(
        professionnel=prof,
        description=description,
        type=False,
        category=category,
        file=cloudinary_url1,  # Assign the Cloudinary URL to the field
    )

    serializer = HighLightSerializer(new_highlight, many=False)
    return Response(serializer.data)


# upload video
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_highlight_video(request):
    if (
        request.data.get("file") is None
        or request.data.get("id_pro") is None
        or request.data.get("id_category")
    ):
        return Response(
            {"error": "Your request missing something"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    # selec user by id user
    try:
        prof = Professionnel.objects.get(id=request.data.get("id_pro"))
    except Professionnel.DoesNotExist:
        return Response(
            {"error": "professionnel does not exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # select category
    try:
        category = Category.objects.get(id=request.data.get("id_category"))
    except Category.DoesNotExist:
        return Response(
            {"error": "category does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # get file path from request
    input_file = request.data["file"]
    file_redirect = "highlight/videos/" + str(input_file)
    output_file = os.path.join(
        str(settings.MEDIA_ROOT), "highlight/videos", str(input_file)
    )
    # get file from request
    compress_and_cut_video(input_file, output_file)
    # if desc
    description = request.data.get("description", "")
    # create new focus
    file_ex = HighLight.objects.create(
        file=file_redirect,
        type=True,
        description=description,
        professionnel=prof,
        category=category,
    )
    serializer = HighLightSerializer(file_ex, many=False)
    return Response(serializer.data)


# get all highlight
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_highlight(request, id):
    # ger professionnel
    try:
        professionnel = Professionnel.objects.get(id=id)
    except Professionnel.DoesNotExist:
        return Response(
            {"error": "professionnel does not exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    # select all highlight
    highlights = professionnel.professionnel.all()
    serializer = HighLightSerializer(highlights, many=True)
    return Response(serializer.data)


# delete highlight
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def del_highlight(request, id):
    # ger professionnel
    try:
        highLight = HighLight.objects.get(id=id)
    except HighLight.DoesNotExist:
        return Response(
            {"error": "HighLight does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    highLight.delete()
    return Response(
        {"message": "experience deleted"}, status=status.HTTP_204_NO_CONTENT
    )


# add view on highlight
# @api_view(['post'])
# @permission_classes([IsAuthenticated])
# def post_view_highlight(request):
#     user_id=request.data.get('user_id')
#     highlight_id=request.data.get('highlight_id')
#     # if is none
#     if(user_id is None or highlight_id is None):
#         return Response({'error': 'all input is required!'},
#           status=status.HTTP_400_BAD_REQUEST)

#     # select highlight
#     try:
#         highLight= HighLight.objects.get(id=highlight_id)
#     except HighLight.DoesNotExist:
#         return Response({'error': 'HighLight does not exists'},
# status=status.HTTP_400_BAD_REQUEST)

#     # select user
#     try:
#         profil= ProfilUser.objects.get(id=user_id)
#     except ProfilUser.DoesNotExist:
#         return Response({'error': 'user does not exists'},
    # status=status.HTTP_400_BAD_REQUEST)

#     # ajoute de view
#     highLight.view=profil
#     highLight.save()

#     # return data
#     serializer=HighLightSerializer(highLight,many=False)
#     return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_view_highlight(request):
    user_id = request.data.get("user_id")
    highlight_id = request.data.get("highlight_id")

    # Vérifier si les valeurs sont présentes
    if user_id is None or highlight_id is None:
        return Response(
            {"error": "all input is required!"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        highLight = HighLight.objects.get(id=highlight_id)
    except HighLight.DoesNotExist:
        return Response(
            {"error": "HighLight does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        profil = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Vérifier si la relation existe déjà
    if highLight.view.filter(id=user_id).exists():
        # Supprimer le view existant s'il est présent
        highLight.view.remove(profil)

    highLight.view.add(profil)
    highLight.save()

    serializer = HighLightSerializer(highLight, many=False)
    return Response(serializer.data)


# update highlight
@api_view(["put"])
@permission_classes([IsAuthenticated])
def put_hightlight(request, id):
    try:
        highLight = HighLight.objects.get(id=id)
    except HighLight.DoesNotExist:
        return Response(
            {"error": "HighLight does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if request.data.get("description"):
        return Response(
            {"error": "description does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # update
    highLight.description = request.data.get("description")
    highLight.save()

    serializer = HighLightSerializer(highLight, many=False)
    return Response(serializer.data)


# get highlight 24h
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_highlight_24h(request, id):
    try:
        # Récupérer l'utilisateur étudiant connecté
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Récupérer les professionnels que l'étudiant suit
    prof_suivis = Professionnel.objects.filter(user__in=user.following.all())
    # Calculer la date et l'heure d'il y a 24 heures
    date_limite = datetime.now() - timedelta(hours=24)

    # Récupérer les nouveaux focus de
    # professionnels depuis les dernières 4 heures
    nouveaux_focus = HighLight.objects.filter(
        professionnel__in=prof_suivis, createdAt__gte=date_limite
    )

    serializer = HighLightSerializer(nouveaux_focus, many=True)
    return Response(serializer.data)


# get highlight 24h
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_highlight_follow(request, id):
    try:
        # Récupérer l'utilisateur étudiant connecté
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Récupérer les professionnels que l'étudiant suit
    prof_suivis = Professionnel.objects.filter(user__in=user.followers.all())

    # Récupérer les nouveaux focus de
    # professionnels depuis les dernières 4 heures
    nouveaux_focus = HighLight.objects.filter(
        professionnel__in=prof_suivis
    ).order_by("-createdAt")[:10]

    serializer = HighLightSerializer(nouveaux_focus, many=True)
    return Response(serializer.data)


# get_unviewed_popular_highlights
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_unviewed_highlights(request, id):
    try:
        # Récupérer l'utilisateur étudiant connecté
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Récupérer tous les professionnels que l'utilisateur suit
    followed_professionals = user.followers.all()

    # Récupérer tous les HighLights des professionnels suivis par l'utilisateur
    followed_highlights = HighLight.objects.filter(
        professionnel__user__in=followed_professionals
    )

    # Récupérer tous les HighLights que l'utilisateur n'a
    # pas encore vus des professionnels suivis
    unviewed_followed_highlights = followed_highlights.exclude(view=user)

    # Récupérer tous les HighLights que l'utilisateur n'a pas encore vus
    unviewed_highlights = HighLight.objects.exclude(view=user)

    # Triez les HighLights par nombre de vues en ordre décroissant
    sorted_unviewed_followed = unviewed_followed_highlights.annotate(
        view_count=Count("view")
    ).order_by("-view_count", "-createdAt")[:20]

    # Vérifier si des highlights non vus des professionnels suivis existent
    if sorted_unviewed_followed.exists():
        serializer = HighLightSerializer(sorted_unviewed_followed, many=True)
    else:
        # S'il n'y a pas de highlights non vus des professionnels suivis,
        # afficher les autres unviewed_highlights
        sorted_unviewed_highlights = unviewed_highlights.annotate(
            view_count=Count("view")
        ).order_by("-view_count", "-createdAt")[:20]
        serializer = HighLightSerializer(sorted_unviewed_highlights, many=True)

    return Response(serializer.data)


# get_unviewed_popular_highlights
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_unviewed_popular_highlights(request, id):
    try:
        # Récupérer l'utilisateur étudiant connecté
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Obtenez tous les HighLights que l'utilisateur n'a pas encore vus
    unviewed_high = HighLight.objects.exclude(view=user)

    # Triez les HighLights par nombre de vues en ordre décroissant
    sorted_highlights = unviewed_high.annotate(
        view_count=Count("view")).order_by(
        "-view_count", "-createdAt"
    )[:20]

    serializer = HighLightSerializer(sorted_highlights, many=True)
    return Response(serializer.data)


# add like in highlight
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_like_highlight(request):
    user_id = request.data.get("user_id")
    highlight_id = request.data.get("highlight_id")

    # Check if the values are present
    if user_id is None or highlight_id is None:
        return Response(
            {"error": "All input is required!"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        highlight = HighLight.objects.get(id=highlight_id)
    except HighLight.DoesNotExist:
        return Response(
            {"error": "HighLight does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check if the relation exists already
    if highlight.like.filter(id=user_id).exists():
        # Remove the existing like if it's present
        highlight.like.remove(user)

    highlight.like.add(user)
    highlight.save()

    serializer = HighLightSerializer(highlight, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_highlight(request):
    search_query = request.query_params.get("q", "")

    # Filtrez les highlights en fonction de la description et de la catégorie
    highlight_results = HighLight.objects.filter(
        Q(description__icontains=search_query)
        | Q(
            category__name__icontains=search_query
        )  # Utilisez le nom correct du champ de catégorie
    ).order_by("-createdAt")

    serializer = HighLightSerializer(highlight_results, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# get one hightlight
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def highlight(request, id):
    try:
        highlight = HighLight.objects.get(id=id)
    except HighLight.DoesNotExist:
        return Response(
            {"error": "HighLight does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = HighLightSerializer(highlight, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
