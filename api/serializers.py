from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Perfil, Partida, Campanya, PartidaJugador, CampanyaJugador

class PerfilSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = Perfil
        fields = ('bio', 'fecha_nacimiento', 'image')

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

    class Meta:
        model = Partida
        fields = '__all__'
        
class PartidaJugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartidaJugador
        fields = ('id', 'partida', 'jugador')

class CampanyaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Campanya
        fields = '__all__'

class CampanyaJugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampanyaJugador
        fields = ('id', 'campanya', 'jugador')
