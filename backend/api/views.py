"""Module providingFunction printing python version."""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from cryptography.fernet import Fernet
from django.conf import settings

from api.models import Category
from .serializers import CategorySerializer
from .compressed import compres_image


# get all category
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_category(request):
    """this function use to get all of category"""
    categorys = Category.objects.all()
    serializer = CategorySerializer(categorys, many=True)
    return Response(serializer.data)


# create category
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_category(request):
    """this function use to post new category"""
    # if is none
    if request.data.get("name") is None:
        return Response(
            {"error": "user doest not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    # variable
    name = request.data.get("name")
    slug = request.data.get("name")
    parent_id = ""

    # if parent id is not none
    if request.data.get("parentId") is not None:
        parent_id = request.data.get("parentId")

    # if image ixiste
    if request.data.get("image") is None:
        category = Category.objects.create(
            name=name,
            slug=slug,
            parentId=parent_id
        )
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data)
    else:
        image = compres_image(request.data["image"])
        category = Category.objects.create(
            name=name, slug=slug, parentId=parent_id, image=image
        )
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data)


# update category
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def put_category(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(
            {"error": "category does not exists"},
            status=status.HTTP_404_NOT_FOUND
        )
    # update
    category.name = request.data.get("name")
    category.slug = request.data.get("name")

    # save
    category.save()

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


# delete category
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_category(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(
            {"error": "category does not exists"},
            status=status.HTTP_404_NOT_FOUND
        )
    # delete category
    category.delete()
    return Response(
        {"error": "category does not exists"},
        status=status.HTTP_204_NO_CONTENT
    )


# get one category
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_category(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(
            {"error": "category does not exists"},
            status=status.HTTP_404_NOT_FOUND
        )
    # return category
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


# ==========CRYPTAGE===========
# encrypte
def encrypt_value(value):
    cipher_suite = Fernet(settings.ENCRYPTION_KEY)
    encrypted_value = cipher_suite.encrypt(str(value).encode())
    return encrypted_value.decode()


# decrypte
def decrypt_value(encrypted_value):
    cipher_suite = Fernet(settings.ENCRYPTION_KEY)
    decrypted_value = cipher_suite.decrypt(encrypted_value.encode())
    return decrypted_value.decode()
