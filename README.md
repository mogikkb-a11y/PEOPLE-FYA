# PROYECTO_FYASC
## 1. Clonar el repositorio
git clone https://github.com/mogikkb-a11y/PROYECTO_FYASC.git
cd PROYECTO_FYASC

## 2. Crear entorno virtual e instalar dependencias 
python -m venv venv
venv\Scripts\activate   (si es en Windows)
source venv/bin/activate (si es en Linux/Mac)

pip install -r requirements.txt

## 3. Migrar la base de datos
python manage.py migrate

## 4. Ejecutar el servidor
python manage.py runserver

La aplicación estará disponible en:
Frontend (templates Django): http://127.0.0.1:8000/
API Créditos: http://127.0.0.1:8000/api/creditos/

## Notas importantes
El archivo db.sqlite3 no se sube al repositorio (está en .gitignore).
Cada persona que descargue el proyecto debe correr python manage.py migrate para generar su propia base local.
En producción (Render), el proyecto puede usar Postgres automáticamente si existe la variable DATABASE_URL.
