from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=500, blank=True)
    fecha_nacimiento = models.DateField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)

class Provincia(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Partida(models.Model):
    MODALIDADES = (
        ('online', 'Online'),
        ('fisica', 'Fisica'),
    )
    NIVELES = (
        ('iniciado', 'Iniciado'),
        ('casual', 'Casual'),
        ('experto', 'Experto')
    )
    master = models.ForeignKey(User, on_delete=models.CASCADE)
    jugadores = models.ManyToManyField(User, through='PartidaJugador', related_name='partidas_jugadores')
    modalidad = models.CharField(max_length=15, choices=MODALIDADES)
    lugar = models.CharField(max_length=150)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    nombre_juego = models.CharField(max_length=150)
    nivel_jugador = models.CharField(max_length=15, choices=NIVELES)
    requisitos_jugador = models.CharField(max_length=1000, blank=True)
    observaciones = models.CharField(max_length=1000, blank=True)
    max_usuarios = models.PositiveIntegerField()
    num_usuarios = models.PositiveIntegerField(default=1)
    image = models.ImageField(upload_to='partida/', blank=True, null=True)
    provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE, blank=True, null=True)

        
class PartidaJugador(models.Model):
    NIVELES = (
        ('iniciado', 'Iniciado'),
        ('casual', 'Casual'),
        ('experto', 'Experto')
    )
    
    partida = models.ForeignKey(Partida, on_delete=models.CASCADE)
    jugador = models.ForeignKey(User, on_delete=models.CASCADE, related_name="partidas_jugadores_jugador")
    nivel = models.CharField(max_length=15, choices=NIVELES, blank=True)
    experiencia_previa = models.CharField(max_length=500, blank=True)
    observaciones = models.CharField(max_length=2000, blank=True)


class Campanya(models.Model):
    MODALIDADES = (
        ('online', 'Online'),
        ('fisica', 'Fisica'),
    )
    NIVELES = (
        ('iniciado', 'Iniciado'),
        ('casual', 'Casual'),
        ('experto', 'Experto')
    )
    master = models.ForeignKey(User, on_delete=models.CASCADE)
    jugadores = models.ManyToManyField(User, through='CampanyaJugador', related_name='partidas_campanyas') 
    modalidad = models.CharField(max_length=15, choices=MODALIDADES)
    lugar = models.CharField(max_length=150)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    juego_rol = models.CharField(max_length=150)
    nombre_campanya = models.CharField(max_length=150)
    num_partida = models.PositiveIntegerField(default=0, blank=True)
    nivel_jugador = models.CharField(max_length=15, choices=NIVELES)
    requisitos_jugador = models.CharField(max_length=1000, blank=True)
    observaciones = models.CharField(max_length=1000, blank=True)
    max_usuarios = models.PositiveIntegerField()
    num_usuarios = models.PositiveIntegerField(default=1)
    image = models.ImageField(upload_to='campanya/', blank=True, null=True)
    provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE, blank=True, null=True)
        
class CampanyaJugador(models.Model):
    NIVELES = (
        ('iniciado', 'Iniciado'),
        ('casual', 'Casual'),
        ('experto', 'Experto')
    )
    
    jugador = models.ForeignKey(User, on_delete=models.CASCADE, related_name="partidas_campanyas_jugador")
    campanya = models.ForeignKey(Campanya, on_delete=models.CASCADE)
    nivel = models.CharField(max_length=15, choices=NIVELES, blank=True)
    experiencia_previa = models.CharField(max_length=500, blank=True)
    nombre_personaje = models.CharField(max_length=50, blank=True)
    clase_personaje = models.CharField(max_length=100, blank=True)
    raza_personaje = models.CharField(max_length=100, blank=True)
    observaciones = models.CharField(max_length=2000, blank=True)