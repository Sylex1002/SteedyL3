from django.urls import path
from . import views

urlpatterns = [
    path("students/", views.get_all_students),
    path("students/user/<str:id>/", views.get_students_by_user),
]
