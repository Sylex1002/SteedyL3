"""Module providingFunction printing python version."""
from django.contrib import admin
from .models import Category


class AdminCategory(admin.ModelAdmin):
    """Class representing a category"""
    list_display = ("name", "slug", "parentId", "createdAt")


# Register your models here.
admin.site.register(Category, AdminCategory)
