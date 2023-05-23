from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Perfil, Provincia,Partida, Campanya, PartidaJugador, CampanyaJugador, SolicitudesCampanyas, SolicitudesPartidas

class PerfilInline(admin.StackedInline):
    model = Perfil
    can_delete = False
    verbose_name_plural = 'perfil'

class UserAdmin(UserAdmin):
    inlines = (PerfilInline, )

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Perfil)
admin.site.register(Provincia)
admin.site.register(Partida)
admin.site.register(PartidaJugador) 
admin.site.register(SolicitudesPartidas) 
admin.site.register(Campanya)
admin.site.register(CampanyaJugador) 
admin.site.register(SolicitudesCampanyas)