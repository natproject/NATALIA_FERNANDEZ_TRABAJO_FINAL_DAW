from rest_framework import serializers
from datetime import datetime
from django.contrib.auth.models import User
from .models import Perfil, Provincia,Partida, Campanya, PartidaJugador, CampanyaJugador, SolicitudesCampanyas, SolicitudesPartidas

class PerfilSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = Perfil
        fields = ('bio', 'fecha_nacimiento', 'image', 'proximos_juegos', 'juegos_terminados')

class UserSerializer(serializers.ModelSerializer):
    perfil = PerfilSerializer()
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'perfil')

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        # Crear un nuevo usuario sin permisos de superusuario
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_staff=False,
            is_superuser=False
        )
        return user

class InfoMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)

class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = ('nombre',)
    
class PartidaJugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartidaJugador
        fields = ('id', 'partida', 'jugador')

class CampanyaJugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampanyaJugador
        fields = ('id', 'campanya', 'jugador')
     
class CampanyaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=False)
    hora_inicio = serializers.TimeField()
    hora_fin = serializers.TimeField()
    jugadores = InfoMasterSerializer(read_only=True, many=True)
    provincia = ProvinciaSerializer(read_only=True)
    master = InfoMasterSerializer(read_only=True)
    fecha = serializers.DateField(required=False)
    
    class Meta:
        model = Campanya
        fields = '__all__'
    
    def create(self, validated_data):
        hora_inicio = datetime.combine(datetime.today(), validated_data['hora_inicio'])
        hora_fin = datetime.combine(datetime.today(), validated_data['hora_fin'])
        horas = (hora_fin - hora_inicio).total_seconds() / 3600.0
        validated_data['horas'] = horas
        campanya = Campanya.objects.create(**validated_data)
        return campanya

class PartidaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=False)
    hora_inicio = serializers.TimeField()
    hora_fin = serializers.TimeField()
    jugadores = InfoMasterSerializer(read_only=True, many=True)
    provincia = ProvinciaSerializer(read_only=True)
    master = InfoMasterSerializer(read_only=True)
    fecha = serializers.DateField(required=False)
    class Meta:
        model = Partida
        fields = '__all__'
        
    def create(self, validated_data):
        hora_inicio = datetime.combine(datetime.today(), validated_data['hora_inicio'])
        hora_fin = datetime.combine(datetime.today(), validated_data['hora_fin'])
        horas = (hora_fin - hora_inicio).total_seconds() / 3600.0
        validated_data['horas'] = horas
        partida = Partida.objects.create(**validated_data)
        return partida

    
class PartidaSolicitadaSerializer(serializers.ModelSerializer):
    master = InfoMasterSerializer(read_only=True)

    class Meta:
        model = Partida
        fields = ('id', 'nombre_juego', 'master', 'nivel_jugador', 'modalidad', 'fecha')

class SolicitudesPartidasSerializer(serializers.ModelSerializer):
    partida = PartidaSolicitadaSerializer(read_only=True)

    class Meta:
        model = SolicitudesPartidas
        fields = ('id', 'fecha_creacion', 'aceptada', 'jugador_solicitante', 'partida')
        
class CampanyaSolicitadaSerializer(serializers.ModelSerializer):
    master = InfoMasterSerializer(read_only=True)

    class Meta:
        model = Campanya
        fields = ('id', 'juego_rol', 'nombre_campanya', 'master', 'num_partida', 'nivel_jugador', 'modalidad', 'fecha')

class SolicitudesCampanyasSerializer(serializers.ModelSerializer):
    campanya = CampanyaSolicitadaSerializer(read_only=True)

    class Meta:
        model = SolicitudesCampanyas
        fields = ('id', 'fecha_creacion', 'aceptada', 'jugador_solicitante', 'campanya')

class SolicitudesCampanyasCrearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudesCampanyas
        fields = ('id', 'fecha_creacion', 'aceptada', 'jugador_solicitante', 'campanya')

class SolicitudesPartidasCrearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudesPartidas
        fields = ('id', 'fecha_creacion', 'aceptada', 'jugador_solicitante', 'partida')

class ProvinciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = '__all__'

class SolicitudesPartidasRecibidasSerializer(serializers.ModelSerializer):
    partida = PartidaSolicitadaSerializer(read_only=True)
    jugador_solicitante = UserSerializer(read_only=True)

    class Meta:
        model = SolicitudesPartidas
        fields = ('id', 'fecha_creacion', 'aceptada', 'jugador_solicitante', 'partida')

class SolicitudesCampanyasRecibidasSerializer(serializers.ModelSerializer):
    campanya = CampanyaSolicitadaSerializer(read_only=True)
    jugador_solicitante = UserSerializer(read_only=True)

    class Meta:
        model = SolicitudesCampanyas
        fields = ('id', 'fecha_creacion', 'aceptada', 'jugador_solicitante', 'campanya')
      