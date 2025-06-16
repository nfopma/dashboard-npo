const dns = require('dns');

// Helper functie om object keys van snake_case (db) naar camelCase (js) te converteren
// Deze functie is nu minder relevant omdat Supabase direct JSONB velden retourneert
// en de snake_case velden handmatig worden omgezet in index.js.
// Echter, als deze functie elders nog wordt gebruikt, kan deze blijven.
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
  // query: (text, params) => pool.query(text, params), // Deze is niet meer nodig
  // initDb, // Deze is niet meer nodig
  dbToCamelCase,
};
