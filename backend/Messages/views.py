from rest_framework.response import Response
from rest_framework import status

# from rest_framework.renderers import JSONRenderer
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver

# from django.utils import timezone
from users.models import ProfilUser
from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from Messages.serializers import MessageSerializer
from Messages.serializers import ConversationSerializer

# from datetime import timedelta
from .models import Message, Conversation
from users.serializers import ProfilUserSerializer
from notification.models import MessageNotification


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_conversations(request, user_recipient, user_sender):
    if user_recipient is None or user_sender is None:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    recipient = ProfilUser.objects.get(matricule=user_recipient)
    sender = ProfilUser.objects.get(id=user_sender)

    # Get all the messages between the sender and recipient and order them
    # by  timestamp
    conversations = Message.objects.filter(
        Q(user_sender=sender, user_recipient=recipient)
        | Q(user_sender=recipient, user_recipient=sender)
    ).order_by("timestamp")

    serialier_msg = MessageSerializer(conversations, many=True)

    # Serialize the conversations to JSON
    serialized_conversations = []
    for conversation in conversations:
        timestamp = conversation.timestamp
        message_data = {
            "user_sender": conversation.user_sender.id,
            "user_recipient": conversation.user_recipient.id,
            "message": conversation.content,
            "timestamp": timestamp,
        }

        # Check if the message has an image, fichier, or video
        if conversation.image:
            message_data["file"] = {
                "name": conversation.image.name,
                "type": "image",
                "data": conversation.image.url,
            }
        elif conversation.video:
            message_data["file"] = {
                "name": conversation.video.name,
                "type": "video",
                "data": conversation.video.url,
            }
        elif conversation.audio:
            message_data["file"] = {
                "name": conversation.audio.name,
                "type": "audio",
                "data": conversation.audio.url,
            }
        elif conversation.fichier:
            message_data["file"] = {
                "name": conversation.fichier.name,
                "type": "application",
                "data": conversation.fichier.url,
            }

        serialized_conversations.append(message_data)

    # Return the serialized conversations as a JSON response
    return Response(
        data=serialier_msg.data,
        status=status.HTTP_200_OK,
        # content_type="application/json",
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_message(request, message_id):
    try:
        message = Message.objects.get(id=message_id)
        user_recipient = ProfilUser.objects.get(
            id=request.data.get("user_recipient")
        )
        user_sender = ProfilUser.objects.get(
            id=request.data.get("user_sender")
        )

        if (
            message.user_recipient == user_recipient
            and message.user_sender == user_sender
        ):
            message.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                {"error": "Message not found"},
                status=status.HTTP_404_NOT_FOUND
            )
    except Message.DoesNotExist:
        return Response(
            {"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_conversations(request, recipient_id, sender):
    try:
        recipient = ProfilUser.objects.get(id=recipient_id)
        sender = ProfilUser.objects.get(id=sender)
    except ProfilUser.DoesNotExist:
        return Response({"error": "User not found"},
                        status=status.HTTP_404_NOT_FOUND)
    # delete message
    Message.objects.filter(
        Q(user_sender=sender, user_recipient=recipient)
        | Q(user_sender=recipient, user_recipient=sender)
    ).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    ordering = ("-timestamp",)

    from .models import Message


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_unread_messages_for_user(request, user_id):
    try:
        user = ProfilUser.objects.get(id=user_id)
        unread_messages = Message.objects.filter(
            user_recipient=user,
            read=False
        )
        return Response(
            {"unread_messages": unread_messages},
            status=status.HTTP_200_OK
        )
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_prof_message_for_etudiant(request, id):
    # user
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    followers = user.followers.all()
    professors_with_unread_messages = []

    for follow in followers:
        unread_messages_count = Message.objects.filter(
            user_recipient=user, user_sender=follow, read=False
        )
        serialized_follow = ProfilUserSerializer(follow).data
        message_seriali = MessageSerializer(unread_messages_count, many=True).data
        professors_with_unread_messages.append(
            {"user": serialized_follow, "message": message_seriali}
        )
    return Response(professors_with_unread_messages, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_prof_message_for_prof(request, id):
    # user
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    # all following
    followers = user.following.all()
    professors_with_unread_messages = []
    for follow in followers:
        unread_messages_count = Message.objects.filter(
            user_recipient=user, user_sender=follow, read=False
        )
        serialized_follow = ProfilUserSerializer(follow).data
        message_seriali = MessageSerializer(unread_messages_count, many=True).data
        professors_with_unread_messages.append(
            {"user": serialized_follow, "message": message_seriali}
        )
    return Response(professors_with_unread_messages, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_messages_as_read(request):
    user_recipient_id = request.data.get("user_recipient_id")
    user_sender_id = request.data.get("user_sender_id")

    try:
        user_recipient = ProfilUser.objects.get(id=user_recipient_id)
        user_sender = ProfilUser.objects.get(id=user_sender_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    messages_to_mark_as_read = Message.objects.filter(
        user_sender=user_sender, user_recipient=user_recipient, read=False
    )

    for message in messages_to_mark_as_read:
        message.read = True
        message.save()

    # delete notification
    MessageNotification.objects.filter(
        Q(user_recipient=user_recipient, user_sender=user_sender)
    ).delete()

    # Mise à jour automatique de la conversation
    if messages_to_mark_as_read.exists():
        conversation, created = Conversation.objects.get_or_create(
            user=user_sender, other_user=user_recipient
        )
        # Utilisation de first() à la place de latest() pour obtenir le premier message si existant
        conversation.last_message = messages_to_mark_as_read.order_by("-timestamp").first()
        conversation.save()

    serializer = MessageSerializer(messages_to_mark_as_read, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# CONVERSATION
@receiver(post_save, sender=Message)
def create_or_update_conversation(sender, instance, created, **kwargs):
    if instance.user_sender != instance.user_recipient:
        conversation, created = Conversation.objects.get_or_create(
            user=instance.user_sender, other_user=instance.user_recipient
        )
        conversation.last_message = instance
        conversation.save()

        # Faites la même chose pour l'autre utilisateur
        conversation, created = Conversation.objects.get_or_create(
            user=instance.user_recipient, other_user=instance.user_sender
        )
        conversation.last_message = instance
        conversation.save()


# GET ALL CONVERSATION
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_my_conversation(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # filtre mon conversation
    conversation = Conversation.objects.filter(user=user).order_by("-timestamp")
    # serialzer les conversation
    serializer = ConversationSerializer(conversation, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
