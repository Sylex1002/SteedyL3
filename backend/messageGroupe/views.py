from rest_framework.decorators import api_view, permission_classes
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from PIL import Image
from io import BytesIO
import base64

from messageGroupe.serializers import GroupeMessageSerializer
from messageGroupe.serializers import GroupeEnAttentSerializer
from .models import Groupe, GroupeMessage, GroupeEnAttent
from .serializers import GroupeSerializer
from users.models import ProfilUser

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from notification.models import Notifications


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_conversationsGroupe(request, to_groupe_id):
    try:
        to_groupe = Groupe.objects.get(id=to_groupe_id)
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Get all the messages in the specified group and order them by timestamp
    conversations = GroupeMessage.objects.filter(to_groupe=to_groupe).order_by(
        "timestamp"
    )
    serializer = GroupeMessageSerializer(conversations, many=True)

    # Modify the serialized data to include file_data
    for data, conversation in zip(serializer.data, conversations):
        if conversation.image:
            data["file"] = {
                "name": conversation.image.name,
                "type": "image",
                "data": conversation.image.url,
            }
        elif conversation.video:
            data["file"] = {
                "name": conversation.video.name,
                "type": "video",
                "data": conversation.video.url,
            }
        elif conversation.audio:
            data["file"] = {
                "name": conversation.audio.name,
                "type": "audio",
                "data": conversation.audio.url,
            }
        elif conversation.fichier:
            data["file"] = {
                "name": conversation.fichier.name,
                "type": "application",
                "data": conversation.fichier.url,
            }
    # Return the modified serialized conversations as a JSON response
    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
        content_type="application/json"
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_groupe(request):
    groupe_name = request.data.get("groupe_name")
    createur_id = request.data.get("createur_id")
    description = request.data.get("description")
    image_data = request.data.get("image")

    if groupe_name is None or createur_id is None:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        createur = ProfilUser.objects.get(id=createur_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "Createur does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    groupe = Groupe.objects.create(
        groupe_name=groupe_name, createur=createur, description=description
    )

    # Compresser et enregistrer l'image
    if image_data:
        image = Image.open(BytesIO(base64.b64decode(image_data.split(",")[1])))
        # Redimensionner l'image selon vos besoins
        image = image.resize((800, 800))
        image_io = BytesIO()
        image.save(
            image_io, format="JPEG", quality=70
        )  # Compression JPEG avec qualité de 70
        image_file = InMemoryUploadedFile(
            image_io, None,
            "compressed_image.jpg", "image/jpeg",
            image_io.tell(),
            None
        )
        groupe.image = image_file
    groupe.save()

    # Ajouter le créateur en tant que membre du groupe
    groupe.members.add(createur)

    # Ajouter les membres sélectionnés au groupe
    members = request.data.getlist(
        "members[]"
    )  # Récupérer la liste des membres sélectionnés
    for member_id in members:
        try:
            member = ProfilUser.objects.get(id=member_id)
            groupe.members.add(member)
        except ProfilUser.DoesNotExist:
            pass

    return Response(
        {"success": "Groupe créé avec succès"}, status=status.HTTP_201_CREATED
    )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_groupe(request, groupe_id):
    groupe_name = request.data.get("groupe_name")

    if groupe_name is None:
        return Response(
            {"error": "Missing required field"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        groupe = Groupe.objects.get(id=groupe_id)
        groupe.groupe_name = groupe_name
        groupe.save()
        serializer = GroupeSerializer(groupe)
        return Response(serializer.data)
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_groupe(request, groupe_id):
    try:
        groupe = Groupe.objects.get(id=groupe_id)
        groupe.delete()
        return Response(
            {"message": "Groupe deleted successfully"},
            status=status.HTTP_200_OK
        )
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_groupes_by_user(request, user_id):
    try:
        user = ProfilUser.objects.get(id=user_id)
        groupes = Groupe.objects.filter(createur=user)
        serializer = GroupeSerializer(groupes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_user_to_groupe(request):
    groupe_id = request.data.get("groupe_id")
    user_id = request.data.get("user_id")

    if groupe_id is None or user_id is None:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        groupe = Groupe.objects.get(id=groupe_id)
        user = ProfilUser.objects.get(id=user_id)
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )
    # verify user in membre
    if user in groupe.members.all():
        return Response(
            {"message": "User is already in the group"},
            status=status.HTTP_200_OK
        )
    # add user in membre
    groupe.members.add(user)
    groupe.en_attente = False
    groupe.save()
    # add in notification
    # Envoyer une notification à tous les followers
    message = f"Votre demande de joindre le groupe \
        {groupe.groupe_name} est accepetez"

    new_notification = Notifications.objects.create(
        user=user, message=message, groupe=groupe
    )
    new_notification.followers.add(user)
    # save notification
    new_notification.save()

    # envoye la notification
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"notification_{user_id}",
        {"type": "notification_message", "message": new_notification},
    )
    # return dataaaaaaaaaaaa
    serializer = GroupeSerializer(groupe)
    return Response(serializer.data, status=status.HTTP_200_OK)


# get groupe en attente
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_groups_enAttent_acceptation(request, user_id):
    try:
        user = ProfilUser.objects.get(id=user_id)

        waiting_groups = GroupeEnAttent.objects.filter(
            Q(user_demande=user), en_attente=True
        )

        serializer = GroupeEnAttentSerializer(waiting_groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_user_from_groupe(request):
    groupe_id = request.data.get("groupe_id")
    user_id = request.data.get("user_id")
    createur_id = request.data.get("createur_id")

    if groupe_id is None or user_id is None or createur_id is None:
        return Response(
            {"error": "Missing required fields"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        groupe = Groupe.objects.get(id=groupe_id)
        user = ProfilUser.objects.get(id=user_id)

        # Vérifier si l'utilisateur est le créateur du groupe
        createur = ProfilUser.objects.get(id=createur_id)
        if groupe.createur != createur:
            return Response(
                {"error": "You are not authorized to \
                    remove users from this group"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Vérifier si l'utilisateur fait partie du groupe
        if user not in groupe.members.all():
            return Response(
                {"error": "User is not a member of the group"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        groupe.members.remove(user)
        groupe.save()
        serializer = GroupeSerializer(groupe)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )


# get groupe group_containing_user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_group_containing_user(request, user_id):
    try:
        user = ProfilUser.objects.get(id=user_id)
        user_groups = Groupe.objects.filter(members=user)
        serializer = GroupeSerializer(user_groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )


# get groupe group_not_containing_user
# but just groupe created by createur followed
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_group_NOT_containing_user(request, user_id):
    try:
        user = ProfilUser.objects.get(id=user_id)
        following_users = user.followers.all()

        # Get groups created by users who are followed by the specified user
        groupes_created_by_followed = Groupe.objects.filter(
            createur__in=following_users
        )

        # Get groups where the specified user is not a member
        groups_not_containing_user = groupes_created_by_followed.exclude(
            members__in=[user_id]
        )

        # Get groups that the user hasn't
        # requested to join (not in waiting list)
        groups_not_requested_by_user = groups_not_containing_user.exclude(
            group_to_joindre__user_demande=user,
            group_to_joindre__en_attente=True
        )

        serializer = GroupeSerializer(groups_not_requested_by_user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )


# get one groupe
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_groupe(request, id):
    try:
        groupe = Groupe.objects.get(id=id)
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )
    serializer = GroupeSerializer(groupe, many=False)
    return Response(serializer.data)


# joincomunaute
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_joindre_group(request):
    user_id = request.data.get("user_id")
    group_id = request.data.get("group_id")
    agreedText = request.data.get("agreedText")
    reasonForJoining = request.data.get("reasonForJoining")

    if (
        user_id is None
        or group_id is None
        or agreedText is None
        or reasonForJoining is None
    ):
        return Response(
            {"error": "all input field is requered"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    try:
        groupe = Groupe.objects.get(id=group_id)
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )
    # add new membre

    new_joingroup = GroupeEnAttent.objects.create(
        groupes=groupe,
        user_demande=user,
        agreedText=agreedText,
        reasonForJoining=reasonForJoining,
    )

    # send notification
    message = f"Demander de joindre le groupe {groupe.groupe_name}"

    new_notification = Notifications.objects.create(
        user=user, message=message, groupeEnAttent=new_joingroup
    )
    # group created
    group_createur = groupe.createur

    # Envoyer une notification à tous les followers
    channel_layer = get_channel_layer()
    new_notification.followers.add(group_createur)

    # save notification
    new_notification.save()

    # envoye la notification
    async_to_sync(channel_layer.group_send)(
        f"notification_{group_createur.id}",
        {"type": "notification_message", "message": new_notification},
    )

    serializer = GroupeEnAttentSerializer(new_joingroup, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# delete group in waiting
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_group_waiting(request, group_id):
    try:
        groupe = GroupeEnAttent.objects.get(
            id=group_id
        )  # Utilisez un nom de variable différent pour éviter la confusion
    except Groupe.DoesNotExist:
        return Response(
            {"error": "Groupe does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    groupe.delete()
    serializer = GroupeEnAttentSerializer(groupe, many=False)
    return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


# add user into the views of message group
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def push_user_view_ingroup(request):
    group_msg_id = request.data.get("group_id")
    user_id = request.data.get("user_id")

    # get group information
    try:
        groupe_msg = GroupeMessage.objects.get(id=group_msg_id)
    except GroupeMessage.DoesNotExist:
        return Response(
            {"error": "Groupe message does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    # get user information
    try:
        user = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    # add user into message views
    groupe_msg.views.add(user)
    groupe_msg.save()
    # return message group data
    serializer = GroupeMessageSerializer(groupe_msg, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
