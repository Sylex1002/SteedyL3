from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
import datetime
import random
from django.contrib.auth.models import Permission
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Group
from PIL import Image
from api.models import Category
import uuid


# generate matricule
def generate_matricule():
    date_nom = datetime.datetime.now()
    numbers = [2019, 2022, 3456, 1234, 3454, 2345, 2375, 4056, 1010, 2323]
    matricule = (
        str(date_nom.strftime("%Y%m%d%H%M%S"))
        + str(random.choice(numbers))
        + str(date_nom.microsecond)
    )
    return matricule


# profil manger ,is have two function
class ProfilUserManager(BaseUserManager):
    # this function ,who can create simple user
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email address is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    # this function,who can create super user
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return "profils/{filename}".format(filename=filename)


def validate_image(file):
    # Fonction pour valider si le fichier est une image
    try:
        img = Image.open(file)
        img.verify()
    except Exception as e:
        raise ValidationError("Le fichier n'est pas une image valide.", e)


# user model
class ProfilUser(AbstractBaseUser):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    categories = models.ManyToManyField(
        Category, blank=True, related_name="user_category"
    )
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    matricule = models.CharField(max_length=100, default=generate_matricule)
    fonction = models.CharField(
        max_length=100, null=True, blank=True, default="Etudiant"
    )
    domain = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    bio = models.TextField(max_length=250, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_regular_user = models.BooleanField(default=True)
    status = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    objects = ProfilUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    following = models.ManyToManyField(
        "self", through="Follower", related_name="followers", symmetrical=False
    )
    # image relations
    image_url = models.FileField(
        upload_to=upload_to,
        blank=True,
        null=True,
        validators=[validate_image],
        default="profils/user.png",
    )

    user_permissions = models.ManyToManyField(Permission, blank=True)
    groups = models.ManyToManyField(Group, blank=True)

    def get_group_permissions(self, obj=None):
        permissions = Permission.objects.filter(group__profiluser=self)
        return permissions.values_list("codename", flat=True).order_by()

    def get_all_permissions(self, obj=None):
        return self.user_permissions.all() | self.get_group_permissions(obj)

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def __str__(self):
        return self.email

    def get_full_name(self):
        if self.last_name:
            return f"{self.first_name} {self.last_name}"
        else:
            return self.first_name

    def save(self, *args, **kwargs):
        # Si l'utilisateur fournit une URL pour l'image,
        # vous pouvez la stocker dans "image_url"
        # et laisser "upload_to" vide
        if self.image_url and (
            self.image_url.url.startswith("http://")
            or self.image_url.url.startswith("https://")
        ):
            self.image_or_url = self.image_url.url
            self.image_url = None
        # Sinon, il s'agit d'une image locale, v
        # ous pouvez laisser "image_url" tel quel
        elif not self.image_url:
            # Si aucune image n'est fournie par l'utilisateur,
            # utilisez l'image par défaut
            self.image_url = "profils/user.jpg"
        super(ProfilUser, self).save(*args, **kwargs)


# Experience model for user
class Experiences(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    user = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="experiences"
    )
    entreprise = models.CharField(max_length=100)
    poste = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    description = models.TextField(max_length=500, null=True, blank=True)
    during = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.poste


# Follower model for user
class Follower(models.Model):
    user = models.ForeignKey(
        ProfilUser, related_name="following_set", on_delete=models.CASCADE
    )
    follower = models.ForeignKey(
        ProfilUser, related_name="followers_set", on_delete=models.CASCADE
    )

    class Meta:
        # Unique_together permet a dire a utilisateur
        # suivre une autre persone une seul foi
        unique_together = ("user", "follower")


# user token


class UserToken(models.Model):
    user = models.OneToOneField(ProfilUser, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=500)
    refresh_token = models.CharField(max_length=500)
