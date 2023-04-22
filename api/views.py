from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserRegisterSerializer, UserSerializer, PerfilSerializer
from .models import User
from rest_framework import status
from rest_framework.permissions import AllowAny
        
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
    def get(self, request, format=None):
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
class UserPersonalView(APIView):   
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

