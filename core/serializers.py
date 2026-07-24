# core/serializers.py
from rest_framework import serializers

from rest_framework import serializers
from .models import Credito

class CreditoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credito
        fields = '__all__'

def validate_valor(self, value):
    if value <= 0:
        raise serializers.ValidationError("El valor del crédito debe ser positivo.")
    return value

def validate_tasa_interes(self, value):
    if value < 0 or value > 100:
        raise serializers.ValidationError("La tasa de interés debe estar entre 0 y 100%.")
    return value

def validate_plazo_meses(self, value):
    if value <= 0:
        raise serializers.ValidationError("El plazo debe ser mayor a 0 meses.")
    return value