from django.db import models
from users.models import ProfilUser
import uuid


# Create your models here.
class Etudiants(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    user = models.OneToOneField(
        ProfilUser, on_delete=models.CASCADE, related_name="etudiant"
    )
    # autres champs pour le modèle Etudiant
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.first_name
