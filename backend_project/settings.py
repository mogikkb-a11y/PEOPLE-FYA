from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("SECRET_KEY", default="'django-insecure-6)_5f^m-e5ju=k!!qqn!7=ir%#d8@#jk*3&f&7q#(r5-_qvf^^'")
DEBUG = env.bool("DEBUG", default=True)
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "core",  # tu app
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "frontend" / "build"],  # apunta al build
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

STATICFILES_DIRS = [BASE_DIR / "frontend" / "build" / "static"]

WSGI_APPLICATION = "backend_project.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# URL base para servir estáticos
STATIC_URL = "/static/"

# Carpeta donde collectstatic copiará todo
STATIC_ROOT = BASE_DIR / "staticfiles"

# Carpeta donde están los estáticos de React
STATICFILES_DIRS = [
    BASE_DIR / "frontend" / "build" / "static"
]

STATIC_URL = '/static/'
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "cuentasbarreto28@gmail.com"
EMAIL_HOST_PASSWORD = "cluw pkon icqw sebn"  
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER