from django.db import models

# Create your models here.

from django.db import models

class Credito(models.Model):
    nombre_cliente = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20)
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    tasa_interes = models.DecimalField(max_digits=5, decimal_places=2)
    plazo_meses = models.IntegerField()
    comercial = models.CharField(max_length=100)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre_cliente} - {self.valor}"
