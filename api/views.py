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
    CampanyaJugadorSerializer,
    SolicitudesCampanyasSerializer,
    SolicitudesPartidasSerializer,
    SolicitudesCampanyasCrearSerializer,
    SolicitudesPartidasCrearSerializer,
    ProvinciasSerializer,
    )
from .models import User, Partida, Campanya, SolicitudesPartidas, SolicitudesCampanyas, PartidaJugador, CampanyaJugador, Provincia
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

class UserPerfilView(APIView):   
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        if user is None:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)     
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        print(serializer)
        if serializer.is_valid():
            master_id = int(request.data.get('master'))
            user = User.objects.get(id=master_id)
            serializer.validated_data['master'] = user
            partida = serializer.save()
            partida_jugador = PartidaJugadorSerializer(data={'partida': partida.id, 'jugador': request.user.id})
            print(partida_jugador)
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
        return Response({'message': 'No hay partidas que mostrar'}, status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        serializer = CampanyaSerializer(data=request.data)
        if serializer.is_valid():
            master_id = int(request.data.get('master'))
            user = User.objects.get(id=master_id)
            serializer.validated_data['master'] = user
            campanya = serializer.save()
            campanya_jugador = CampanyaJugadorSerializer(data={'campanya': campanya.id, 'jugador': request.user.id})
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
        campanya = Campanya.objects.get(pk=pk)
        if campanya is None:
            return Response({'error': 'Campanya no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if campanya.master.id != request.user.id:
            return Response({'error': 'No eres el master de esta partida'}, status=status.HTTP_401_UNAUTHORIZED)
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
    
class SolicitudesPartidasView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        jugador = request.user
        partida_id = request.data.get('partida')
        solicitud_existente = SolicitudesPartidas.objects.filter(jugador_solicitante=jugador, partida_id=partida_id).exists()
        if solicitud_existente:
            return Response({'message': 'Tu solicitud ya ha sido enviada'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SolicitudesPartidasCrearSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class SolicitudPartidaDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        solicitud = SolicitudesPartidas.objects.get(pk=pk)
        if solicitud is None:
            return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        partida_id = request.data.get('partida')
        partida = Partida.objects.get(id=partida_id)
        if partida is None:
            return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if partida.master != request.user:
            return Response({'error': 'No tienes permiso para aceptar esta solicitud'}, status=status.HTTP_403_FORBIDDEN)
        if solicitud.aceptada:
            return Response({'error': 'La solicitud ya ha sido aceptada'}, status=status.HTTP_400_BAD_REQUEST)
        jugador_solicitante = solicitud.jugador_solicitante
        if jugador_solicitante not in partida.jugadores.all():
            partida.jugadores.add(jugador_solicitante)
            partida.num_usuarios += 1
            solicitud.aceptada = True
            solicitud.save()
            partida.save()
            return Response({'message': 'Solicitud aceptada.'}, status=status.HTTP_200_OK)
        return Response({'message': 'El jugador ya forma parte de la partida.'}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            solicitud = SolicitudesPartidas.objects.get(pk=pk)
        except SolicitudesPartidas.DoesNotExist:
            return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if solicitud.jugador_solicitante.id != request.user.id:
            return Response({'error': 'No eres el usuario de esta solicitud'}, status=status.HTTP_401_UNAUTHORIZED)
        solicitud.delete()
        return Response({'message': 'Solicitud eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)    
    
class MisSolicitudesPartidasEnviadasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        solicitudes = SolicitudesPartidas.objects.filter(jugador_solicitante=user)
        if not solicitudes.exists():
            return Response({'error': 'No has enviado ninguna solicitud'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SolicitudesPartidasSerializer(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
           
class MisSolicitudesPartidasRecibidasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        mis_partidas = Partida.objects.filter(master=user)
        if not mis_partidas.exists():
            return Response({'error': 'No tienes partidas creadas'}, status=status.HTTP_404_NOT_FOUND)
        solicitudes = SolicitudesPartidas.objects.filter(partida__in=mis_partidas, aceptada=False)
        if not solicitudes.exists():
            return Response({'error': 'No tienes solicitudes en tus partidas'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SolicitudesPartidasSerializer(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SolicitudesCampanyasView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        jugador = request.user
        campanya_id = request.data.get('campanya')
        campanya = Campanya.objects.get(pk=campanya_id)
        solicitud_existente = SolicitudesCampanyas.objects.filter(jugador_solicitante=jugador, campanya_id=campanya_id).exists()
        if solicitud_existente:
            return Response({'message': 'Tu solicitud ya ha sido enviada'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SolicitudesCampanyasCrearSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SolicitudCampanyaDetailView(APIView):
    permission_classes = [IsAuthenticated]
        
    def put(self, request, pk):
        solicitud = SolicitudesCampanyas.objects.get(pk=pk)
        if solicitud is None:
            return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        campanya_id = request.data.get('campanya')
        campanya = Campanya.objects.get(id=campanya_id)
        if campanya is None:
            return Response({'error': 'Campanya no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if campanya.master != request.user:
            return Response({'error': 'No tienes permiso para aceptar esta solicitud'}, status=status.HTTP_403_FORBIDDEN)
        if solicitud.aceptada:
            return Response({'error': 'La solicitud ya ha sido aceptada'}, status=status.HTTP_400_BAD_REQUEST)
        jugador_solicitante = solicitud.jugador_solicitante
        if jugador_solicitante not in campanya.jugadores.all():
            campanya.jugadores.add(jugador_solicitante)
            campanya.num_usuarios += 1
            solicitud.aceptada = True
            solicitud.save()
            campanya.save()
            return Response({'message': 'Solicitud aceptada.'}, status=status.HTTP_200_OK)
        return Response({'message': 'El jugador ya forma parte de la campanya.'}, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, pk):
        try:
            solicitud = SolicitudesCampanyas.objects.get(pk=pk)
        except SolicitudesCampanyas.DoesNotExist:
            return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        if solicitud.jugador_solicitante.id != request.user.id:
            return Response({'error': 'No eres el usuario de esta solicitud'}, status=status.HTTP_401_UNAUTHORIZED)
        solicitud.delete()
        return Response({'message': 'Solicitud eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)    

class MisSolicitudesCampanyasEnviadasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        solicitudes = SolicitudesCampanyas.objects.filter(jugador_solicitante=user)
        if not solicitudes.exists():
            return Response({'error': 'No has enviado ninguna solicitud'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SolicitudesCampanyasSerializer(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MisSolicitudesCampanyasRecibidasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        mis_campanyas = Campanya.objects.filter(master=user)
        if not mis_campanyas.exists():
            return Response({'error': 'No tienes campañas creadas'}, status=status.HTTP_404_NOT_FOUND)
        solicitudes = SolicitudesCampanyas.objects.filter(campanya__in=mis_campanyas, aceptada=False)
        if not solicitudes.exists():
            return Response({'error': 'No tienes solicitudes en tus campañas'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SolicitudesCampanyasSerializer(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MisPartidasView(APIView):   
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        partidas = Partida.objects.all()
        if partidas.exists():
            mis_partidas = Partida.objects.filter(jugadores=request.user)
            serializer = PartidaSerializer(mis_partidas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)   
        return Response({'message': 'No hay partidas que mostrar'}, status=status.HTTP_204_NO_CONTENT)

class MisCampanyasView(APIView):   
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        campanyas = Campanya.objects.all()
        if campanyas.exists():
            mis_campanyas = Campanya.objects.filter(jugadores=request.user)
            serializer = CampanyaSerializer(mis_campanyas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)   
        return Response({'message': 'No hay campanyas que mostrar'}, status=status.HTTP_204_NO_CONTENT)
    
class ProvinciasView(APIView):   
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        provincias = Provincia.objects.all()
        if provincias.exists():
            serializer = ProvinciasSerializer(provincias, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)   
        return Response({'message': 'No hay provincias que mostrar'}, status=status.HTTP_204_NO_CONTENT)