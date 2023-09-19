from rest_framework_simplejwt.views import (
                                            TokenObtainPairView,
                                            TokenRefreshView)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.conf import settings
# from django.db.models import Q
import jwt
import os
import secrets
import string
import requests
from django.core.files.base import ContentFile
from jwt.exceptions import (
    ExpiredSignatureError
)
from .utils import Util


from django.contrib.auth import authenticate, login
# from rest_framework.permissions import AllowAny
from cryptography.fernet import Fernet
import time
import datetime
import random
from django.db.models import Count
from passlib.hash import bcrypt
from rest_framework import generics

from api.compressed import compres_image
from Etudiants.models import Etudiants
from Professionnels.models import Professionnel
from Professionnels.serializers import ProfessionnelSerializer
from .models import ProfilUser, Experiences, Follower, UserToken
from .serializers import (
    ProfilUserSerializer,
    CustomTokenObtainPairSerializer,
    ExperiencesSerializer,
    FollowerSerializer,
    UserTokenSerializer,
    SetNewPasswordSerializer,
    VerifyOTPSerializer,
    SendOtpSerializer,
)

from api.models import Category


# @api_view(['POST'])
# def verify_id_token(id_token):
#     try:
#         decoded_token = auth.verify_id_token(id_token)
#         user_id = decoded_token['uid']
#         # Faites quelque chose avec l
# 'ID de l'utilisateur ou d'autres informations
#         return True
#     except auth.InvalidIdTokenError:
#         return False


# hello world view
@api_view(["GET"])
def test_view(request):
    return Response("Hello world")


# Fonction pour générer un mot de passe aléatoire
def generate_random_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    return "".join(secrets.choice(characters) for _ in range(length))


# encrypte
def encrypt_value(value):
    cipher_suite = Fernet(settings.ENCRYPTION_KEY)
    encrypted_value = cipher_suite.encrypt(str(value).encode())
    return encrypted_value.decode()


# decrypte
def decrypt_value(encrypted_value):
    cipher_suite = Fernet(settings.ENCRYPTION_KEY)
    decrypted_value = cipher_suite.decrypt(encrypted_value.encode())
    return decrypted_value.decode()


# generate matricule
def generate_matricule():
    date_nom = datetime.datetime.now()
    numbers = [
        2019,
        2022,
        3456,
        1234,
        3454,
        2345,
        2375,
        4056,
        1010,
        2323,
        2001
    ]
    matricule = (
        str(date_nom.strftime("%Y%m%d%H%M%S"))
        + str(random.choice(numbers))
        + str(date_nom.microsecond)
    )
    return matricule


