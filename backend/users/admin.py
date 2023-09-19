from django.contrib import admin
from .models import ProfilUser, Experiences, Follower, UserToken
from django.utils.translation import gettext_lazy as _
# from chartjs.views.lines import BaseLineChartView


# class of admin profilUser
class AdminProfilUser(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "email",
        "matricule",
        "fonction",
        "address",
        "phone_number",
        "createdAt",
    )
    list_per_page = 20
    search_fields = (
        "first_name",
        "last_name",
        "email",
        "matricule",
        "fonction",
        "address",
        "phone_number",
        "createdAt",
    )
    empty_value_display = "-empty-"


class AdminExperiense(admin.ModelAdmin):
    list_display = (
        "user",
        "entreprise",
        "poste",
        "year",
        "during",
        "createdAt")
    list_per_page = 20
    search_fields = (
        "user",
        "entreprise",
        "poste",
        "year",
        "during",
        "createdAt"
    )


class AdminFollower(admin.ModelAdmin):
    list_display = ("user", "follower")
    list_per_page = 20
    search_fields = ("user", "follower")


class AdminUserToken(admin.ModelAdmin):
    list_display = ("user", "access_token", "refresh_token")
    list_per_page = 20
    search_fields = ("user", "access_token", "refresh_token")


# registre user model for admin
admin.site.register(ProfilUser, AdminProfilUser)
# registre experience model for admin
admin.site.register(Experiences, AdminExperiense)
# registre follower for admin
admin.site.register(Follower, AdminFollower)
# user token
admin.site.register(UserToken, AdminUserToken)

admin.site.site_title = _("STEDDY PLATFORME")
admin.site.site_header = _("STEDDY PLATFORME")
admin.site.index_title = _("STEDDY PLATFORME")
