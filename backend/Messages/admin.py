from django.contrib import admin
from .models import Message

# registre user model for admin
admin.site.register(Message)
