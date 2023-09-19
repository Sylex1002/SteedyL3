from django.db import models
from users.models import ProfilUser
import uuid


def get_file_path(instance, filename):
    ext = filename.split(".")[-1]
    if ext in ["jpg", "jpeg", "png", "gif"]:
        return f"messages/image/{filename}"
    elif ext in ["mp4", "avi", "mov"]:
        return f"messages/video/{filename}"
    elif ext in ["mp3", "wav", "m4a"]:
        return f"messages/audio/{filename}"
    else:
        return f"messages/fichier/{filename}"


class Message(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    user_sender = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="users_sender"
    )
    user_recipient = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="users_recipient"
    )
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to=get_file_path)
    fichier = models.FileField(null=True, blank=True, upload_to=get_file_path)
    video = models.FileField(null=True, blank=True, upload_to=get_file_path)
    audio = models.FileField(null=True, blank=True, upload_to=get_file_path)
    read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.user_sender.id} \
        to {self.user_recipient.id}: {self.content} [{self.timestamp}]"


# user message
class Conversation(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    user = models.ForeignKey(ProfilUser, on_delete=models.CASCADE)
    other_user = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE,
        related_name="other_user_conversation"
    )
    last_message = models.ForeignKey(
        Message,
        on_delete=models.SET_NULL, null=True
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["user", "other_user"]
        ordering = ["-timestamp"]

    def __str__(self):
        return f"chat between\
            {self.user.username} and {self.other_user.username}"