# user signup
class SignupView(APIView):
    def post(self, request):
        # verification email
        if ProfilUser.objects.filter(email=request.data.get("email")).exists():
            return Response(
                {"error": "Email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # if first_name n'existe
        if request.data.get("username") is None:
            return Response(
                {"error": "username does not exit "},
                status=status.HTTP_400_BAD_REQUEST
            )

        # if username existe
        if ProfilUser.objects.filter(username=request.data.get("username")).exists():
            return Response(
                {"error": "username already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # if fonction is none and different of etudiant or professionel
        if request.data.get("fonction") is None and (
            request.data.get("fonction") != "Etudiant"
            or request.data.get("fonction") != "Professionnel"
        ):
            return Response(
                {"error": "You have to chosse your fonction"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # if first_name n'existe
        if request.data.get("first_name") is None:
            return Response(
                {"error": "first name does not exit "},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # if first_name n'existe
        if request.data.get("last_name") is None:
            return Response(
                {"error": "last name does not exit "},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # if first_name n'existe
        password = request.data.get("password")
        if password is None:
            return Response(
                {"error": "password name does not exit "},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # username
        username = request.data.get("username")

        # create user
        user = ProfilUser.objects.create_user(
            email=request.data["email"],
            password=password,
            username=username,
            first_name=request.data["first_name"],
            last_name=request.data["last_name"],
        )
        # if domaine existe
        if request.data.get("domain") is not None:
            user.domain = request.data.get("domain")

        # if image_url existe
        if request.data.get("image_url") is not None:
            picture_url = request.data.get("image_url")
            response = requests.get(picture_url)
            if response.status_code == 200:
                # Téléchargez l'image et enregistrez-la dans le champ
                # 'image_url' de l'utilisateur
                user.image_url.save(
                    f"{user.username}_picture.jpg",
                    ContentFile(response.content),
                    save=True,
                )

        # #if fonction existe
        if request.data.get("fonction") is not None:
            user.fonction = request.data.get("fonction")
            # If user is etudiant
            if request.data.get("fonction") == "Etudiant":
                Etudiants.objects.create(user=user)

            # if user is professionnel
            if request.data.get("fonction") == "Professionnel":
                Professionnel.objects.create(user=user)

        # save into database
        user.save()
        #
        refresh = RefreshToken.for_user(user)
        response_data = {
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user_id": user.id,
            "email": user.email,
            "username": user.username,
            "fonction": user.fonction,
            # Ajoutez d'autres champs d'utilisateur nécessaires
        }
        return Response(response_data)


# create super user
class SuperUser(APIView):
    def post(self, request):
        # verification email
        email = request.data.get("email")
        if ProfilUser.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if (
            request.data.get("email") is None
            or request.data.get("password") is None
            or request.data.get("username") is None
            or request.data.get("first_name") is None
            or request.data.get("last_name") is None
        ):
            return Response(
                {"error": "All input is request"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # username
        username = request.data["username"] + "-" + generate_matricule()

        # create user
        user = ProfilUser.objects.create_superuser(
            email=request.data["email"],
            password=request.data["password"],
            username=username,
            first_name=request.data["first_name"],
            last_name=request.data["last_name"],
        )
        # save into database
        user.save()
        return Response(
            {"message": "successFull"},
            status=status.HTTP_201_CREATED
        )


# user  information method [GET PUT]
class ProfilView(APIView):
    # permission_classes = [IsAuthenticated]
    def get_object(self, id):
        try:
            return ProfilUser.objects.get(id=id)
        except ProfilUser.DoesNotExist:
            return Response(
                {"error": "user does not exists"},
                status=status.HTTP_404_NOT_FOUND
            )

    def get(self, request, id):
        users = self.get_object(id)
        serializer = ProfilUserSerializer(users, many=False)
        return Response(serializer.data)

    def put(self, request, id):
        users = self.get_object(id)
        # verification data if is existes
        if request.data.get("username") is not None:
            users.username = request.data["username"]

        if request.data.get("first_name") is not None:
            users.first_name = request.data["first_name"]

        if request.data.get("last_name") is not None:
            users.last_name = request.data["last_name"]

        if request.data.get("email") is not None:
            users.email = request.data["email"]

        if request.data.get("fonction") is not None:
            users.fonction = request.data["fonction"]

        if request.data.get("domain") is not None:
            users.domain = request.data["domain"]

        if request.data.get("address") is not None:
            users.address = request.data["address"]

        if request.data.get("phone_number") is not None:
            users.phone_number = request.data["phone_number"]

        if request.data.get("bio") is not None:
            users.bio = request.data["bio"]

        users.save()
        serializer = ProfilUserSerializer(users, many=False)
        return Response(serializer.data)


# Get all user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def users_lists(request):
    users = ProfilUser.objects.all()
    serializer = ProfilUserSerializer(users, many=True)
    return Response(serializer.data)


# ajoute des category for user
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def user_category(request, id):
    if request.data.get("category_id"):
        return Response(
            {"error": "All input is request"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # get user
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_404_NOT_FOUND
        )

    # get category
    try:
        category = Category.objects.get(id=request.data.get("category_id"))
    except Category.DoesNotExist:
        return Response(
            {"error": "category does not exists"},
            status=status.HTTP_404_NOT_FOUND
        )

    # save categories
    user.categories = category
    user.save()

    serializer = ProfilUserSerializer(user, many=False)
    return Response(serializer.data)


# verify email of user
@api_view(["POST"])
def verify_email(request):
    email = request.data.get("email")

    try:
        user = ProfilUser.objects.get(email=email)
        serializer = ProfilUserSerializer(user, many=False).data
        exists = True
    except ProfilUser.DoesNotExist:
        exists = False
        serializer = {"email": email}

    response_data = {"user": serializer, "exists": exists}

    return Response(response_data)


# verify username of user
@api_view(["POST"])
def verify_username(request):
    username = request.data.get("username")
    try:
        user = ProfilUser.objects.get(username=username)
        exists = True
    except ProfilUser.DoesNotExist:
        exists = False

    if user:
        serializer = ProfilUserSerializer(user, many=False)
    else:
        serializer = username

    response_data = {"user": serializer.data, "exists": exists}

    return Response(response_data)


# =============TOKEN USER=======================
# refresh token view
class CustomTokenRefreshView(TokenRefreshView):
    pass


# create token view login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        # Récupérer les tokens générés par le super()
        response = super().finalize_response(request, response, *args, **kwargs)

        # Extraire l'ID de l'utilisateur de la réponse
        if "user_id" in response.data:
            user_id = response.data["user_id"]

            try:
                user = ProfilUser.objects.get(id=user_id)
            except ProfilUser.DoesNotExist:
                return Response(
                    {"error": "user does not exists"},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Récupérer les tokens d'accès et 
            # de rafraîchissement à partir de la réponse
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data

            # Stocker les tokens dans la base de données
            access_token = str(tokens["access"])
            refresh_token = str(tokens["refresh"])

            # enregistre user token
            UserToken.objects.update_or_create(
                user=user,
                defaults={
                    "access_token": access_token,
                    "refresh_token": refresh_token
                },
            )

        return response


# decode token of user ,this function return  user is
@api_view(["POST"])
def get_refresh_value_token(request):
    if request.data.get("token") is None:
        return Response(
            {"error": "Le jeton n'existe pas"},
            status=status.HTTP_400_BAD_REQUEST
        )  # 400 Bad Request est plus approprié pour les données manquantes

    try:
        decoded_token = jwt.decode(
            request.data.get("token"), settings.SECRET_KEY, algorithms=["HS256"]
        )

    except ExpiredSignatureError:  # Utilisez ExpiredSignatureError ici
        return Response(
            {"error": "Le jeton a expiré"}, status=status.HTTP_401_UNAUTHORIZED
        )  # 401 Unauthorized pour un jeton expiré

    try:
        user = ProfilUser.objects.get(id=decoded_token["user_id"])
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "L'utilisateur n'existe pas"},
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        user_token = UserToken.objects.get(user=user)
    except UserToken.DoesNotExist:
        return Response(
            {"error": "Le jeton utilisateur n'existe pas"},
            status=status.HTTP_404_NOT_FOUND,
        )

    refresh_view = TokenRefreshView()
    if user_token is not None:
        refresh_response = refresh_view.post(user_token.refresh_token)
        new_access_token = refresh_response.data.get("access")
        new_refresh_token = refresh_response.data.get("refresh")
        if new_access_token:
            user_token.access_token = new_access_token
            user_token.refresh_token = new_refresh_token
            user_token.save()

    serializer = UserTokenSerializer(user_token, many=False)
    return Response(
        serializer.data, status=status.HTTP_200_OK
    )  # 200 OK pour une réponse réussie


@api_view(["POST"])
def decode_token(request):
    # Check if the 'token' is provided in the request data
    if "token" not in request.data:
        return Response(
            {"error": "token does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Decode token using the SECRET_KEY from Django settings
        decoded_token = jwt.decode(
            request.data["token"], settings.SECRET_KEY, algorithms=["HS256"]
        )
        # Assuming the decoded token contains 'token_type' and 'user_id' keys
        token_type = decoded_token["token_type"]
        user_id = decoded_token["user_id"]

        # Return the decoded values
        return Response(
            {
                "token_type": token_type,
                "user_id": user_id,
            }
        )

    except jwt.exceptions.ExpiredSignatureError:
        return Response(
            {"error": "token has expired"}, status=status.HTTP_401_UNAUTHORIZED
        )

    except jwt.exceptions.InvalidTokenError:
        return Response(
            {"error": "invalid token"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    except jwt.exceptions.DecodeError:
        return Response(
            {"error": "error decoding token"},
            status=status.HTTP_401_UNAUTHORIZED
        )


# getValue_token
@api_view(["POST"])
def getValue_token(request):
    # if is none
    if request.data.get("token") is None:
        return Response(
            {"error": "token does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    # decode token
    try:
        decoded_token = UserToken.objects.get(
            access_token=request.data.get("token"))
    except UserToken.DoesNotExist:
        return Response(
            {"error": "user does not exists"}, status=status.HTTP_404_NOT_FOUND
        )

    # return value
    return Response(decoded_token)


# user by token
@api_view(["POST"])
def user_by_token(request):
    # if is none
    if request.data.get("token") is None:
        return Response(
            {"error": "token does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    # decode token
    try:
        decoded_token = jwt.decode(
            request.data.get("token"),
            settings.SECRET_KEY, algorithms=["HS256"]
        )
    except jwt:
        return Response(
            {"error": "user does not exists"}, status=status.HTTP_404_NOT_FOUND
        )

    user_id = decoded_token["user_id"]

    try:
        user = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"}, status=status.HTTP_404_NOT_FOUND
        )

    # searilise user
    serializer = ProfilUserSerializer(user, many=False)
    return Response(serializer.data)


# login avec reseau socio
class SpecialLoginView(APIView):
    def post(self, request):
        # Vérifier les informations d'identification fournies
        email = request.data.get("email")
        password = request.data.get("password")

        if not password:
            # Génération automatique du mot de passe si non fourni
            password = generate_random_password()

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if user.is_active:
                # Authentifier l'utilisateur et générer les tokens
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                # Renvoyer les tokens et autres informations pertinentes
                response_data = {
                    "access_token": access_token,
                    "refresh_token": str(refresh),
                    "user_id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "fonction": user.fonction,
                    # Ajoutez d'autres champs d'utilisateur nécessaires
                }
                return Response(response_data)
            else:
                # Gérer le cas où le compte de l'utilisateur est désactivé
                return Response(
                    {"message": "User account is disabled."},
                    status=400
                )
        else:
            # Gérer le cas où les informations d'identification sont invalides
            return Response({"message": "Invalid credentials."}, status=400)


# connexion avec linkedin
@api_view(["POST"])
def login_with_linkedin(request):
    url = "https://www.linkedin.com/oauth/v2/accessToken"
    redirect_uri = "http://localhost:3000/linkedin"

    client_secret = "GaTfwZRiKpmhO24P"
    client_id = "77cmrgdqh6xh8a"
    code = request.data.get("code")

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
    }
    response = requests.post(url, data=data)
    response_data = response.json()

    if "access_token" in response_data:
        access_token = response_data["access_token"]

        # Appel à l'API de LinkedIn pour obtenir les informations du profil
        headers = {"Authorization": f"Bearer {access_token}"}

        response_profil = requests.get(
            "https://api.linkedin.com/v2/me", headers=headers
        )
        profile_data = response_profil.json()

        return Response(profile_data)
    else:
        error_data = {
            "error": "invalid_request",
            "error_description": "Unable to retrieve access token: authorization code not found",
        }
        return Response(error_data, status=response.status_code)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_user_by_matricule(request, matricule):

    try:
        user = ProfilUser.objects.get(matricule=matricule)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user id does not exists"},
            tatus=status.HTTP_400_BAD_REQUEST
        )

    # searilise user
    serializer = ProfilUserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_user_following(request, id):

    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user id does not exists"},
            tatus=status.HTTP_400_BAD_REQUEST
        )
        
    following = user.following.all()
    # searilise user
    serializer = ProfilUserSerializer(following, many=True)
    return Response(serializer.data)



# =======================EXPERIENCE==========================
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def getAll_experience(request):
    experience = Experiences.objects.all()
    serializer = ExperiencesSerializer(experience, many=True)
    return Response(serializer.data)


# post new experience
@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def post_experience(request):
    if request.data.get("user_id") is None:
        return Response(
            {"error": "user id does not exists"},
            tatus=status.HTTP_400_BAD_REQUEST
        )
    # get user who post experience
    user = ProfilUser.objects.get(id=request.data.get("user_id"))
    # verification de champ
    if (
        request.data.get("entreprise") is None
        and request.data.get("poste") is None
        and request.data.get("year") is None
        and request.data.get("description") is None
        and request.data.get("during") is None
    ):
        return Response(
            {"error": "all input is required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    # new experience
    new_experience = Experiences(
        user=user,
        entreprise=request.data.get("entreprise"),
        poste=request.data.get("poste"),
        year=request.data.get("year"),
        description=request.data.get("description"),
        during=request.data.get("during"),
    )
    # save new experience
    new_experience.save()
    # add into serielizer
    serielizer = ExperiencesSerializer(new_experience, many=False)
    return Response(serielizer.data)


# get all exprience of user
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def getUser_Experiences(request, id):
    # verifie if ue
    try:
        user = ProfilUser.objects.get(id=id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user does not exists"},
            status=status.HTTP_404_NOT_FOUND
        )
    # get experience from user
    experience = user.experiences.all()
    serializer = ExperiencesSerializer(experience, many=True)
    return Response(serializer.data)


# user details experience
class ExperiencesView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            return Experiences.objects.get(id=id)
        except Experiences.DoesNotExist:
            return Response(
                {"error": "Experiences does not exists"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def get(self, request, id):
        experiences = self.get_object(id)
        serializer = ExperiencesSerializer(experiences, many=False)
        return Response(serializer.data)

    def put(self, request, id):
        # get experience with id
        experiences = self.get_object(id)

        # condition if is none
        if request.data.get("entreprise") is not None:
            experiences.entreprise = request.data.get("entreprise")

        if request.data.get("poste") is not None:
            experiences.poste = request.data.get("poste")

        if request.data.get("year") is not None:
            experiences.year = request.data.get("year")

        if request.data.get("description") is not None:
            experiences.description = request.data.get("description")

        if request.data.get("during") is not None:
            experiences.during = request.data.get("during")
        # save experience
        experiences.save()
        serializer = ExperiencesSerializer(experiences, many=False)
        return Response(serializer.data)

    def delete(self, request, id):
        experiences = self.get_object(id)
        experiences.delete()
        return Response({"message": "experience deleted"})


# ================FOLLOWER==================
# follow auther user
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def follow_user(request):
    # verify if user id None
    if (request.data.get("follower") is None or request.data.get("user") is None):
        return Response(
            {"error": "you have to add followers and following"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # get user followers
    try:
        # select user and follower
        follower = ProfilUser.objects.get(id=request.data.get("follower"))
        user = ProfilUser.objects.get(id=request.data.get("user"))

    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Follower
    if Follower.objects.filter(user=user, follower=follower).exists():
        return Response(
            {"error": "you are already follow this user"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create a new instance of Follower
    new_follower = Follower(user=user, follower=follower)
    new_follower.save()

    #
    try:
        professionnel = Professionnel.objects.get(user=user)
    except Professionnel.DoesNotExist:
        return Response({"message": "professionnel not found"}, status=404)

    # serialize new follower
    serializer = ProfessionnelSerializer(professionnel, many=False)
    # return int front
    return Response(serializer.data)


# get follower
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def follower_user(request, id):
    user = ProfilUser.objects.get(id=id)
    followers = user.followers_set.all()
    serialize = FollowerSerializer(followers, many=True)
    return Response(serialize.data)


# get following
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def following_user(request, id):
    user = ProfilUser.objects.get(id=id)
    followers = user.following_set.all()
    serialize = FollowerSerializer(followers, many=True)
    return Response(serialize.data)


# unfollowing
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def unfollow_user(request):
    if request.data.get("follower") is None or request.data.get("user") is None:
        return Response(
            {"error": "Your request missing some thing"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # select user and follower
        user = ProfilUser.objects.get(id=request.data.get("user"))
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # select user and follower
        follower = ProfilUser.objects.get(id=request.data.get("follower"))
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    # filtre and delete
    user_follower = Follower.objects.filter(user=user, follower=follower)
    user_follower.delete()

    # fetch new follower data
    try:
        professionnel = Professionnel.objects.get(user=user)
    except Professionnel.DoesNotExist:
        return Response({"message": "professionnel not found"}, status=404)

    serializer = ProfessionnelSerializer(professionnel, many=False)
    # serialize new follower
    return Response(serializer.data)


# post follower user all
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_follower_user_all(request):
    # verify if follower and user ids are provided
    follower_id = request.data.get("follower")
    user_id = request.data.get("user")

    # verify if user id None
    if follower_id is None or user_id is None:
        return Response(
            {"error": "you have to add followers and following"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # get user followers
    try:
        # select user and follower
        follower = ProfilUser.objects.get(id=follower_id)
        user = ProfilUser.objects.get(id=user_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Follower
    if Follower.objects.filter(user=user, follower=follower).exists():
        return Response(
            {"error": "you are already follow this user"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create a new instance of Follower and save it
    new_follower = Follower(user=user, follower=follower)
    new_follower.save()

    # get new follower user
    try:
        # select user and follower
        new_follower = ProfilUser.objects.get(id=follower_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Get the professionals followed by the user
    following_users = new_follower.followers.all()
    # Get the categories of the authenticated user
    user_categories = new_follower.categories.all()
    # Get the IDs of the professionals that the user is following
    following_ids = new_follower.followers.all().values_list("id", flat=True)

    # Get the professionals that correspond to those users
    following_professionals = Professionnel.objects.filter(user__in=following_users)
    serializer_all_follow = ProfessionnelSerializer(following_professionals, many=True)

    # Get the latest 10 professionals
    prof_all = Professionnel.objects.all().order_by("-id")[:10]
    serializer_all = ProfessionnelSerializer(prof_all, many=True)

    # prof populaire
    prof_populaire = Professionnel.objects.annotate(
        follower_count=Count("user__followers")
    ).order_by("-follower_count")[:10]
    serializer_populaire = ProfessionnelSerializer(prof_populaire, many=True)
    # recommade
    not_following_professionals = (
        Professionnel.objects.exclude(user__id__in=following_ids)
        .filter(user__categories__in=user_categories)
        .order_by("createdAt")
        .distinct()[:15]
    )
    serializer_recomand = ProfessionnelSerializer(
        not_following_professionals, many=True
    )

    data = {
        "allProf": serializer_all.data,
        "profFollow": serializer_all_follow.data,
        "profpopulaire": serializer_populaire.data,
        "profRecommande": serializer_recomand.data,
    }

    # return int front
    return Response(data, status=status.HTTP_200_OK)


# unfollowing all
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_unfollower_user_all(request):
    # verify if follower and user ids are provided
    follower_id = request.data.get("follower")
    user_id = request.data.get("user")

    if follower_id is None or user_id is None:
        return Response(
            {"error": "Your request missing some thing"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # select user and follower
        user = ProfilUser.objects.get(id=user_id)
        follower = ProfilUser.objects.get(id=follower_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    # filtre and delete
    user_follower = Follower.objects.filter(user=user, follower=follower)
    user_follower.delete()

    # get new follower user
    try:
        # select user and follower
        new_follower = ProfilUser.objects.get(id=follower_id)
    except ProfilUser.DoesNotExist:
        return Response(
            {"message": "user not existe"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Get the professionals followed by the user
    following_users = new_follower.followers.all()
    # Get the categories of the authenticated user
    user_categories = new_follower.categories.all()
    # Get the IDs of the professionals that the user is following
    following_ids = new_follower.followers.all().values_list("id", flat=True)

    # Get the professionals that correspond to those users
    following_professionals = Professionnel.objects.filter(user__in=following_users)
    serializer_all_follow = ProfessionnelSerializer(following_professionals, many=True)

    # Get the latest 10 professionals
    prof_all = Professionnel.objects.all().order_by("-id")[:10]
    serializer_all = ProfessionnelSerializer(prof_all, many=True)

    # prof populaire
    prof_populaire = Professionnel.objects.annotate(
        follower_count=Count("user__followers")
    ).order_by("-follower_count")[:10]
    serializer_populaire = ProfessionnelSerializer(prof_populaire, many=True)

    # recommade
    not_following_professionals = (
        Professionnel.objects.exclude(user__id__in=following_ids)
        .filter(user__categories__in=user_categories)
        .order_by("createdAt")
        .distinct()[:15]
    )
    serializer_recomand = ProfessionnelSerializer(
        not_following_professionals, many=True
    )

    data = {
        "allProf": serializer_all.data,
        "profFollow": serializer_all_follow.data,
        "profpopulaire": serializer_populaire.data,
        "profRecommande": serializer_recomand.data,
    }

    # return int front
    return Response(data, status=status.HTTP_200_OK)


# =================FIN FOLLOWERS==============================


# upload image of user
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_user_image(request):
    if request.data.get("file") is None or request.data.get("user_id") is None:
        return Response(
            {"error": "Your request missing something"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    # get user from id
    try:
        user = ProfilUser.objects.get(id=request.data.get("user_id"))
    except ProfilUser.DoesNotExist:
        return Response(
            {"error": "user doest not exist"},
            status=status.HTTP_204_NO_CONTENT
        )

    # get file from request
    file = compres_image(request.data["file"])
    # image var
    if user.image_url == "profils/user.png":
        user.image_url = file
        user.save()
        serializer = ProfilUserSerializer(user, many=False)
        return Response(serializer.data)
    else:
        # suprime le fichier
        # filepath = os.path.join(str(settings.MEDIA_ROOT), str(user.image_url))
        filepath = os.path.join(settings.MEDIA_ROOT, str(user.image_url))
        os.remove(filepath)
        # modifie le fichier
        user.image_url = file
        user.save()
        serializer = ProfilUserSerializer(user, many=False)
        return Response(serializer.data)


# ================Send otp======================
class SendOtp(generics.CreateAPIView):
    serializer_class = SendOtpSerializer

    def post(self, request):
        # serializer = self.serializer_class(data=request.data)

        email = request.data.get("email")

        if email:
            try:
                user = ProfilUser.objects.get(email=email)

                otp = random.randint(100000, 900000)

                expires = int(time.time()) + (4 * 60)
                expires_datetime = datetime.datetime.fromtimestamp(expires)

                hashed_otp = bcrypt.hash(str(otp))

                email_body = (
                    "Bonjour ,\nNous venons vous envoyé un code confirmation pour réinitialiser votre mot de passe.\nVeulliez recopier ce code "
                    + str(otp)
                )
                content = {
                    "email_body": email_body,
                    "to_email": user.email,
                    "email_subject": "Réinitialisation de mot de passe",
                }

                Util.send_email(content)

                return Response(
                    {
                        "Success": "Email bien envoyé",
                        "email": f"{email}",
                        "otp": f"{otp}",
                        "otp_hashed": f"{hashed_otp}",
                        "expiration": f"{expires_datetime}",
                    },
                    status=status.HTTP_200_OK,
                )

            except ProfilUser.DoesNotExist:
                return Response(
                    {"Error": "Aucun utilisateur trouvé avec cet e-mail"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(
            {"Error": "L'e-mail est obligatoire"}, status=status.HTTP_400_BAD_REQUEST
        )


# ===============Otp verification================================
class VerifyOTP(generics.CreateAPIView):
    serializer_class = VerifyOTPSerializer

    def post(self, request):
        # serializer = self.serializer_class(data=request.data)
        email = request.data.get("email")
        otp = request.data.get("otp")
        otp_hashed = request.data.get("otp_hashed")
        expiration = request.data.get("expiration")

        if email and otp and otp_hashed:
            try:
                # user = ProfilUser.objects.get(email=email)

                if otp:
                    current_time = datetime.datetime.now()
                    if bcrypt.verify(
                        otp, otp_hashed
                    ) and current_time <= datetime.datetime.strptime(
                        expiration, "%Y-%m-%d %H:%M:%S"
                    ):
                        return Response(
                            {
                                "Success": "OTP vérifié avec succès",
                                "email": f"{email}",
                                "otp": f"{otp}",
                                "otp_hashed": f"{otp_hashed}",
                                "expiration": f"{expiration}",
                            },
                            status=status.HTTP_200_OK,
                        )
                    else:
                        return Response(
                            {"Error": "OTP invalide ou expiré"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                else:
                    return Response(
                        {"Error": "Aucun OTP trouvé pour cet utilisateur"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            except ProfilUser.DoesNotExist:
                return Response(
                    {"Error": "Aucun utilisateur trouvé avec cet e-mail"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(
            {"Error": "L'e-mail et l'OTP sont manquants dans la requête"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# =======================Add the new password====================
class SetNewPassword(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        # serializer = self.serializer_class(data=request.data)
        email = request.data.get("email")
        otp = request.data.get("otp")
        otp_hashed = request.data.get("otp_hashed")
        expiration = request.data.get("expiration")
        new_password = request.data.get("new_password")

        if email is None or new_password is None:
            return Response(
                {"Error": "Missing fields"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if otp and otp_hashed:
            try:
                user = ProfilUser.objects.get(email=email)
                current_time = datetime.datetime.now()
                # vérifier si le otp n'est pas expiré
                if bcrypt.verify(
                    otp, otp_hashed
                ) and current_time <= datetime.datetime.strptime(
                    expiration, "%Y-%m-%d %H:%M:%S"
                ):
                    # la réinitialisation est possible
                    user.set_password(new_password)
                    user.save()
                    return Response(
                        {
                            "Success": "Votre mot de passe est réinitialiser avec success"
                        },
                        status=status.HTTP_200_OK,
                    )
                else:
                    # L'OTP est invalide ou a expiré et la réinitialisation est impossible
                    return Response(
                        {
                            "Error": "Le code est invalide ou expiré, s' il vous plaît réessayer"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except ProfilUser.DoesNotExist:
                return Response(
                    {"Error": "Vérifier si vous avez entré la bonne adresse email"},
                    status=status.HTTP_404_NOT_FOUND,
                )
