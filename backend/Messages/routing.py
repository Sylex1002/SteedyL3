from django.urls import re_path
from Messages.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(
        r"ws/chat/messages/(?P<chat>[-\w]+)/$",
        ChatConsumer.as_asgi(),
    ),
]
