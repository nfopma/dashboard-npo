const { Pool } = require('pg');
const dns = require('dns');

// Forceer IPv4 voor alle DNS lookups
dns.setDefaultResultOrder('ipv4first');

// De Pool constructor is slim. Als process.env.DATABASE_URL bestaat (zoals op Render),
// gebruikt hij die connectie-string. Anders valt hij terug op de losse variabelen
// (DB_HOST, DB_USER, etc.) die we lokaal via docker-compose en .env instellen.
const pool = new Pool({
  // Gebruik nu de losse omgevingsvariabelen voor de verbinding
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // Supabase vereist altijd SSL. rejectUnauthorized: false is nodig voor sommige omgevingen.
  ssl: {
    rejectUnauthorized: false, 
  },
  // Forceer IPv4 voor Docker compatibiliteit
  connectionString: process.env.DATABASE_URL || undefined,
  // Voeg family: 4 toe om expliciet IPv4 te forceren voor de verbinding
  family: 4,
});

// Deze functie is nu minder relevant omdat het schema beheerd wordt in Supabase,
// maar kan nuttig zijn voor het opzetten van een lokale testdatabase.
const initDb = async () => {
  try {
    // Met Supabase als databasebeheerder, wordt de tabelstructuur en triggers
    // direct in het Supabase dashboard beheerd. Deze functie is nu alleen
    // een placeholder om te bevestigen dat de verbinding werkt.
    await pool.query('SELECT 1'); // Test de verbinding
    console.log('Verbinding met Supabase database succesvol.');
  } catch (err) {
    console.error('Fout bij initialiseren van de database:', err);
    // Stop het proces als de database niet geïnitialiseerd kan worden
    process.exit(1);
  }
};

// Helper functie om object keys van snake_case (db) naar camelCase (js) te converteren
const dbToCamelCase = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    data: row.data,
    klachten: row.klachten,
    belangrijksteBevindingen: row.belangrijkste_bevindingen,
    praktischeAdviezen: row.praktische_adviezen,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  initDb,
  dbToCamelCase,
};
