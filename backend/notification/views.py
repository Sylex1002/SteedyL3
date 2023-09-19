from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Notifications, MessageNotification
from notification.serializers import NotificationSerializer
from notification.serializers import NotificationMessageSerializer
from rest_framework.permissions import IsAuthenticated

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from django.db.models.signals import post_save
from django.dispatch import receiver

# from .models import NotificationUser,NotificationFocus,NotificationHighLight
# from .serializers import NotificationFocusSerializer
from users.models import ProfilUser
from Highlight.models import HighLight
from Focus.models import Focus
from Messages.models import Message
from messageGroupe.models import Groupe, GroupeEnAttent


# Get all notifications
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_notification(request):
    try:
        notifications = Notifications.objects.all().order_by("-created_at")[:10]
    except Notifications.DoesNotExist:
        return Response(status=404)

    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)


# Read the notification
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def read_notification(request, id):
    user_id = request.data.get("user_id")

    # get user
    try:
        user = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"}, status=status.HTTP_404_NOT_FOUND
        )

    # get notification
    try:
        notif = Notifications.objects.get(id=id)
    except Notifications.DoesNotExist:
        return Response(status=404)

    notif.read = True
    notif.save()

    notifications = Notifications.objects.filter(followers=user).order_by("-created_at")
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)


