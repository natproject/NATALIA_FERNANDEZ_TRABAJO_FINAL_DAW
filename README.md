# NATALIA FERNÁNDEZ TRABAJO FINAL DAW
Repositorio del trabajo final de ciclo DAW. 
# CÓMO LANZAR LA APLICACIÓN EN LOCAL
## RUN DJANGO (8000)
- Clonar el repositorio
- Abrimos la terminal de nuestro editor de código 
- `cd .\env\Scripts\`
- `.\activate` (En Linux puedes usar `source env/bin/activate` directamente)
- `cd ../..` (Vamos a la carpeta del proyecto de django, donde este el archivo `manage.py`)
- `python3 manage.py runserver` 
##### Asi tendremos el servidor runeado → `http://127.0.0.1:8000/`
-  `http://127.0.0.1:8000/admin` → para ver el panel de administración
##### Endpoints
````
api_generate_token/
api_register/
api_logout/
api_user_personal/
api_user_perfil/<int:pk>/
api_provincias/
api_partida/
api_campanya/
api_partida/<int:pk>/
api_mis_partidas/
api_campanya/<int:pk>/
api_mis_campanyas/
api_solicitudes_partidas/
api_editar_solicitud_partida/<int:pk>/
api_solicitudes_partidas_enviadas/
api_solicitudes_partidas_recibidas/
api_solicitudes_campanyas/
api_editar_solicitud_campanya/<int:pk>/
api_solicitudes_campanyas_enviadas/
api_solicitudes_campanyas_recibidas/
api_eliminar_usuario_partida/<int:pk>/<int:jugador>/
api_eliminar_usuario_campanya/<int:pk>/<int:jugador>/
````
## RUN ANGULAR (4200)
- `ng serve` en la carpeta FRONTEND
