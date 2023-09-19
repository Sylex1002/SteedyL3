from django.contrib import admin
from .models import Etudiants


class AdminEtudiants(admin.ModelAdmin):
    list_display = ("user", "createdAt")


# Register your models here.
admin.site.register(Etudiants, AdminEtudiants)
