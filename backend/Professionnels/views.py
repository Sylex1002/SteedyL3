# from django.shortcuts import render
from rest_framework.response import Response

# from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

# from asgiref.sync import sync_to_async
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count

# from django.db.models import OuterRef, Subquery
from django.db.models import Q

from .serializers import ProfessionnelSerializer
from .models import Professionnel
from users.models import ProfilUser
from Highlight.models import HighLight
from Highlight.serializers import HighLightSerializer
from Focus.models import Focus
from Focus.serializers import FocusSerializer


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def professionel_detail(request):
    professionnel = Professionnel.objects.all().order_by("-id")[:10]
    serializer = ProfessionnelSerializer(professionnel, many=True)
    return Response(serializer.data)


# post pro
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def pro_post(request):
    if request.data.get("id_pro") is None:
        return Response(
            {"error": "user pro is requered"},
            status=status.HTTP_400_BAD_REQUEST
        )
    user = ProfilUser.objects.get(id=request.data.get("id_pro"))
    professionnel = Professionnel.objects.create(user=user)
    serializer = ProfessionnelSerializer(professionnel, many=False)
    return Response(serializer.data)


# get one prof
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Get_one_prof(request, id):
    try:
        professionnel = Professionnel.objects.get(id=id)
    except Professionnel.DoesNotExist:
        return Response(
            {"message": "professionnel not existe"},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = ProfessionnelSerializer(professionnel, many=False)
    return Response(serializer.data)


# get one prof
@api_view(["GET"])
def Get_one_prof_userUnAuth(request, id):
    try:
        professionnel = Professionnel.objects.get(id=id)
    except Professionnel.DoesNotExist:
        return Response(
            {"message": "professionnel not existe"},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = ProfessionnelSerializer(professionnel, many=False)
    return Response(serializer.data)


# prof que je follow
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_prof_followedByuser(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Get the users that the authenticated user is following
    following_users = user.followers.all()

    # Get the professionals that correspond to those users
    following_professionals = Professionnel.objects.filter(user__in=following_users)
    serializer = ProfessionnelSerializer(following_professionals, many=True)
    return Response(serializer.data)


# prof i'm not follow
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_prof_Not_followedByuser(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )
    # Get the IDs of the professionals that the user is following
    following_ids = user.following.all().values_list("id", flat=True)

    # Get the list of professionals that the user is not following
    not_following_professionals = Professionnel.objects.exclude(
        user__id__in=following_ids
    )

    serializer = ProfessionnelSerializer(not_following_professionals, many=True)
    return Response(serializer.data)


# get prof un follow same category
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def not_following_professionals_byCategory(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response({"message": "user not found"}, status=404)

    # Get the IDs of the professionals that the user is following
    following_ids = user.followers.all().values_list("id", flat=True)

    if following_ids is None:
        following_ids = ProfilUser.objects.filter(
            fonction="Professionnel").values_list(
            "id", flat=True
        )

    # Get the categories of the authenticated user
    user_categories = user.categories.all()

    # Get the list of professionals that the user
    # is not following and have the same categories as the user
    not_following_professionals = (
        Professionnel.objects.exclude(user__id__in=following_ids)
        .filter(user__categories__in=user_categories)
        .order_by("createdAt")
        .distinct()[:15]
    )
    serializer = ProfessionnelSerializer(not_following_professionals, many=True)
    return Response(serializer.data)


# get_prof_ByUserId
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_prof_ByUserId(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response({"message": "user not found"}, status=404)

    try:
        professionnel = Professionnel.objects.get(user=user)
    except Professionnel.DoesNotExist:
        return Response({"message": "professionnel not found"}, status=404)

    serializer = ProfessionnelSerializer(professionnel, many=False)
    return Response(serializer.data)


# get_prof_Populaire
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_prof_Populaire(request):
    try:
        professionnel = Professionnel.objects.annotate(
            follower_count=Count("user__followers")
        ).order_by("-follower_count")[:10]
    except Professionnel.DoesNotExist:
        return Response({"message": "professionnel not found"}, status=404)

    serializer = ProfessionnelSerializer(professionnel, many=True)
    return Response(serializer.data)


# search prof
@api_view(["GET"])
def search_professionnels(request):
    search_query = request.query_params.get("q", "")

    # Filtrez les professionnels en fonction des critères de recherche
    professionnel_results = Professionnel.objects.filter(
        Q(user__first_name__icontains=search_query)
        | Q(user__last_name__icontains=search_query)
        | Q(user__fonction__icontains=search_query)
        | Q(user__categories__name__icontains=search_query)
        | Q(user__domain__icontains=search_query)
        | Q(user__address__icontains=search_query)
    )

    serializer = ProfessionnelSerializer(professionnel_results, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# add follower prof
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_follower_prof(request):
    prof_id = request.data.get("prof_id")
    follower_id = request.data.get("follower_id")
    try:
        user = ProfilUser.objects.get(id=follower_id)
    except ProfilUser.DoesNotExist:
        return Response({"message": "user not found"}, status=404)

    try:
        professionnel = Professionnel.objects.get(id=prof_id)
    except Professionnel.DoesNotExist:
        return Response({"message": "professionnel not found"}, status=404)
    professionnel.followers.add(user)
    professionnel.save()
    # prof follow
    followed_profs = Professionnel.objects.filter(followers=user)
    serializer_follow = ProfessionnelSerializer(followed_profs, many=True)
    serializer_prof = ProfessionnelSerializer(professionnel, many=False)
    reslut = {
        "followed_profs": serializer_follow.data,
        "prof": serializer_prof.data,
    }
    return Response(reslut, status=status.HTTP_200_OK)


# get prof follower by prof
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_prof_followbyprof(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response({"message": "user not found"}, status=404)
    followed_profs = Professionnel.objects.filter(followers=user)
    serializer = ProfessionnelSerializer(followed_profs, many=True)
    return Response(serializer.data)


# get prof same category of one prof
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_similar_category_professionals(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response({"message": "user not found"}, status=404)
    # get all category
    user_categories = user.categories.all()

    similar_professionals = Professionnel.objects.filter(
        Q(user__categories__in=user_categories)
    ).distinct()
    serializer = ProfessionnelSerializer(similar_professionals, many=True)
    return Response(serializer.data)


# get highlight of prof qu je suivi
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_following_highlights(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response({"message": "user not found"}, status=404)

    followed_professionals = Professionnel.objects.filter(followers=user)

    highlights = HighLight.objects.filter(
        professionnel__in=followed_professionals
    )

    serializer = HighLightSerializer(highlights, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_following_focus(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response({"message": "user not found"}, status=404)
    followed_professionals = Professionnel.objects.filter(followers=user)

    focus_list = Focus.objects.filter(professionnel__in=followed_professionals)

    serializer = FocusSerializer(focus_list, many=True)
    return Response(serializer.data)
