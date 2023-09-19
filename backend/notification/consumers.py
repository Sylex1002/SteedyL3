from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json


class NotificationAdminConsumer(WebsocketConsumer):
    # Cette méthode statique permet de déterminer le nom du groupe
    # de notifications pour un utilisateur donné.
    @staticmethod
    def get_admin_user_group(user):
        if user.is_superuser:
            # Le nom du groupe de notifications pour les
            # administrateurs est "notification_admin_<user_id>"
            return f"notification_admin_{user.id}"
        else:
            # Si l'utilisateur n'est pas un administrateur,
            # on ne crée pas de groupe de notifications.
            return None

    def connect(self):
        # On récupère l'utilisateur à partir du scope.
        self.user = self.scope["user"]
        # On détermine le nom du groupe de notifications pour cet utilisateur.
        self.room_group_name = self.get_admin_user_group(self.user)

        if self.room_group_name is not None:
            # Si le groupe de notifications existe,
            # on ajoute la connexion à ce groupe.
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name, self.channel_name
            )

        # On envoie une réponse de confirmation.
        self.accept()

    def disconnect(self, close_code):
        # On retire la connexion du groupe de notifications correspondant.
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data):
        # Cette méthode est appelée lorsqu'on reçoit un message
        # depuis le WebSocket. Dans ce cas, on ne fait rien car
        # les notifications sont envoyées depuis le backend.
        pass

    # Cette méthode permet d'envoyer une notification à
    # l'utilisateur connecté à ce WebSocket.
    def send_notification(self, message):
        # On vérifie que la connexion est toujours active.
        if self.room_group_name is not None:
            # On envoie le message au groupe de notifications
            # correspondant à cet utilisateur.
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "notification_message",
                    "message": message,
                },
            )

    # Cette méthode est appelée lorsqu'on reçoit un message
    # depuis le groupe de notifications.
    def notification_message(self, event):
        # On récupère le message depuis l'événement.
        message = event["message"]

        # On envoie le message au WebSocket.
        self.send(
            text_data=json.dumps(
                {
                    "type": "notification",
                    "message": message,
                }
            )
        )


#  notification
class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "notification_%s" % self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {"type": "notification_message", "message": message}
        )

    # Receive message from room group
    def notification_message(self, event):
        message = event["message"]
        # Envoyer le dictionnaire JSON via WebSocket
        self.send(text_data=json.dumps(message))
