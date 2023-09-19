from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os

from .models import UsersPublication
from .compressed import compress_media
from .serializers import UsersPublicationSerializer
from users.models import ProfilUser
from users.serializers import ProfilUserSerializer


# Créer Publication
@api_view(["POST"])
def create_publication(request):
    user = request.data.get("user_id")
    photos = request.data.get("photos")
    description = request.data.get("description")
    if user is None or photos is None or description is None:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # get id UsersPublication
    try:
        id_user = ProfilUser.objects.get(id=user)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    compressed_path = compress_media(photos)
    # create info Publication
    publication = UsersPublication.objects.create(
        user=id_user, photos=compressed_path, description=description
    )
    serielizer = UsersPublicationSerializer(publication, many=False)
    return Response(serielizer.data)


# Update Publication
@api_view(["PUT"])
def update_publication(request, id):
    try:
        publication = UsersPublication.objects.get(id=id)
    except UsersPublication.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    #
    file_path = os.path.join(str(settings.MEDIA_ROOT), str(publication.photos))
    if os.path.exists(file_path):
        os.remove(file_path)

    if request.data.get("photos") is not None:
        publication.photos = request.data["photos"]

    if request.data.get("description") is not None:
        publication.description = request.data["description"]

    publication.save()
    serializer = UsersPublicationSerializer(publication, many=False)
    return Response(serializer.data)


# List_all_Publication
@api_view(["GET"])
def list_publication(request):
    try:
        publication = UsersPublication.objects.all().order_by("-id")
    except UsersPublication.DoesNotExist:
        return Response(status=404)

    serializer = UsersPublicationSerializer(publication, many=True)
    return Response(serializer.data)


# List_all_Publication
@api_view(["GET"])
def list_publication_user(request, id):
    try:
        publication = ProfilUser.objects.get(id=id)
    except UsersPublication.DoesNotExist:
        return Response(status=404)
    pub = publication.publicationss.all().order_by("-id")
    serializer = ProfilUserSerializer(pub, many=True)
    return Response(serializer.data)


# Delete Publication
@api_view(["DELETE"])
def delete_publication(request, id):
    try:
        # Get id UserPublication
        pub = UsersPublication.objects.get(id=id)
    except UsersPublication.DoesNotExist:
        return Response({"message": "Publication does not found"}, status=404)
    # delete UserPublication
    pub.delete()
    return Response(
        {"message": "Publication deleted successfully"},
        status=status.HTTP_200_OK
    )
