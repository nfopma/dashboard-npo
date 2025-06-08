import { v4 as uuidv4 } from 'uuid';

// Initiële data voor de testpatiënt, fungeert als onze "nep-database".
const initialTestPatientData = {
  id: 'test-patient',
  name: 'Test Patiënt (J. Jansen)',
  data: {
    basisgegevens: {
      naam: 'J. Jansen',
      geboortedatum: '1985-05-15',
      onderzoeksdatum: '2025-05-10',
      onderzoeker: 'Dr. A. de Vries',
      afdeling: 'Forensische Psychiatrie'
    },
    voorinformatie: {
      opleidingsniveau: 'Havo, vwo, mbo',
      letsel: 'Lichte hersenschudding na val in 2020',
      middelengebruik: 'Dagelijks alcohol gebruik (4-6 glazen), cannabis recreatief in weekend'
    },
    beinvloedendeFactoren: {
      medicatie: 'Sertraline 50mg dagelijks, Melatonine 3mg voor slapen',
      sclUitkomsten: 'Verhoogde scores op depressie en angst schalen (respectievelijk 68 en 72)',
      motorischeSnelheid: 'Lichte tremor in beide handen, mogelijk gerelateerd aan medicatie'
    },
    conclusie: {
      dsmClassificatie: 'F06.7 Lichte neurocognitieve stoornis ten gevolge van multipele etiologieën'
    },
    intelligentie: {
      verbaalBegrip: { iqScore: 85, betrouwbaarheidsLinks: 75, betrouwbaarheidsRechts: 95, emoji: '💬', beschrijving: 'Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken' },
      perceptueelRedeneren: { iqScore: 102, betrouwbaarheidsLinks: 92, betrouwbaarheidsRechts: 112, emoji: '👁️', beschrijving: 'Visueel-analytisch oplossingsvermogen, planning, overzicht' },
      werkgeheugen: { iqScore: 78, betrouwbaarheidsLinks: 68, betrouwbaarheidsRechts: 88, emoji: '🧩', beschrijving: 'Informatie tijdelijk vasthouden, \'iets\' doen en tot een resultaat komen' },
      verwerkingssnelheid: { iqScore: 89, betrouwbaarheidsLinks: 79, betrouwbaarheidsRechts: 99, emoji: '⚡', beschrijving: 'Snel en correct eenvoudige visuele informatie scannen, onderscheiden' },
      totaalIQ: { iqScore: 88, betrouwbaarheidsLinks: 82, betrouwbaarheidsRechts: 94, emoji: '🧠', beschrijving: 'Je totale IQ score', disharmonisch: 'Ja' }
    },
    behandeling: {} 
  },
  klachten: [
    { tekst: 'Woordvindproblemen', emoji: '🔤' },
    { tekst: 'Geheugenproblemen', emoji: '🧠' },
    { tekst: 'Verhoogd alcoholgebruik', emoji: '🍺' },
    { tekst: 'Agressie', emoji: '😠' },
    { tekst: 'Problemen met Politie & Justitie', emoji: '👮' }
  ],
  belangrijksteBevindingen: [
    { tekst: 'Verminderde werkgeheugencapaciteit beïnvloedt dagelijks functioneren', emoji: '🧩' },
    { tekst: 'Goede verbale vaardigheden kunnen compenseren voor andere tekorten', emoji: '💬' },
    { tekst: 'Middelengebruik heeft waarschijnlijk negatieve impact op cognitieve functies', emoji: '🍺' }
  ],
  praktischeAdviezen: [
    { tekst: 'Gebruik externe geheugensteun zoals agenda\'s en notities voor dagelijkse taken', emoji: '📝' },
    { tekst: 'Verminder alcohol consumptie tot maximaal 1-2 glazen per week', emoji: '🍺' },
    { tekst: 'Structureer complexe taken in kleinere, overzichtelijke stappen', emoji: '🔄' }
  ]
};

let mockPatients = [initialTestPatientData];

// Template voor een nieuwe, lege patiënt
const createNewPatientTemplate = (name = 'Nieuwe Patiënt') => ({
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

// Simuleer een netwerkvertraging
const simulateNetwork = (data) => 
  new Promise(resolve => setTimeout(() => resolve(data), 300));

// --- API Functies ---

export const getPatients = async () => {
  console.log("API: Ophalen van alle patiënten...");
  return simulateNetwork([...mockPatients]); // Stuur een kopie
};

export const addPatient = async () => {
  console.log("API: Toevoegen van nieuwe patiënt...");
  const newPatientName = `Patiënt ${mockPatients.length + 1}`;
  const newPatient = createNewPatientTemplate(newPatientName);
  mockPatients.push(newPatient);
  return simulateNetwork(newPatient);
};

export const updatePatient = async (patientId, updatedPatientData) => {
  console.log(`API: Bijwerken van patiënt ${patientId}...`);
  const patientIndex = mockPatients.findIndex(p => p.id === patientId);
  if (patientIndex !== -1) {
    mockPatients[patientIndex] = updatedPatientData;
    return simulateNetwork(mockPatients[patientIndex]);
  } else {
    return Promise.reject(new Error("Patiënt niet gevonden"));
  }
};
