# core/urls.py
from rest_framework import routers
from django.urls import path, include
from .views import CreditoViewSet

router = routers.DefaultRouter()
router.register(r'creditos', CreditoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]