from django.urls import path
from . import views

urlpatterns = [
    # api for image
    path("highlight_img/", views.post_highlight_img),
    # post video
    path("highlight_video/", views.post_highlight_video),
    # get all highlight id of professionnel
    path("highlight_get/<str:id>/", views.get_highlight),
    # delete highlight id of highlight
    path("highlight_del/<str:id>/", views.del_highlight),
    # get all highlight
    path("highlight/", views.get_all_highlight),
    # post view
    path("highlight/new/view/", views.post_view_highlight),
    # for user highlight
    path("highlight/<str:id>/", views.get_highlight_for_user),
    # highlight unde 24 h
    path("highlight/last/<str:id>/", views.get_highlight_24h),
    # highlight unde 24 h
    path("highlight/follow/<str:id>/", views.get_highlight_follow),
    # get_unviewed_highlights
    path("highlight/unviewed/<str:id>/", views.get_unviewed_highlights),
    # get_unviewed_popular_highlights
    path(
        "highlight/unviewedPopulaire/<str:id>/",
        views.get_unviewed_popular_highlights
    ),
    # post like
    path("highlight/new/like/", views.post_like_highlight),
    # highlight search
    path("highlight/search", views.search_highlight),
    # get one highlight
    path("highlight/one/<str:id>/", views.highlight),
]
