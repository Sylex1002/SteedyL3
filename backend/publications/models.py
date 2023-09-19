from django.db import models
from users.models import ProfilUser
import uuid


def telecharger(self, value):
    if value.endswith((".png", ".jpg", ".jpeg", ".gif")):
        return "publications/Image/" + value

    if value.endswith((".mp4", ".avi", ".mov", ".wmv", ".flv")):
        return "publications/Video/" + value


# publication model
class UsersPublication(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    user = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="publicationss"
    )
    photos = models.FileField(upload_to=telecharger, null=True, blank=True)
    description = models.TextField(max_length=250, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
