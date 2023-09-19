from django.contrib import admin
from .models import Groupe, GroupeMessage

# registre user model for admin
admin.site.register(Groupe)
admin.site.register(GroupeMessage)
