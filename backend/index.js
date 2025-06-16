const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// Maak een Supabase client aan voor de backend.
// Gebruik de SERVICE_ROLE key, deze is geheim en mag alleen op de server.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Dynamische CORS configuratie.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Authenticatie Middleware
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Geen token meegegeven, authenticatie mislukt.' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Ongeldig token, authenticatie mislukt.' });
  }

  // Voeg de gebruiker toe aan het request object voor later gebruik
  req.user = user;
  next();
};

// --- API Routes ---
// Alle patiënt-routes zijn nu beschermd en vereisen een geldig token.
app.use('/api/patients', authMiddleware);

// GET /api/patients - Haal alle patiënten op VOOR DE INGEGLOGDE GEBRUIKER
app.get('/api/patients', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM patients WHERE user_id = $1 ORDER BY name ASC',
      [req.user.id]
    );
    res.json(rows.map(db.dbToCamelCase));
  } catch (err) {
    console.error('Fout bij ophalen patiënten:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// POST /api/patients - Maak een nieuwe patiënt aan VOOR DE INGEGLOGDE GEBRUIKER
app.post('/api/patients', async (req, res) => {
  const {
    name,
    data,
    klachten = [],
    belangrijksteBevindingen = [],
    praktischeAdviezen = []
  } = req.body;
  const newId = uuidv4();

  try {
    const { rows } = await db.query(
      `INSERT INTO patients (id, user_id, name, data, klachten, belangrijkste_bevindingen, praktische_adviezen)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        newId,
        req.user.id, // Koppel de patiënt aan de ingelogde gebruiker
        name,
        JSON.stringify(data || {}),
        JSON.stringify(klachten),
        JSON.stringify(belangrijksteBevindingen),
        JSON.stringify(praktischeAdviezen)
      ]
    );
    res.status(201).json(db.dbToCamelCase(rows[0]));
  } catch (err) {
    console.error('Fout bij aanmaken patiënt:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// PUT /api/patients/:id - Werk een bestaande patiënt bij
app.put('/api/patients/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    data,
    klachten,
    belangrijksteBevindingen,
    praktischeAdviezen
  } = req.body;

  try {
    // De WHERE clausule controleert nu op ZOWEL patient ID als user ID voor extra veiligheid.
    const { rows } = await db.query(
      `UPDATE patients
       SET name = $1, data = $2, klachten = $3, belangrijkste_bevindingen = $4, praktische_adviezen = $5, updated_at = NOW()
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [
        name,
        JSON.stringify(data || {}),
        JSON.stringify(klachten),
        JSON.stringify(belangrijksteBevindingen),
        JSON.stringify(praktischeAdviezen),
        id,
        req.user.id
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Patiënt niet gevonden of geen toestemming.' });
    }
    res.json(db.dbToCamelCase(rows[0]));
  } catch (err) {
    console.error(`Fout bij bijwerken patiënt ${id}:`, err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// DELETE /api/patients/:id - Verwijder een patiënt
app.delete('/api/patients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // De WHERE clausule controleert nu op ZOWEL patient ID als user ID.
    const result = await db.query('DELETE FROM patients WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Patiënt niet gevonden of geen toestemming.' });
    }
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(`Fout bij verwijderen patiënt ${id}:`, err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});


// Start de server
const startServer = async () => {
  // De initDb functie is nu alleen een verbindingstest.
  await db.initDb(); 
  app.listen(port, () => {
    console.log(`Backend server draait op http://localhost:${port}`);
  });
};

startServer();
