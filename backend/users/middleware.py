from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import TokenRefreshView
from .models import UserToken
from django.utils import timezone


class TokenRefreshMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Vérifiez si l'utilisateur est authentifié
        if request.user.is_authenticated:
            try:
                # Récupérer le token d'accès à partir de
                # la base de données pour l'utilisateur donné
                user_token = UserToken.objects.get(user=request.user)

                # Vérifier si le token d'accès est expiré
                access_token = AccessToken(user_token.access_token)
                expiration_time = access_token["exp"]
                current_time = timezone.now().timestamp()

                if current_time >= expiration_time:
                    # Le token d'accès est expiré, effectuer
                    # un rafraîchissement automatique
                    refresh_view = TokenRefreshView()
                    refresh_request = request._clone()
                    refresh_request.data = {
                        "refresh": user_token.refresh_token}

                    try:
                        refresh_response = refresh_view.post(refresh_request)
                        new_access_token = refresh_response.data.get("access")
                        new_refresh_token = refresh_response.data.get("refresh")

                        if new_access_token:
                            # Mettre à jour le token 
                            # d'accès dans la base de données
                            user_token.access_token = new_access_token
                            user_token.refresh_token = new_refresh_token
                            user_token.save()

                            # Mettre à jour le header Authorization
                            # avec le nouveau token d'accès
                            request.META[
                                "HTTP_AUTHORIZATION"
                            ] = f"Bearer {new_access_token}"
                    except Exception:
                        # Gérer l'erreur de rafraîchissement du token
                        pass

            except UserToken.DoesNotExist:
                # Le token d'accès n'existe pas dans la base de
                # données pour l'utilisateur donné
                pass

        return response
