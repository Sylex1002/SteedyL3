from rest_framework.serializers import ModelSerializer


from .models import Etudiants
from users.serializers import ProfilUserSerializer


class EtudiantSerializer(ModelSerializer):
    user = ProfilUserSerializer()

    class Meta:
        model = Etudiants
        fields = "__all__"
