from rest_framework import serializers
from .models import Groupe, GroupeMessage, GroupeEnAttent
from users.serializers import ProfilUserSerializer


class GroupeSerializer(serializers.ModelSerializer):
    createur = ProfilUserSerializer(many=False)
    members = ProfilUserSerializer(many=True)

    class Meta:
        model = Groupe
        fields = "__all__"


class GroupeMessageSerializer(serializers.ModelSerializer):
    user_sender = ProfilUserSerializer()
    views = ProfilUserSerializer(many=True)

    class Meta:
        model = GroupeMessage
        fields = "__all__"


class GroupeEnAttentSerializer(serializers.ModelSerializer):
    user_demande = ProfilUserSerializer()
    groupes = GroupeSerializer(many=False)

    class Meta:
        model = GroupeEnAttent
        fields = "__all__"
