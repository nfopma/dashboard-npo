const { Pool } = require('pg');

// De Pool constructor is slim. Als process.env.DATABASE_URL bestaat (zoals op Render),
// gebruikt hij die connectie-string. Anders valt hij terug op de losse variabelen
// (DB_HOST, DB_USER, etc.) die we lokaal via docker-compose en .env instellen.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render vereist een SSL-verbinding voor zijn databases in productie.
  // Lokaal (in Docker) willen we dit niet.
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
});

// Deze functie is nu minder relevant omdat het schema beheerd wordt in Supabase,
// maar kan nuttig zijn voor het opzetten van een lokale testdatabase.
const initDb = async () => {
  try {
    // Controleer of de 'patients' tabel bestaat
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'patients'
      );
    `);

    if (!tableExists.rows[0].exists) {
      // Als de tabel niet bestaat, maak deze dan aan
      await pool.query(`
        CREATE TABLE patients (
          id UUID PRIMARY KEY,
          user_id UUID, 
          name VARCHAR(255) NOT NULL,
          data JSONB,
          klachten JSONB,
          belangrijkste_bevindingen JSONB,
          praktische_adviezen JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Tabel "patients" aangemaakt.');
    } else {
      // Als de tabel wel bestaat, controleer dan op ontbrekende kolommen en voeg ze toe
      console.log('Tabel "patients" bestaat al. Controleren op ontbrekende kolommen...');

      const columns = await pool.query(`
        SELECT column_name FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'patients';
      `);
      const columnNames = columns.rows.map(row => row.column_name);

      const requiredColumns = {
        user_id: 'UUID',
        created_at: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP'
      };

      for (const colName in requiredColumns) {
        if (!columnNames.includes(colName)) {
          await pool.query(`ALTER TABLE patients ADD COLUMN ${colName} ${requiredColumns[colName]};`);
          console.log(`Kolom '${colName}' toegevoegd aan tabel 'patients'.`);
        }
      }
    }

    // Functie om de 'updated_at' timestamp automatisch bij te werken
    await pool.query(`
      CREATE OR REPLACE FUNCTION trigger_set_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Trigger die de functie aanroept, alleen aanmaken als hij niet bestaat
    const triggerExists = await pool.query(`
      SELECT 1 FROM pg_trigger WHERE tgname = 'set_timestamp_patients';
    `);

    if (triggerExists.rowCount === 0) {
      await pool.query(`
        CREATE TRIGGER set_timestamp_patients
        BEFORE UPDATE ON patients
        FOR EACH ROW
        EXECUTE FUNCTION trigger_set_timestamp();
      `);
      console.log('Trigger "set_timestamp_patients" aangemaakt.');
    } else {
      console.log('Trigger "set_timestamp_patients" bestaat al.');
    }

    console.log('Database table "patients" is geïnitialiseerd/gecontroleerd.');
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
