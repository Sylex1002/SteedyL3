import json
import base64
from .models import Message
from users.models import ProfilUser
from channels.db import database_sync_to_async
from django.core.files.base import ContentFile
from channels.generic.websocket import AsyncWebsocketConsumer
from Messages.serializers import MessageSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["chat"]
        self.room_groupe_name = "chat_%s" % self.room_name
        await self.channel_layer.group_add(
            self.room_groupe_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_groupe_name,
            self.channel_name
        )

    @database_sync_to_async
    def save_message(self, message_data):
        user_sender = message_data.get("user_sender")
        user_recipient = message_data.get("user_recipient")
        message = message_data.get("message")
        file_data = message_data.get("file")
        image_file = None
        fichier_file = None
        video_file = None
        audio_file = None

        if file_data is not None:
            file_name = file_data.get("name")
            file_type = file_data.get("type")
            file_data_url = file_data.get("data")
            if file_data_url is not None:
                # decode the data and write the file to disk
                file_content = base64.b64decode(file_data_url.split(",")[1])

                if file_type.startswith("image"):
                    image_file = ContentFile(file_content, name=file_name)
                elif file_type.startswith("video"):
                    video_file = ContentFile(file_content, name=file_name)
                elif file_type.startswith("audio"):
                    audio_file = ContentFile(file_content, name=file_name)
                else:
                    fichier_file = ContentFile(file_content, name=file_name)

            message_data["file"]["size"] = len(file_content)

        try:
            user_sender = ProfilUser.objects.get(id=user_sender)
            user_recipient = ProfilUser.objects.get(id=user_recipient)
        except ProfilUser.DoesNotExist:
            return

        message = Message(
            content=message,
            user_sender=user_sender,
            user_recipient=user_recipient,
            image=image_file,
            fichier=fichier_file,
            video=video_file,
            audio=audio_file,
            read=False,
        )
        message.save()
        serializer_msg = MessageSerializer(message, many=False)
        return serializer_msg.data

    async def receive(self, text_data):
        message_data = json.loads(text_data)
        # message = message_data.get("message")
        # user_sender = message_data.get("user_sender")
        user_recipient = message_data.get("user_recipient")
        # timestamp = message_data.get("timestamp")
        file_data = message_data.get("file")

        if file_data is not None:
            file_name = file_data.get("name")
            file_type = file_data.get("type")
            file_data_url = file_data.get("data")
            if file_data_url is not None:
                # decode the data
                file_content = base64.b64decode(file_data_url.split(",")[1])
                message_data["file"] = {
                    "name": file_name,
                    "type": file_type,
                    "size": len(file_content),
                    "data": file_data_url,
                }
        # get message data
        msg_value = await self.save_message(message_data)
        # Send the message to the group self.room_groupe_name
        await self.channel_layer.group_send(
            "chat_%s" % user_recipient,
            {
                "type": "chat_message",
                "message": msg_value,
            },
        )
        await self.channel_layer.group_send(
            self.room_groupe_name,
            {
                "type": "chat_message",
                "message": msg_value,
            },
        )

    async def chat_message(self, event):
        message = event["message"]

        # Send the message to the websocket
        await self.send(
            text_data=json.dumps(message)
        )
