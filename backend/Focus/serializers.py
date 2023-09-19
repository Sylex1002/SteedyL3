from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField
from rest_framework import serializers

from .models import Focus, Comment, Share, Serie
from users.serializers import ProfilUserSerializer
from Professionnels.serializers import ProfessionnelSerializer
from api.serializers import CategorySerializer


class CommentSerializer(serializers.ModelSerializer):
    """comment serializer"""
    focus = serializers.PrimaryKeyRelatedField(read_only=True)
    user = ProfilUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "focus",
            "user",
            "comment_text",
            "createdAt",
            "updatedAt"
        ]


class FocusSerializer(ModelSerializer):
    """focus serialiser"""
    professionnel = ProfessionnelSerializer()
    categorie = CategorySerializer()
    liked_by_count = SerializerMethodField()
    number_listen_count = SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True)

    class Meta:
        model = Focus
        fields = "__all__"

    def get_liked_by_count(self, obj):
        return obj.liked_by.count()

    def get_number_listen_count(self, obj):
        return obj.number_listen.count()

    def get_comment_count(self, focus):
        return focus.comments.count()

    def get_comment(self, focus):
        return focus.comments.count()


class ShareSerializer(serializers.ModelSerializer):
    """share serializer"""
    focus = FocusSerializer(read_only=True)
    user = ProfilUserSerializer(read_only=True)

    class Meta:
        model = Share
        fields = "__all__"


# serie
class SerieSerializer(serializers.ModelSerializer):
    """serie serializer"""
    focuses = FocusSerializer(many=True, read_only=True)
    professionnel = ProfessionnelSerializer(read_only=True)

    class Meta:
        model = Serie
        fields = "__all__"
