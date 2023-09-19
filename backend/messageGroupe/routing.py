from django.urls import re_path
from messageGroupe.consumers import ChatGroupe

websocket_urlpattern = [
    re_path(r"ws/chat/messagegroupe/(?P<chat>[-\w]+)/$", ChatGroupe.as_asgi()),
]
