const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');

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
// Inclusief patiënten met user_id = NULL (algemene testpatiënten)
app.get('/api/patients', async (req, res) => {
  try {
    // Haal patiënten op die gekoppeld zijn aan de user_id OF waar user_id NULL is
    const { data: patients, error } = await supabase
      .from('patients')
      .select('*')
      .or(`user_id.eq.${req.user.id},user_id.is.null`)
      .order('name', { ascending: true });

    if (error) {
      console.error('Fout bij ophalen patiënten van Supabase:', error);
      return res.status(500).json({ error: 'Interne serverfout bij ophalen patiënten.' });
    }
    
    // Supabase retourneert al camelCase voor JSONB velden, en de rest is snake_case.
    // We moeten de snake_case velden handmatig omzetten naar camelCase.
    // De `dbToCamelCase` functie is verwijderd, dus we doen het hier direct.
    const formattedPatients = patients.map(patient => ({
      id: patient.id,
      userId: patient.user_id,
      name: patient.name,
      data: patient.data,
      klachten: patient.klachten,
      belangrijksteBevindingen: patient.belangrijkste_bevindingen,
      praktischeAdviezen: patient.praktische_adviezen,
      createdAt: patient.created_at,
      updatedAt: patient.updated_at,
    }));

    res.json(formattedPatients);
  } catch (err) {
    console.error('Onverwachte fout bij ophalen patiënten:', err);
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
  
  // Supabase genereert zelf de ID bij insert, dus uuidv4 is niet nodig voor de database ID.
  // Echter, als je de ID al in de frontend genereert, kun je die meesturen.
  // Voor nu laten we Supabase de ID genereren.

  try {
    const { data: newPatient, error } = await supabase
      .from('patients')
      .insert([
        {
          user_id: req.user.id, // Koppel de patiënt aan de ingelogde gebruiker
          name: name,
          data: data || {}, // Supabase kan direct JSON objecten opslaan in JSONB velden
          klachten: klachten,
          belangrijkste_bevindingen: belangrijksteBevindingen,
          praktische_adviezen: praktischeAdviezen
        }
      ])
      .select(); // Vraag de ingevoegde rij terug

    if (error) {
      console.error('Fout bij aanmaken patiënt in Supabase:', error);
      return res.status(500).json({ error: 'Interne serverfout bij aanmaken patiënt.' });
    }

    // Supabase retourneert een array van objecten, we nemen de eerste
    const createdPatient = newPatient[0];
    
    // Handmatig omzetten naar camelCase voor consistentie met frontend
    const formattedCreatedPatient = {
      id: createdPatient.id,
      userId: createdPatient.user_id,
      name: createdPatient.name,
      data: createdPatient.data,
      klachten: createdPatient.klachten,
      belangrijksteBevindingen: createdPatient.belangrijkste_bevindingen,
      praktischeAdviezen: createdPatient.praktische_adviezen,
      createdAt: createdPatient.created_at,
      updatedAt: createdPatient.updated_at,
    };

    res.status(201).json(formattedCreatedPatient);
  } catch (err) {
    console.error('Onverwachte fout bij aanmaken patiënt:', err);
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
    // Werk de patiënt bij, maar alleen als de user_id overeenkomt met de ingelogde gebruiker
    // en de user_id NIET NULL is (voorkom wijziging van algemene testpatiënt)
    const { data: updatedPatient, error } = await supabase
      .from('patients')
      .update({
        name: name,
        data: data || {},
        klachten: klachten,
        belangrijkste_bevindingen: belangrijksteBevindingen,
        praktische_adviezen: praktischeAdviezen,
        updated_at: new Date().toISOString() // Supabase kan dit ook automatisch doen met triggers
      })
      .eq('id', id)
      .eq('user_id', req.user.id) // Alleen patiënten van de ingelogde gebruiker kunnen worden bijgewerkt
      .not('user_id', 'is', null) // Voorkom wijziging van algemene testpatiënt
      .select(); // Vraag de bijgewerkte rij terug

    if (error) {
      console.error('Fout bij bijwerken patiënt in Supabase:', error);
      return res.status(500).json({ error: 'Interne serverfout bij bijwerken patiënt.' });
    }

    if (!updatedPatient || updatedPatient.length === 0) {
      return res.status(404).json({ error: 'Patiënt niet gevonden of geen toestemming om te wijzigen.' });
    }
    
    // Handmatig omzetten naar camelCase voor consistentie met frontend
    const formattedUpdatedPatient = {
      id: updatedPatient[0].id,
      userId: updatedPatient[0].user_id,
      name: updatedPatient[0].name,
      data: updatedPatient[0].data,
      klachten: updatedPatient[0].klachten,
      belangrijksteBevindingen: updatedPatient[0].belangrijkste_bevindingen,
      praktischeAdviezen: updatedPatient[0].praktische_adviezen,
      createdAt: updatedPatient[0].created_at,
      updatedAt: updatedPatient[0].updated_at,
    };

    res.json(formattedUpdatedPatient);
  } catch (err) {
    console.error(`Onverwachte fout bij bijwerken patiënt ${id}:`, err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// DELETE /api/patients/:id - Verwijder een patiënt
app.delete('/api/patients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Verwijder de patiënt, maar alleen als de user_id overeenkomt met de ingelogde gebruiker
    // en de user_id NIET NULL is (voorkom verwijdering van algemene testpatiënt)
    const { error, count } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id) // Alleen patiënten van de ingelogde gebruiker kunnen worden verwijderd
      .not('user_id', 'is', null); // Voorkom verwijdering van algemene testpatiënt

    if (error) {
      console.error('Fout bij verwijderen patiënt in Supabase:', error);
      return res.status(500).json({ error: 'Interne serverfout bij verwijderen patiënt.' });
    }

    if (count === 0) {
      return res.status(404).json({ error: 'Patiënt niet gevonden of geen toestemming om te verwijderen.' });
    }
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(`Onverwachte fout bij verwijderen patiënt ${id}:`, err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});


// Start de server
const startServer = async () => {
  // Geen database initialisatie meer nodig via pg, Supabase client is direct klaar.
  app.listen(port, () => {
    console.log(`Backend server draait op http://localhost:${port}`);
  });
};

startServer();
