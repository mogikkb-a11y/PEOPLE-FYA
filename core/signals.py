from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Credito

@receiver(post_save, sender=Credito)
def enviar_correo_credito(sender, instance, created, **kwargs):
    if created:
        asunto = "Nuevo crédito registrado"
        mensaje = (
            f"Cliente: {instance.nombre_cliente}\n"
            f"Valor: {instance.valor}\n"
            f"Comercial: {instance.comercial}\n"
            f"Fecha: {instance.fecha_registro}"
        )
        send_mail(
            asunto,
            mensaje,
            "cuentasbarreto28",  # remitente
            ["fyasocialcapital@gmail.com"],  # destinatario
            fail_silently=False,
        )
