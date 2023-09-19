from rest_framework import serializers
from .models import Message, Conversation
from users.serializers import ProfilUserSerializer


class MessageSerializer(serializers.ModelSerializer):
    user_sender = ProfilUserSerializer()
    user_recipient = ProfilUserSerializer()

    class Meta:
        model = Message
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    user = ProfilUserSerializer()
    other_user = ProfilUserSerializer()
    last_message = MessageSerializer()

    class Meta:
        model = Conversation
        fields = "__all__"
