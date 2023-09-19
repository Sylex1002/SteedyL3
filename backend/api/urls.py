"""Module providingFunction printing python version."""
from django.urls import path
from . import views

urlpatterns = [
    # get all category
    path("category/", views.get_all_category),
    # add category
    path("category/post", views.post_category),
    # modifie category
    path("category/put/<int:id>/", views.put_category),
    # delete category
    path("category/del/<int:id>/", views.delete_category),
    # get one category
    path("category/<int:id>/", views.get_category),
]
