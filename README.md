# PEOPLE-FYA

Plataforma de gestión financiera desarrollada con **Django REST Framework** (backend) y **React** (frontend).  
Permite registrar y consultar créditos de clientes de manera ágil y segura.

---

## 🚀 Requisitos previos

- Python 3.12+
- Node.js 18+
- Git

*(No necesitas instalar PostgreSQL: el proyecto usa SQLite por defecto.)*

---

## 📦 Instalación

### 1. Clonar el repositorio (asegurese de tener internet)
(en terminal)

git clone https://github.com/mogikkb-a11y/PEOPLE-FYA.git

cd PEOPLE-FYA


### 2. Crear entorno virtual
python -m venv venv

source venv/bin/activate   # Linux/Mac

venv\Scripts\activate      # Windows


### 3. Instalar dependencias
pip install -r requirements.txt


### 5. Instalar dependencias frontend
cd frontend

npm install

npm run build

Esto genera la carpeta frontend/build/ que Django usará.


### 6. Migraciones y superusuario 
Lo primero a hacer es cerrar la terminal y volver a utilizar cd PEOPLE-FYA (porque estamos metidos en frontend, ya nos saldremos de allí)

python manage.py makemigrations 

python manage.py migrate

python manage.py createsuperuser (si quiere administrar la database)


### 7. Ejecución en Local
python manage.py collectstatic (escriba yes)

python manage.py runserver


