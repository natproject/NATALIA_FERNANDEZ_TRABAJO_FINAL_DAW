from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=500, blank=True)
    fecha_nacimiento = models.DateField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)