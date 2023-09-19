from rest_framework.serializers import ModelSerializer
from .models import UsersPublication
from users.serializers import ProfilUserSerializer


class UsersPublicationSerializer(ModelSerializer):
    user = ProfilUserSerializer()

    class Meta:
        model = UsersPublication
        fields = '__all__'
