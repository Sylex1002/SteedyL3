import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from Messages.routing import websocket_urlpatterns as messages_urlpatterns
from messageGroupe.routing import websocket_urlpattern as messagegroupe_urlpatterns
from notification.routing import websocket_urlpatterns as notiication_urlpatterns


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(
                URLRouter(
                    notiication_urlpatterns
                    + messages_urlpatterns
                    + messagegroupe_urlpatterns,
                )
            )
        ),
    }
)
