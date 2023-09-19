from django.db import models
from users.models import ProfilUser
import uuid
from django.utils import timezone


def get_file_path(instance, filename):
    ext = filename.split(".")[-1]
    if ext in ["jpg", "jpeg", "png", "gif"]:
        return f"messageGroupes/image/{filename}"
    elif ext in ["mp4", "avi", "mov"]:
        return f"messageGroupes/video/{filename}"
    elif ext in ["mp3", "wav", "m4a"]:
        return f"messageGroupes/audio/{filename}"
    else:
        return f"messageGroupes/fichier/{filename}"


def get_proil_group(instance, image):
    ext = image.split(".")[-1]
    if ext in ["jpg", "jpeg", "png", "gif"]:
        return f"profilGroupe/{image}"
    return


class Groupe(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    groupe_name = models.CharField(max_length=50)
    createur = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="created_groups"
    )
    members = models.ManyToManyField(
        ProfilUser, blank=True, related_name="group_membership"
    )
    description = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to=get_proil_group)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.groupe_name


class GroupeMessage(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    to_groupe = models.ForeignKey(
        Groupe, on_delete=models.CASCADE, related_name="groupe_names"
    )
    user_sender = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="user_sender"
    )
    message = models.CharField(max_length=1024, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to=get_file_path)
    fichier = models.FileField(null=True, blank=True, upload_to=get_file_path)
    video = models.FileField(null=True, blank=True, upload_to=get_file_path)
    audio = models.FileField(null=True, blank=True, upload_to=get_file_path)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    views = models.ManyToManyField(
        ProfilUser, blank=True, related_name="group_memberviews"
    )


class GroupeEnAttent(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    groupes = models.ForeignKey(
        Groupe, on_delete=models.CASCADE, related_name="group_to_joindre"
    )
    user_demande = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="user_demande"
    )
    en_attente = models.BooleanField(default=True)
    agreedText = models.CharField(max_length=50, null=True, blank=True)
    reasonForJoining = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
