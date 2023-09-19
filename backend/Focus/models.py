# from moviepy.editor import *
import os
import uuid

from api.models import Category
from django.core.exceptions import ValidationError
from users.models import ProfilUser
from django.db import models
from Professionnels.models import Professionnel
from cloudinary.models import CloudinaryField
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import cloudinary.uploader

# def upload_audio(self, value):
#     # Vérifier l'extension de fichier
#     valid_extensions = ['.mp3', '.wav',
# '.aiff', '.flac', '.ogg', '.aac', '.wma', '.m4a', '.mka']
#     ext = os.path.splitext(value)[1]
#     if not ext.lower() in valid_extensions:
#         raise ValidationError(
# "File type not supported. Please upload an audio
# file with a valid extension.")

#     # Enregistrer le fichier audio dans le stockage par défaut de Django
#     # audio_name = default_storage.save(f"focus/{value}", value)
#     # return str(audio_name)
#     return 'focus/{filename}'.format(filename=value)


def upload_audio(instance, filename):
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
    ext = os.path.splitext(filename)[1]
    if not ext.lower() in valid_extensions:
        raise ValidationError(
            "File type not supported. Please upload an \
            audio file with a valid extension."
        )

    # Customize this function as ne
    # eded to set the destination folder for the podcast file
    return f"podcasts/{filename}".format(filename=filename)


def upload_to_bg(instance, filename):
    return f"bg/{filename}".format(filename=filename)


class Focus(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    professionnel = models.ForeignKey(
        Professionnel,
        on_delete=models.CASCADE,
        related_name="focus_professionnel"
    )
    categorie = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="categorie",
    )
    titre = models.CharField(max_length=100, null=True, blank=False)
    description = models.TextField(max_length=500, null=True, blank=True)
    liked_by = models.ManyToManyField(
        ProfilUser, blank=True, related_name="liked_focus"
    )
    podcast = CloudinaryField(
        "podcast",
        resource_type="auto",
        folder="podcasts", null=True, blank=True
    )
    number_listen = models.ManyToManyField(
        ProfilUser, blank=True, related_name="listened_focus"
    )
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    payant = models.BooleanField(default=True)
    bg = CloudinaryField(
        "bg",
        null=True,
        blank=True,
        folder="bg",
        resource_type="auto",
        default="image/upload/v1690180303/bg/cld-sample.jpg",
    )

    def add_listen(self, user):
        if user not in self.number_listen.all():
            self.number_listen.add(user)

    def __str__(self):
        return self.titre


# delete image
@receiver(pre_delete, sender=Focus)
def delete_related_image(sender, instance, **kwargs):
    # Vérifiez s'il y a une image associée à l'objet 'Focus'
    if instance.bg:
        # Supprimez l'image de Cloudinary en utilisant l'URL de l'image
        cloudinary.uploader.destroy(instance.bg.public_id)

    if instance.podcast:
        # Supprimez podcast de Cloudinary en utilisant l'URL de podcast
        cloudinary.uploader.destroy(instance.podcast.public_id)


# Share Model
class Share(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    focus = models.ForeignKey(Focus, on_delete=models.CASCADE)
    user = models.ForeignKey(ProfilUser, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description


# Commentaire Model
class Comment(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    focus = models.ForeignKey(
        Focus,
        on_delete=models.CASCADE,
        related_name="comments"
    )
    user = models.ForeignKey(ProfilUser, on_delete=models.CASCADE)
    comment_text = models.TextField(max_length=500)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment_text


# serie
class Serie(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    professionnel = models.ForeignKey(
        Professionnel, on_delete=models.CASCADE, related_name="series"
    )
    titre = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=500, null=True, blank=True)
    focuses = models.ManyToManyField(Focus, related_name="series", blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titre

    def add_focus(self, focus):
        if focus.professionnel == self.professionnel:
            self.focuses.add(focus)
            return True
        return False
