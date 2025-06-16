# Dashboard NPO

Dit project bevat een kleine full‑stack opzet voor een neuropsychologisch dashboard. De frontend is een React‑applicatie en de backend is een Express API die gegevens opslaat in Supabase.

## Vereisten

- **Node.js**: versie 18 of hoger. Zowel de backend als de frontend gebruiken `node:18-alpine` als basisimage.
- **Docker** (optioneel): je kunt de volledige stack draaien met `docker-compose`.

## Configuratie

Maak in de projectroot een `.env`-bestand aan met de volgende variabelen:

```bash
SUPABASE_URL=<jouw-supabase-url>
SUPABASE_SERVICE_KEY=<service-role-key>
REACT_APP_SUPABASE_URL=<jouw-supabase-url>
REACT_APP_SUPABASE_ANON_KEY=<anon-key>
CORS_ORIGIN=http://localhost:3000
REACT_APP_API_URL=http://localhost:3001/api
```

Deze waarden worden gebruikt door zowel de backend als de frontend, en ook door `docker-compose`.

## Lokaal starten

Installeer de afhankelijkheden in elke package en start de servers:

```bash
# Start de backend
cd backend
npm install
npm run dev
```

```bash
# Start de frontend (in een andere terminal)
cd frontend
npm install
npm start
```

De React-app is bereikbaar op <http://localhost:3000> en verwacht dat de backend draait op poort `3001`.

### Docker Compose gebruiken

Als je liever Docker gebruikt, kun je alles starten met:

```bash
docker-compose up --build
```

Hiermee draaien backend en frontend met hot reload, net als bij de lokale scripts.

## Supabase migrations

In `supabase/migrations` staan voorbeeld-SQL's om de database bij te werken. Je kunt deze uitvoeren via de Supabase SQL editor of met de Supabase CLI.
