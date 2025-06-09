import { v4 as uuidv4 } from 'uuid';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Template voor een nieuwe, lege patiënt. Wordt nu gebruikt bij het aanmaken.
const createNewPatientTemplate = (name = 'Nieuwe Patiënt') => ({
  // id wordt door de backend gegenereerd, maar we kunnen een placeholder gebruiken
  id: uuidv4(), 
  name: name,
  data: {
    basisgegevens: { naam: name, geboortedatum: '', onderzoeksdatum: '', onderzoeker: '', afdeling: '' },
    voorinformatie: { opleidingsniveau: '', letsel: '', middelengebruik: '' },
    beinvloedendeFactoren: { medicatie: '', sclUitkomsten: '', motorischeSnelheid: '' },
    conclusie: { dsmClassificatie: '' },
    intelligentie: {
      verbaalBegrip: { iqScore: '', betrouwbaarheidsLinks: '', betrouwbaarheidsRechts: '', emoji: '💬', beschrijving: 'Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken' },
      perceptueelRedeneren: { iqScore: '', betrouwbaarheidsLinks: '', betrouwbaarheidsRechts: '', emoji: '👁️', beschrijving: 'Visueel-analytisch oplossingsvermogen, planning, overzicht' },
      werkgeheugen: { iqScore: '', betrouwbaarheidsLinks: '', betrouwbaarheidsRechts: '', emoji: '🧩', beschrijving: 'Informatie tijdelijk vasthouden, \'iets\' doen en tot een resultaat komen' },
      verwerkingssnelheid: { iqScore: '', betrouwbaarheidsLinks: '', betrouwbaarheidsRechts: '', emoji: '⚡', beschrijving: 'Snel en correct eenvoudige visuele informatie scannen, onderscheiden' },
      totaalIQ: { iqScore: '', betrouwbaarheidsLinks: '', betrouwbaarheidsRechts: '', emoji: '🧠', beschrijving: 'Je totale IQ score', disharmonisch: 'Ja' }
    },
    behandeling: {}
  },
  klachten: [{ tekst: '', emoji: '⚠️' }],
  belangrijksteBevindingen: [{ tekst: '', emoji: '🔍' }],
  praktischeAdviezen: [{ tekst: '', emoji: '💡' }]
});


// --- API Functies ---

export const getPatients = async () => {
  console.log("API: Ophalen van alle patiënten via backend...");
  const response = await fetch(`${API_URL}/patients`);
  if (!response.ok) {
    throw new Error('Netwerkfout bij ophalen patiënten.');
  }
  return response.json();
};

export const addPatient = async () => {
  console.log("API: Toevoegen van nieuwe patiënt via backend...");
  const newPatientTemplate = createNewPatientTemplate();
  
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPatientTemplate),
  });

  if (!response.ok) {
    throw new Error('Netwerkfout bij toevoegen patiënt.');
  }
  return response.json();
};

export const updatePatient = async (patientId, updatedPatientData) => {
  console.log(`API: Bijwerken van patiënt ${patientId} via backend...`);
  const response = await fetch(`${API_URL}/patients/${patientId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPatientData),
  });

  if (!response.ok) {
    throw new Error('Netwerkfout bij bijwerken patiënt.');
  }
  return response.json();
};

export const deletePatient = async (patientId) => {
  console.log(`API: Verwijderen van patiënt ${patientId} via backend...`);
  const response = await fetch(`${API_URL}/patients/${patientId}`, {
    method: 'DELETE',
  });

  if (!response.ok && response.status !== 204) {
    throw new Error('Netwerkfout bij verwijderen patiënt.');
  }
  // Geen body verwacht bij een 204 No Content response
  return;
};
