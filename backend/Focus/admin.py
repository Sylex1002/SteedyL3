from django.contrib import admin
from .models import Focus, Comment, Share, Serie


class AdminFocus(admin.ModelAdmin):
    """admin of focus"""
    list_display = ("professionnel", "categorie", "titre", "createdAt")


class AdminComment(admin.ModelAdmin):
    """admin pf comment"""
    list_display = ("focus", "user", "createdAt")


class AdminSerie(admin.ModelAdmin):
    """admin od serie"""
    list_display = (
        "professionnel",
        "titre",
        "description",
        "display_focuses",
        "createdAt",
    )

    def display_focuses(self, obj):
        return ", ".join([focus.titre for focus in obj.focuses.all()])

    display_focuses.short_description = "Focuses"  # Set the column header


# Register your models here.
admin.site.register(Focus, AdminFocus)
admin.site.register(Comment, AdminComment)
admin.site.register(Share)
admin.site.register(Serie, AdminSerie)
