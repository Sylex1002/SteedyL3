# Utilisez l'image de base Node.js
FROM node:14

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier package.json et package-lock.json dans le conteneur
COPY package*.json /app/

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers dans le conteneur
COPY . /app/

# Build de l'application React
# RUN npm run build

# Expose le port sur lequel le serveur React écoute (si nécessaire)
EXPOSE 3000

# Commande pour démarrer l'application React (si nécessaire)
CMD ["npm", "start"]