from django.contrib import admin
from .models import HighLight


class AdminHighLight(admin.ModelAdmin):
    list_display = ("professionnel", "file", "category", "createdAt")


# Register your models here.
admin.site.register(HighLight, AdminHighLight)
