from django.urls import path
from api import views


urlpatterns = [
    path('api_register/', views.UserRegisterView.as_view()),
    path('api_logout/', views.LogoutView.as_view()),
    path('api_user_personal/', views.UserPersonalView.as_view()),
]
