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

// Helper functie voor betere foutafhandeling
const handleResponse = async (response) => {
  if (response.ok) {
    // Voor 204 No Content (DELETE), is er geen JSON body
    if (response.status === 204) {
      return;
    }
    return response.json();
  }

  // Probeer de JSON error body van de backend te lezen
  const errorData = await response.json().catch(() => ({
    error: `HTTP-fout: ${response.status} ${response.statusText}`
  }));
  
  console.error("Backend error:", errorData);
  throw new Error(errorData.error || 'Er is een onbekende fout opgetreden.');
};


export const getPatients = async () => {
  console.log("API: Ophalen van alle patiënten via backend...");
  const response = await fetch(`${API_URL}/patients`);
  return handleResponse(response);
};

export const addPatient = async (name = 'Nieuwe Patiënt') => {
  console.log(`API: Toevoegen van nieuwe patiënt met naam "${name}" via backend...`);
  const newPatientTemplate = createNewPatientTemplate(name);
  
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPatientTemplate),
  });

  return handleResponse(response);
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

  return handleResponse(response);
};

export const deletePatient = async (patientId) => {
  console.log(`API: Verwijderen van patiënt ${patientId} via backend...`);
  const response = await fetch(`${API_URL}/patients/${patientId}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
};
