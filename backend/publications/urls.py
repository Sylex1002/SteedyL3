from django.urls import path
from . import views

urlpatterns = [
     path('api/pub-create/', views.create_publication, name='create_publication'),
     path('api/pub-update/<int:id>/', views.update_publication, name='update_publication'),
     path('api/pub-delete/<int:id>/', views.delete_publication, name='delete_publication'),
     path('api/pub-list-all/list/', views.list_publication, name='list_all_publication'),
     path('api/pub-list-all/<int:id>/', views.list_publication_user, name='list_all_pubID'),

]