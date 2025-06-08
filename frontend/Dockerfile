# Gebruik een officiële Node.js image als basis
FROM node:18-alpine

# Stel de werkdirectory in de container in
WORKDIR /app

# Kopieer package.json en package-lock.json
# Dit zorgt ervoor dat Docker de 'npm install' stap kan cachen
COPY package*.json ./

# Installeer de dependencies
RUN npm install

# Kopieer de rest van de applicatiecode
COPY . .

# Maak de poort van de React dev-server beschikbaar
EXPOSE 3000

# Het commando om de React dev-server te starten
CMD [ "npm", "start" ]
