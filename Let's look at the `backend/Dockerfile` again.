# Gebruik een officiële Node.js image als basis
FROM node:18-alpine

# Stel de werkdirectory in de container in
WORKDIR /app

# Kopieer package.json en package-lock.json
COPY package*.json ./

# Installeer de dependencies
RUN npm install

# Kopieer de rest van de applicatiecode
COPY . .

# Maak de poort waarop de server draait beschikbaar
EXPOSE 3001

# Het commando om de applicatie te starten
CMD [ "npm", "run", "dev" ]
