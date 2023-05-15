from django.urls import path
from api import views


urlpatterns = [
    path('api_register/', views.UserRegisterView.as_view()),
    path('api_logout/', views.LogoutView.as_view()),
    path('api_user_personal/', views.UserPersonalView.as_view()),
    path('api_user_perfil/<int:pk>/', views.UserPerfilView.as_view()),
    path('api_provincias/', views.ProvinciasView.as_view()),

    path('api_partida/', views.PartidaView.as_view()),
    path('api_campanya/', views.CampanyaView.as_view()),
    
    path('api_partida/<int:pk>/', views.PartidaDetailView.as_view()),
    path('api_mis_partidas/', views.MisPartidasView.as_view()),
    path('api_campanya/<int:pk>/', views.CampanyaDetailView.as_view()),
    path('api_mis_campanyas/', views.MisCampanyasView.as_view()),

    path('api_solicitudes_partidas/', views.SolicitudesPartidasView.as_view()),
    path('api_editar_solicitud_partida/<int:pk>/', views.SolicitudPartidaDetailView.as_view()),
    path('api_solicitudes_partidas_enviadas/', views.MisSolicitudesPartidasEnviadasView.as_view()),
    path('api_solicitudes_partidas_recibidas/', views.MisSolicitudesPartidasRecibidasView.as_view()),
    
    path('api_solicitudes_campanyas/', views.SolicitudesCampanyasView.as_view()),
    path('api_editar_solicitud_campanya/<int:pk>/', views.SolicitudCampanyaDetailView.as_view()),
    path('api_solicitudes_campanyas_enviadas/', views.MisSolicitudesCampanyasEnviadasView.as_view()),
    path('api_solicitudes_campanyas_recibidas/', views.MisSolicitudesCampanyasRecibidasView.as_view()),
]
