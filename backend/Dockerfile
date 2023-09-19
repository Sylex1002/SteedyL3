
# Utilisez une image de base qui inclut Python, par exemple python:3.8
FROM python:3.8

# Installe FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers requis dans le conteneur
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copie le reste des fichiers dans le conteneur
COPY . /app/

# Expose le port sur lequel Django écoute (si nécessaire)
EXPOSE 8000

# Commande pour démarrer le serveur Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


