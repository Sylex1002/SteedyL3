from django.db import models
from Professionnels.models import Professionnel
from users.models import ProfilUser
from api.models import Category
import uuid
from cloudinary.models import CloudinaryField
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import cloudinary.uploader


# Create your models here.
def upload_to(self, value):
    if value.endswith((".png", ".jpg", ".jpeg", ".gif")):
        return "highlight/images/{value}".format(value=value)

    if value.endswith((".mp4", ".avi", ".mov", ".wmv", ".flv")):
        return value


# highlight model
class HighLight(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    professionnel = models.ForeignKey(
        Professionnel, on_delete=models.CASCADE, related_name="professionnel"
    )
    file = CloudinaryField(
        "HighLight",
        null=True,
        blank=True,
        folder="HighLight",
        resource_type="auto",
        default="image/upload/v1690180305/HighLight/cld-sample-5.jpg",
    )
    description = models.TextField(max_length=250, null=True, blank=True)
    type = models.BooleanField(default=False)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="category_highlight",
    )
    view = models.ManyToManyField(
        ProfilUser,
        blank=True,
        related_name="highlight_view"
    )
    like = models.ManyToManyField(
        ProfilUser,
        blank=True,
        related_name="highlight_like"
    )
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)


# delete image
@receiver(pre_delete, sender=HighLight)
def delete_related_image(sender, instance, **kwargs):
    # Vérifiez s'il y a une image associée à l'objet 'Focus'
    if instance.file:
        # Supprimez l'image de Cloudinary en utilisant l'URL de l'image
        cloudinary.uploader.destroy(instance.file.public_id)
