from django.urls import path
from . import views

urlpatterns = [
    # api for test
    path("professionnels/", views.professionel_detail),
    # post new pro
    path("pro-add/", views.pro_post),
    # get one prof
    path("professionnels/<str:id>/", views.Get_one_prof),
    # get prof when user un auth
    path("professionnels/unauth/<str:id>/", views.Get_one_prof_userUnAuth),
    # get proffesionel que je following
    path("professionnels/followed/<str:id>/", views.get_prof_followedByuser),
    # prof i'm not follow
    path(
        "professionnels/unfollowed/<str:id>/",
        views.get_prof_Not_followedByuser
    ),
    # un follow by category
    path(
        "professionnels/category/<str:id>/",
        views.not_following_professionals_byCategory,
    ),
    # get information prof bz user id
    path("professionnels/user/<str:id>/", views.get_prof_ByUserId),
    # populaire createur
    path("professionnels/populaire/all/", views.get_prof_Populaire),
    # search prof
    path("professionnels/search", views.search_professionnels),
    # post folloer of prof
    path("professionnels/follower", views.post_follower_prof),
    # get prof follow by prof
    path("professionnels/follower/<str:id>/", views.get_prof_followbyprof),
    # get prof similaire a un prof
    path(
        "professionnels/similar/<str:id>/",
        views.get_similar_category_professionals
    ),
    # get highlight of prof que je suivi
    path(
        "professionnels/highlight/<str:id>/",
        views.get_following_highlights
    ),
    #  get focus of prof que je suive
    path(
        "professionnels/focus/<str:id>/",
        views.get_following_focus
    ),
]
