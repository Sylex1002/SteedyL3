"""Module providingFunction printing python version."""
from rest_framework.serializers import ModelSerializer
from .models import Category


class CategorySerializer(ModelSerializer):
    """this class is serializer of category"""
    class Meta:
        """this class is meta of serializer category"""
        model = Category
        fields = "__all__"
