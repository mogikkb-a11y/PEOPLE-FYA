from django.shortcuts import render

# Create your views here.
# core/views.py
from rest_framework import viewsets
from .models import Credito
from .serializers import CreditoSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, filters
from .models import Credito
from .serializers import CreditoSerializer

class CreditoViewSet(viewsets.ModelViewSet):
    queryset = Credito.objects.all()
    serializer_class = CreditoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre_cliente', 'cedula', 'comercial']
    ordering_fields = ['fecha_registro', 'valor']
    ordering = ['fecha_registro']
    permission_classes = [AllowAny]
