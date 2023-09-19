from django.urls import path
from . import views

urlpatterns = [
    # ==================Authentication======================
    # signup simple user Etudiant or professionnel
    path("signup", views.SignupView.as_view(), name="signup"),
    # signup super user ,this is for admin()
    path("superuser", views.SuperUser.as_view(), name="superuser"),
    # login for simple user it return token
    # with some informations(email ,password)
    path("login", views.CustomTokenObtainPairView.as_view()),
    # login avec socio user
    path("login-socio/", views.SpecialLoginView.as_view()),
    # refres token ,if you token if expire ,this api teke one params is refresh
    path(
        "refresh/",
        views.CustomTokenRefreshView.as_view(),
        name="token_refresh"
    ),
    # decode token ,this api take one value(token)
    path("decodeToken/", views.decode_token),
    path("newToken/", views.get_refresh_value_token),
    # ==================User informations======================
    # use by token
    path("user/info/", views.user_by_token, name="user_by_token"),
    # user information ,this api use for get,put
    path("users/<str:id>/", views.ProfilView.as_view()),
    # users list
    path("users/", views.users_lists, name="users_list"),
    # upload profil user
    path("user-image/", views.upload_user_image),
    path("user-matricule/<str:matricule>/", views.get_user_by_matricule),
    path("user-following/<str:id>/", views.get_user_following),
    # ==================User Experiences======================
    # post new experience
    path("experience/", views.post_experience, name="experience_post"),
    # get experience of user (id of uer)
    path(
        "experience-user/<str:id>",
        views.getUser_Experiences,
        name="experience_post"
    ),
    # get ,put,delete, experience form user by id experience
    path(
        "experience/<str:id>/",
        views.ExperiencesView.as_view(),
        name="experience_details",
    ),
    # ==================User Follower======================
    # follow user
    path("follower/", views.follow_user),
    # Unfollow api
    path("unFollowUser/", views.unfollow_user, name="unFollowUser"),
    # get all of my folloer
    path("followers/<str:id>/", views.follower_user, name="getFollower"),
    # list of following
    path("following/<str:id>/", views.following_user, name="getFollowing"),
    # post follower and return all profession ans prof follo
    path("follower/all/prof/", views.post_follower_user_all),
    # post un follower all
    path("unfollower/all/prof/", views.post_unfollower_user_all),
    # ==================User TOKEN AND USER VERIFY======================
    # verify email
    path("verify-email/", views.verify_email),
    # verify username
    path("verify-username/", views.verify_username),
    # ==================User Category======================
    path("user-category/<str:id>/", views.user_category),
    # ==================Forgot password======================
    # path('send-otp/',views.send_opt, name='verify-otp'),
    path("send-otp/", views.SendOtp.as_view(), name="send-otp"),
    path("verify-otp/", views.VerifyOTP.as_view(), name="verify-otp"),
    path(
        "reset-password/",
        views.SetNewPassword.as_view(),
        name="new-password"
    ),
]
