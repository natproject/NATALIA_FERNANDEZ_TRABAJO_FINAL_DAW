from django.urls import path
from api import views


urlpatterns = [
    path('api_register/', views.UserRegisterView.as_view()),
    path('api_logout/', views.LogoutView.as_view()),
    path('api_partida/', views.PartidaView.as_view()),
    path('api_campanya/', views.CampanyaView.as_view()),
    path('api_partida/<int:pk>/', views.PartidaDetailView.as_view()),
    path('api_campanya/<int:pk>/', views.CampanyaDetailView.as_view()),

]
