from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import (
    UserRegisterSerializer, 
    UserSerializer,
    PerfilSerializer, 
    PartidaSerializer, 
    CampanyaSerializer, 
    PartidaJugadorSerializer, 
    CampanyaJugadorSerializer)
from .models import User, Partida, Campanya
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
        
class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        #Verificar si el usuario ya existe en la base de datos
        if User.objects.filter(username=request.data.get('username')).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        #Crear el usuario
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response({'message': 'OK'}, status=status.HTTP_200_OK)
        return Response({'message': 'ERROR'}, status=status.HTTP_401_UNAUTHORIZED)
    
class UserPersonalView(APIView):   
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class PartidaView(APIView):   
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        partidas = Partida.objects.all()
        if partidas.exists():
            serializer = PartidaSerializer(partidas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'No hay partidas que mostrar'}, status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        serializer = PartidaSerializer(data=request.data)
        if serializer.is_valid():
            partida = serializer.save()
            partida_jugador = PartidaJugadorSerializer(data={'partida': partida.id, 'jugador': request.user.id})
            if partida_jugador.is_valid():
                partida_jugador.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PartidaDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        partida = Partida.objects.get(pk=pk)   
        if partida is None:
            return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)     
        serializer = PartidaSerializer(partida)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        partida = Partida.objects.get(pk=pk)
        if partida is None:
            return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if partida.master.id != request.user.id:
            return Response({'error': 'No eres el master de esta partida'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = PartidaSerializer(partida, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        partida = Partida.objects.get(pk=pk)
        if partida is None:
            return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if partida.master.id != request.user.id:
            return Response({'error': 'No eres el master de esta partida'}, status=status.HTTP_401_UNAUTHORIZED)
        partida.delete()
        return Response({'message': 'Partida eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)

class CampanyaView(APIView):   
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        campanyas = Campanya.objects.all()
        if campanyas.exists():
            serializer = CampanyaSerializer(campanyas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'No hay campañas que mostrar'}, status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        serializer = CampanyaSerializer(data=request.data)
        if serializer.is_valid():
            partida = serializer.save()
            campanya_jugador = CampanyaJugadorSerializer(data={'campanya': partida.id, 'jugador': request.user.id})
            if campanya_jugador.is_valid():
                campanya_jugador.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CampanyaDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            campanya = Campanya.objects.get(pk=pk)
        except Campanya.DoesNotExist:
            return Response({'error': 'Campanya no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CampanyaSerializer(campanya)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        try:
            campanya = Campanya.objects.get(pk=pk)
        except Campanya.DoesNotExist:
            return Response({'error': 'Campanya no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if campanya.master.id != request.user.id:
            return Response({'error': 'No eres el master de esta campanya'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = CampanyaSerializer(campanya, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            campanya = Campanya.objects.get(pk=pk)
        except Campanya.DoesNotExist:
            return Response({'error': 'Campanya no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if campanya.master.id != request.user.id:
            return Response({'error': 'No eres el master de esta campanya'}, status=status.HTTP_401_UNAUTHORIZED)
        campanya.delete()
        return Response({'message': 'Campanya eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)