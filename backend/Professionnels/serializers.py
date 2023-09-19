from rest_framework.serializers import ModelSerializer

from .models import Professionnel
from users.serializers import ProfilUserSerializer


class ProfessionnelSerializer(ModelSerializer):
    user = ProfilUserSerializer()
    followers = ProfilUserSerializer(many=True)

    class Meta:
        model = Professionnel
        fields = "__all__"
