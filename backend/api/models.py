"""Module providingFunction printing python version."""
import uuid
from django.db import models


# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    """ this function use to go in the path """
    return f"category/{filename}".format(filename=filename)


# Create your models here.
class Category(models.Model):
    """this class is model of category"""
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100, unique=True)
    image = models.ImageField(
        upload_to=upload_to, blank=True, null=True, default="category/user.jpg"
    )
    parentId = models.CharField(max_length=100, blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
