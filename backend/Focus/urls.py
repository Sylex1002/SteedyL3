from django.urls import path
from . import views

urlpatterns = [
    # Path Focus
    path("create-focus/simple/", views.create_focus),
    path("create-focus/", views.create_focus_cloudinary),
    path("delete-focus/<str:id>/", views.delete_focus),
    path("list-all-focus/", views.list_focus),
    path("list-all-focus/<str:id>/", views.list_focus_pro),
    path("focus/get/<str:id>/", views.get_one_focus),
    path("focus/category/<str:id>/", views.get_one_focus_by_category),
    path("focus/gratuit/<str:id>/", views.get_focus_gratuit_ofProf),
    path("focus/search", views.search_focus),
    #
    path(
        "focus/allofprof/<str:category>/<str:id>/",
        views.get_all_focus_ofProf_by_category,
    ),
    path(
        "focus/followed_prof/<str:id>/",
        views.get_followed_professionals_focuses
    ),
    path("focus/today/<str:id>/", views.get_new_focus_today),
    path("focus/news/<str:id>/", views.get_focus_last_24H),
    path("focus/recomand/<str:id>/", views.get_focus_recommandation),

    # Path Like
    path("focus/post/likes/", views.likes_focus),
    path("focus/populair/all/", views.get_focus_populaire),
    path("focus/populair/<str:id>/", views.focus_populaire_category),

    # Path Comments
    path("create-comment/", views.create_comment),
    path("delete-comment/<str:comment_id>/", views.delete_comment),
    path("update-comment/<str:comment_id>/", views.update_comment),
    path("list-all-comment/<str:focus_id>/", views.list_all_comment),

    # Path Share
    path("create-share/", views.create_share),
    path("update-share/<str:share_id>/", views.update_share),
    path("delete-share/<str:share_id>/", views.delete_share),

    # Path Share
    path("focus/listen/", views.add_listen),
    path("focus/listened-users/<str:focus_id>/", views.get_listened_users),

    # Path serie
    path("serie/all/", views.get_all_serie),
    path("serie/create/", views.create_serie),
    path("serie/one/<str:serie_id>/", views.get_one_serie),
    path("serie/update/<str:serie_id>/", views.update_serie),
    path("serie/delete/<str:serie_id>/", views.delete_serie),
    path("serie/allbyuser/<str:user_id>/", views.get_all_serie_by_user_id),
    path("serie/allbyprof/<str:prof_id>/", views.get_all_serie_by_prof_id),
    path("serie/addFocus/", views.add_focus_in_serie),
    path("serie/focus/<str:focus_id>/", views.get_serie_with_id_of_focus),
]
