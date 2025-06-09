const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser voor JSON

// --- API Routes ---

// GET /api/patients - Haal alle patiënten op
app.get('/api/patients', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM patients ORDER BY name ASC');
    res.json(rows.map(db.dbToCamelCase));
  } catch (err) {
    console.error('Fout bij ophalen patiënten:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// POST /api/patients - Maak een nieuwe patiënt aan
app.post('/api/patients', async (req, res) => {
  const { name, data, klachten, belangrijksteBevindingen, praktischeAdviezen } = req.body;
  const newId = uuidv4();

  try {
    const { rows } = await db.query(
      `INSERT INTO patients (id, name, data, klachten, belangrijkste_bevindingen, praktische_adviezen)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [newId, name, data, klachten, belangrijksteBevindingen, praktischeAdviezen]
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
  const { name, data, klachten, belangrijksteBevindingen, praktischeAdviezen } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE patients
       SET name = $1, data = $2, klachten = $3, belangrijkste_bevindingen = $4, praktische_adviezen = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, data, klachten, belangrijksteBevindingen, praktischeAdviezen, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Patiënt niet gevonden' });
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
    const result = await db.query('DELETE FROM patients WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Patiënt niet gevonden' });
    }
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(`Fout bij verwijderen patiënt ${id}:`, err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});


// Start de server en initialiseer de database
const startServer = async () => {
  await db.initDb();
  app.listen(port, () => {
    console.log(`Backend server draait op http://localhost:${port}`);
  });
};

startServer();
