# Gebruik een officiële Node.js image als basis
FROM node:18-alpine

# Stel de werkdirectory in de container in
WORKDIR /app

# Kopieer package.json en package-lock.json
COPY package*.json ./

# Installeer alle dependencies (inclusief devDependencies zoals nodemon)
RUN npm install

# Kopieer de rest van de applicatiecode
COPY . .

# Maak de poort waarop de server draait beschikbaar
EXPOSE 3001

# Het standaard commando voor ontwikkeling met hot-reload
CMD [ "npm", "run", "dev" ]
