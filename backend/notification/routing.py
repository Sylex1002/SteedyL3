from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # re_path(r"ws/notification/(?P<room_name>\w+)/$",
    # consumers.NotificationConsumer.as_asgi()),
    re_path(
        r"ws/notification/(?P<room_name>[-\w]+)/$",
        consumers.NotificationConsumer.as_asgi(),
    ),
    # re_path(r"ws/notification/$", consumers.NotificationConsumer.as_asgi()),
    re_path(
        r"ws/notif_admin/$",
        consumers.NotificationAdminConsumer.as_asgi()
    ),
]
