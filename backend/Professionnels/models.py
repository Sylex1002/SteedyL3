from django.db import models
import os
import uuid

from users.models import ProfilUser
from django.core.exceptions import ValidationError


def upload_audio(self, value):
    # Vérifier l'extension de fichier
    valid_extensions = [
        ".mp3",
        ".wav",
        ".aiff",
        ".flac",
        ".ogg",
        ".aac",
        ".wma",
        ".m4a",
        ".mka",
    ]
    ext = os.path.splitext(value)[1]
    if not ext.lower() in valid_extensions:
        raise ValidationError(
            "File type not supported. Please upload \
            an audio file with a valid extension."
        )

    # Enregistrer le fichier audio dans le stockage par défaut de Django
    # audio_name = default_storage.save(f"focus/{value}", value)
    # return str(audio_name)
    return "prof/{filename}".format(filename=value)


# # Create your models here.
class Professionnel(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    user = models.OneToOneField(
        ProfilUser, on_delete=models.CASCADE, related_name="professeur"
    )
    podcast = models.FileField(
        upload_to=upload_audio, blank=True, null=True, default="prof/test.ogg"
    )
    followers = models.ManyToManyField(
        ProfilUser, blank=True, related_name="prof_followers"
    )
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.first_name} "


# cours
class Cour(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    professionnel = models.ForeignKey(
        Professionnel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="professeur",
    )
    # autres champs pour le modèle Professeur
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
