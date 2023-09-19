from django.urls import path
from . import views

urlpatterns = [
    path("all_notifications/", views.get_all_notification),
    path("read_notification/<str:id>/", views.read_notification),
    path("my_notification/<str:id>/", views.get_notifications_for_user),
    path("delete-notification/<str:id>/", views.delete_notification),
    path(
        "del-notif-and-group/<str:id>/<str:id_group>/",
        views.delete_notif_AND_groupWaiting
    ),
    path("get-notif-msg/<str:id>/", views.get_notifications_message_of_user),
]
