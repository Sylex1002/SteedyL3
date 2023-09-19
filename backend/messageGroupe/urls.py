from django.urls import path
from . import views

urlpatterns = [
    path("create-groupe/", views.create_groupe, name="create_groupe"),
    # path('get-all-groupe/',views.get_all_groupe,name="get_all_groupe"),
    path("get-one-groupe/<str:id>/", views.get_groupe, name="get_one_groupe"),
    # path('get-groupe-by-following/<str:user_id>/',views.get_groupes_by_following,name='get_groupe_by_userFollowing'),
    path("update-groupe/<str:groupe_id>/", views.update_groupe),
    path(
        "delete-groupe/<str:groupe_id>/",
        views.delete_groupe,
    ),
    path(
        "groupe-createdby-user/<str:user_id>/",
        views.get_groupes_by_user,
        name="get_groupes_by_user",
    ),
    path(
        "add-user-to-groupe/",
        views.add_user_to_groupe,
    ),
    path(
        "get-group-NOT-container-user/<str:user_id>/",
        views.get_group_NOT_containing_user,
        name="get_group_NOT_containing_user",
    ),
    path(
        "get-group-containing-user/<str:user_id>/",
        views.get_group_containing_user,
        name="get_group_containing_user",
    ),
    path(
        "get-group-enAttent/<str:user_id>/",
        views.get_groups_enAttent_acceptation,
        name="get_groups_enAttent_acceptation",
    ),
    path(
        "delete-user-from-groupe/",
        views.remove_user_from_groupe,
        name="remove_user_from_groupe",
    ),
    path(
        "get_conversationsGroupe/<str:to_groupe_id>/",
        views.get_conversationsGroupe,
        name="get_conversationsGroupe",
    ),
    path(
        "join/group/",
        views.post_joindre_group,
        name="post_joindre_group",
    ),
    path(
        "delete-group-waiting/<str:group_id>/",
        views.delete_group_waiting,
        name="delete_group_waiting",
    ),
    path(
        "add-group-views",
        views.push_user_view_ingroup,
    ),
]
