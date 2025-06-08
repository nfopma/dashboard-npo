const express = require('express');                                                                                                                                                
const cors = require('cors');                                                                                                                                                      
require('dotenv').config();                                                                                                                                                        
const { Pool } = require('pg');                                                                                                                                                    
                                                                                                                                                                                   
const app = express();                                                                                                                                                             
const port = process.env.PORT || 3001;                                                                                                                                             
                                                                                                                                                                                   
// Database connectie opzetten                                                                                                                                                     
const pool = new Pool({                                                                                                                                                            
  host: process.env.DB_HOST,                                                                                                                                                       
  user: process.env.DB_USER,                                                                                                                                                       
  password: process.env.DB_PASSWORD,                                                                                                                                               
  database: process.env.DB_NAME,                                                                                                                                                   
  port: process.env.DB_PORT,                                                                                                                                                       
});                                                                                                                                                                                
                                                                                                                                                                                   
// Middleware                                                                                                                                                                      
app.use(cors());                                                                                                                                                                   
app.use(express.json());                                                                                                                                                           
                                                                                                                                                                                   
// --- API Routes ---                                                                                                                                                              
                                                                                                                                                                                   
// Simpele test-route                                                                                                                                                              
app.get('/api/test', (req, res) => {                                                                                                                                               
  res.json({ message: 'De backend is bereikbaar!' });                                                                                                                              
});                                                                                                                                                                                
                                                                                                                                                                                   
// Database connectie test-route                                                                                                                                                   
app.get('/api/db-test', async (req, res) => {                                                                                                                                      
  try {                                                                                                                                                                            
    const result = await pool.query('SELECT NOW()');                                                                                                                               
    res.json({                                                                                                                                                                     
      message: 'Databaseverbinding succesvol!',                                                                                                                                    
      tijd: result.rows[0].now,                                                                                                                                                    
    });                                                                                                                                                                            
  } catch (err) {                                                                                                                                                                  
    console.error('Database verbindingsfout:', err);                                                                                                                               
    res.status(500).json({ error: 'Kon niet verbinden met de database.' });                                                                                                        
  }                                                                                                                                                                                
});                                                                                                                                                                                
                                                                                                                                                                                   
                                                                                                                                                                                   
app.listen(port, () => {                                                                                                                                                           
  console.log(`Backend server draait op http://localhost:${port}`);                                                                                                                
}); 