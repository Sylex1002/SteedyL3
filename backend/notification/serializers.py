from rest_framework.serializers import ModelSerializer

from .models import Notifications, MessageNotification
from users.serializers import ProfilUserSerializer
from Focus.serializers import FocusSerializer
from Highlight.serializers import HighLightSerializer
from Messages.serializers import MessageSerializer
from messageGroupe.serializers import GroupeSerializer
from messageGroupe.serializers import GroupeEnAttentSerializer


# image serializer
class NotificationSerializer(ModelSerializer):
    user = ProfilUserSerializer()
    # followers=ProfilUserSerializer()
    focus = FocusSerializer()
    highLight = HighLightSerializer()
    groupe = GroupeSerializer()
    groupeEnAttent = GroupeEnAttentSerializer()

    class Meta:
        model = Notifications
        fields = "__all__"


# message notification
class NotificationMessageSerializer(ModelSerializer):
    user_recipient = ProfilUserSerializer()
    user_sender = ProfilUserSerializer()
    message = MessageSerializer()

    class Meta:
        model = MessageNotification
        fields = "__all__"
