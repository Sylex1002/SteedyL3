from rest_framework.serializers import ModelSerializer
# from rest_framework import serializers

from .models import HighLight
from Professionnels.serializers import ProfessionnelSerializer


# image serializer
class HighLightSerializer(ModelSerializer):
    professionnel = ProfessionnelSerializer()

    class Meta:
        model = HighLight
        fields = "__all__"
