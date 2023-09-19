from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import ProfilUser, Experiences, Follower, UserToken
from api.serializers import CategorySerializer
from django.contrib.auth import authenticate
from rest_framework import serializers


# from api.views import encrypt_value,decrypt_value
class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilUser
        fields = [
            "id",
            "categories",
            "username",
            "first_name",
            "last_name",
            "email",
            "matricule",
            "fonction",
            "domain",
            "address",
            "phone_number",
            "bio",
            "image_url",
            "is_regular_user",
            "createdAt",
            "updatedAt",
        ]


# user profil serializer
class ProfilUserSerializer(ModelSerializer):
    categories = CategorySerializer(many=True)
    following = FollowingSerializer(many=True)
    followers_count = serializers.SerializerMethodField()

    class Meta:
        model = ProfilUser
        exclude = ("password",)  # Exclure le champ 'password'

    def get_followers_count(self, obj):
        return obj.followers.count()


# eperience serielizer
class ExperiencesSerializer(ModelSerializer):
    user = ProfilUserSerializer()

    class Meta:
        model = Experiences
        fields = "__all__"


# follower serializer
class FollowerSerializer(ModelSerializer):
    follower = ProfilUserSerializer()
    user = ProfilUserSerializer()

    class Meta:
        model = Follower
        fields = ["user", "follower"]


# token customise
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        credentials = {"email": "", "password": attrs.get("password")}

        if "@" in attrs.get("email"):
            credentials["email"] = attrs.get("email")
        else:
            credentials["username"] = attrs.get("username")

        user = authenticate(**credentials)

        if user is None:
            raise serializers.ValidationError("Invalid credentials")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        if isinstance(user, ProfilUser):
            refresh = self.get_token(user)

            data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user_id": user.id,
                "email": user.email,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "matricule": user.matricule,
                "fonction": user.fonction,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
                "is_regular_user": user.is_regular_user,
            }
            return data

        else:
            raise serializers.ValidationError("User model not supported.")


# token serializer
class UserTokenSerializer(ModelSerializer):
    user = ProfilUserSerializer()

    class Meta:
        model = UserToken
        fields = "__all__"


# reset password
class SendOtpSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ["email"]


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    otp = serializers.CharField()
    otp_hashed = serializers.CharField()
    expiration = serializers.CharField()

    class Meta:
        fields = ["email", "otp", "otp_hashed", "expiration"]


class SetNewPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    otp = serializers.CharField()
    otp_hashed = serializers.CharField()
    expiration = serializers.CharField()
    new_password = serializers.CharField(min_length=6, write_only=True)

    class Meta:
        fields = ["email", "otp", "otp_hashed", "expiration", "new_password"]
