from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from .serializers import EtudiantSerializer
from .models import Etudiants
from users.models import ProfilUser


# Create your views here.
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_all_students(request):
    students = Etudiants.objects.all()
    serializer = EtudiantSerializer(students, many=True)
    return Response(serializer.data)


# get etudiant by user id
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_students_by_user(request, id):
    # get user
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "profil user does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # get etudisnt
    try:
        students = Etudiants.objects.get(user=user)
    except Etudiants.DoesNotExist:
        return Response(
            {"error": "user doest not existe"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = EtudiantSerializer(students, many=False)
    return Response(serializer.data)