# Delete notification
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_notification(request, id):
    try:
        notif = Notifications.objects.get(id=id)
    except Notifications.DoesNotExist:
        return Response(
            {"Error": "Notification does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    notif.delete()
    return Response(
        {"Error": "Notification is deleted !"}, status=status.HTTP_204_NO_CONTENT
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_notif_AND_groupWaiting(request, id, id_group):
    try:
        notif = Notifications.objects.get(id=id)
    except Notifications.DoesNotExist:
        return Response(
            {"Error": "Notification does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        groupe = GroupeEnAttent.objects.get(id=id_group)
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    # delete notification
    notif.delete()

    # delete group
    groupe.delete()

    return Response(
        {"Error": "Notification is deleted !"}, status=status.HTTP_204_NO_CONTENT
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notifications_for_user(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"}, status=status.HTTP_404_NOT_FOUND
        )

    notifications = Notifications.objects.filter(followers=user).order_by("-created_at")
    notifications_unread = Notifications.objects.filter(
        followers=user, read=False
    ).order_by("-created_at")

    serializer_all = NotificationSerializer(notifications, many=True)
    serializer_viewed = NotificationSerializer(notifications_unread, many=True)

    resulta_notif = {"all": serializer_all.data, "view": serializer_viewed.data}
    return Response(resulta_notif)


# notification for new highlight
@receiver(post_save, sender=HighLight)
def notify_new_highlight(sender, instance, created, **kwargs):
    if created:
        # focus_professionnel
        profil_user = instance.professionnel.user

        # message
        message = "New highlight registered"

        # Récupérer tous les following du ProfilUser
        following = profil_user.following.all()

        # creation notification
        new_notification = Notifications.objects.create(
            user=profil_user, message=message, highLight=instance
        )

        # Envoyer une notification à tous les followers
        channel_layer = get_channel_layer()
        for follower in following:
            # si user exist in follower
            follower_id = follower.id

            new_notification.followers.add(follower)
            # save notification
            new_notification.save()
            # serializer notificaton
            serializer = NotificationSerializer(new_notification)
            # envoye la notification
            async_to_sync(channel_layer.group_send)(
                f"notification_{follower_id}",
                {"type": "notification_message", "message": serializer.data},
            )


# notifi for prof
@receiver(post_save, sender=HighLight)
def notify_new_highlight_for_prof(sender, instance, created, **kwargs):
    if created:
        # focus_professionnel
        profil_user = instance.professionnel.user

        # message
        message = "New highlight registered"

        # Récupérer tous les following du ProfilUser
        following = instance.professionnel.followers.all()

        # creation notification
        new_notification = Notifications.objects.create(
            user=profil_user, message=message, highLight=instance
        )

        # Envoyer une notification à tous les followers
        channel_layer = get_channel_layer()
        for follower in following:
            # si user exist in follower
            follower_id = follower.id

            new_notification.followers.add(follower)
            # save notification
            new_notification.save()
            # serializer notificaton
            serializer = NotificationSerializer(new_notification)
            # envoye la notification
            async_to_sync(channel_layer.group_send)(
                f"notification_{follower_id}",
                {"type": "notification_message", "message": serializer.data},
            )


# notification for new user
@receiver(post_save, sender=Focus)
def notify_new_focus(sender, instance, created, **kwargs):
    if created:
        # message for notification
        message = f"New focus {instance.titre} registered"
        # Récupérer le ProfilUser associé au Professionnel de l'instance focus
        profil_user = instance.professionnel.user

        # Récupérer tous les following du ProfilUser
        following = profil_user.following.all()

        # creation notification
        new_notification = Notifications.objects.create(
            user=profil_user, message=message, focus=instance
        )

        # Envoyer une notification à tous les followers
        channel_layer = get_channel_layer()
        for follower in following:
            # si user exist in follower
            follower_id = follower.id

            new_notification.followers.add(follower)
            # save notification
            new_notification.save()
            # serializer notificaton
            serializer = NotificationSerializer(new_notification)
            # envoye la notification
            async_to_sync(channel_layer.group_send)(
                f"notification_{follower_id}",
                {"type": "notification_message", "message": serializer.data},
            )


# notification for new user
@receiver(post_save, sender=Focus)
def notify_new_focus_for_prof(sender, instance, created, **kwargs):
    if created:
        # message for notification
        message = f"New focus {instance.titre} registered"
        # Récupérer le ProfilUser associé au Professionnel de l'instance focus
        profil_user = instance.professionnel.user

        # Récupérer tous les following du ProfilUser
        following = instance.professionnel.followers.all()

        # creation notification
        new_notification = Notifications.objects.create(
            user=profil_user, message=message, focus=instance
        )

        # Envoyer une notification à tous les followers
        channel_layer = get_channel_layer()
        for follower in following:
            # si user exist in follower
            follower_id = follower.id

            new_notification.followers.add(follower)
            # save notification
            new_notification.save()
            # serializer notificaton
            serializer = NotificationSerializer(new_notification)
            # envoye la notification
            async_to_sync(channel_layer.group_send)(
                f"notification_{follower_id}",
                {"type": "notification_message", "message": serializer.data},
            )


# creation new group
@receiver(post_save, sender=Groupe)
def notify_new_group(sender, instance, created, **kwargs):
    if created:
        # message for notification
        message = f"New group {instance.groupe_name} registered"
        # Récupérer le ProfilUser associé au Professionnel de l'instance focus
        profil_user = instance.createur

        # membre de group
        group_membres = instance.members.all()

        # creation notification
        new_notification = Notifications.objects.create(
            user=profil_user, message=message, groupe=instance
        )
        # Envoyer une notification à tous les followers
        channel_layer = get_channel_layer()
        for user_membre in group_membres:
            # si user exist in follower
            user_membre_id = user_membre.id

            new_notification.followers.add(user_membre)
            # save notification
            new_notification.save()
            # serializer notificaton
            serializer = NotificationSerializer(new_notification)
            # envoye la notification
            async_to_sync(channel_layer.group_send)(
                f"notification_{user_membre_id}",
                {"type": "notification_message", "message": serializer.data},
            )


# creation Message notification
@receiver(post_save, sender=Message)
def notify_message(sender, instance, created, **kwargs):
    if created:
        # user recive the message
        profil_user = instance.user_recipient
        user_sender = instance.user_sender

        # creation notification
        new_notification = MessageNotification.objects.create(
            user_recipient=profil_user,
            user_sender=user_sender,
            message=instance
        )

        # Envoyer une notification à tous les followers
        channel_layer = get_channel_layer()

        # si user exist in follower
        user_profil_id = profil_user.id

        # serializer notificaton
        serializer = NotificationMessageSerializer(new_notification)
        # envoye la notification
        async_to_sync(channel_layer.group_send)(
            f"notification_{user_profil_id}",
            {"type": "notification_message", "message": serializer.data},
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notifications_message_of_user(request, id):
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"}, status=status.HTTP_404_NOT_FOUND
        )

    notifications_msg = MessageNotification.objects.filter(
        user_recipient=user, read=False
    )
    # serialize message
    serializer_msg = NotificationMessageSerializer(notifications_msg, many=True)
    return Response(serializer_msg.data, status=status.HTTP_200_OK)


# creation new GroupeEnAttent
# @receiver(post_save, sender=GroupeEnAttent)
# def notify_new_groupeEnAttent(sender, instance, created, **kwargs):
#     if created:
#         # message for notification
#         message = f"New wait {instance.user_demande.first_name} registered"
#         # Récupérer le ProfilUser associé au Professionnel de l'insta
#         profil_user = instance.user_demande

#         # crateur de group
#         group_createur = instance.groupes.createur
#         # creation notification
#         new_notification = Notifications.objects.create(
#             user=profil_user, message=message, groupeEnAttent=instance
#         )
#         # Envoyer une notification à tous les followers
#         channel_layer = get_channel_layer()
#         new_notification.followers.add(group_createur)
#         # save notification
#         new_notification.save()
# serializer notificaton
# serializer = NotificationSerializer(new_notification)
#         # envoye la notification
#         async_to_sync(channel_layer.group_send)(
#             f"notification_{group_createur.id}",
#             {"type": "notification_message", "message": serializer.data},
#         )


# send notification for admin
# @receiver(post_save, sender=ProfilUser)
# def notify_admin_for_new_user(sender, instance, created, **kwargs):
#     if created:
#         # Create a new NotificationUser object for the admin user
#         admin_user = ProfilUser.objects.get(is_superuser=True)
#         message = f"New user {instance.username} registered"
#         NotificationUser.objects.create(user=admin_user, message=message)

#         # Send notification message to admin user via WebSocket
#         # notification_user_
#         channel_layer = get_channel_layer()
#         async_to_sync(channel_layer.group_send)(
#             f"notification_admin_{admin_user.pk}",
#             {
#                 'type': 'notification_message',
#                 'message': message
#             }
# )


# @api_view(['GET'])
# def My_notification_focus(request,id):
#     try:
#         user = ProfilUser.objects.get(id=id)
#     except ProfilUser.DoesNotExist:
#         return Response({'message': 'user not found'}, status=404)

#     following_users=user.followers.all()
#     notifications = NotificationFocus.objects.filter(
# user__in=following_users)
#     serializer = NotificationFocusSerializer(notifications, many=True)

#     return Response(serializer.data)
#     # follower_user = ProfilUser.objects.get(username=follower_username)
#     # following_users = follower_user.following.all()
