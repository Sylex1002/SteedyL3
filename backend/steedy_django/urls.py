
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('Focus.urls')),
    path('api/', include('publications.urls')),
    path('api/', include('Professionnels.urls')),
    path('api/', include('Highlight.urls')),
    path('api/', include('api.urls')),
    path('api/', include('Etudiants.urls')),
    path('api/', include('notification.urls')),
    path('api/', include('Messages.urls')),
    path('api/', include('messageGroupe.urls')),
    path("__debug__/", include("debug_toolbar.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
