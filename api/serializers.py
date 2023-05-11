from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Perfil, Partida, Campanya, PartidaJugador, CampanyaJugador, SolicitudesCampanyas, SolicitudesPartidas

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

class PartidaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    hora_inicio = serializers.DateTimeField()
    hora_fin = serializers.DateTimeField()

    class Meta:
        model = Partida
        fields = '__all__'
    
    def create(self, validated_data):
        hora_inicio = validated_data['hora_inicio']
        hora_fin = validated_data['hora_fin']
        horas = (hora_fin - hora_inicio).total_seconds() / 3600.0
        validated_data['horas'] = horas
        partida = Partida.objects.create(**validated_data)
        return partida
    
        
class PartidaJugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartidaJugador
        fields = ('id', 'partida', 'jugador')

class CampanyaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    hora_inicio = serializers.DateTimeField()
    hora_fin = serializers.DateTimeField()

    class Meta:
        model = Campanya
        fields = '__all__'
    
    def create(self, validated_data):
        hora_inicio = validated_data['hora_inicio']
        hora_fin = validated_data['hora_fin']
        horas = (hora_fin - hora_inicio).total_seconds() / 3600.0
        validated_data['horas'] = horas
        campanya = Campanya.objects.create(**validated_data)
        return campanya

class CampanyaJugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampanyaJugador
        fields = ('id', 'campanya', 'jugador')
        
class SolicitudesPartidasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SolicitudesPartidas
        fields = "__all__"
        
class SolicitudesCampanyasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SolicitudesCampanyas
        fields = "__all__"