from django.contrib import admin
from .models import Professionnel, Cour


class AdminProfessionnel(admin.ModelAdmin):
    list_display = ("user", "podcast", "createdAt")


class AdminCour(admin.ModelAdmin):
    list_display = ("professionnel", "name", "createdAt")


# Register your models here.

admin.site.register(Professionnel, AdminProfessionnel)
admin.site.register(Cour, AdminCour)
