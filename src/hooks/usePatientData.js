import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Voor unieke IDs

// Initiële data voor de testpatiënt
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
    // Behandeling sectie data (indien nodig, anders leeg laten)
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
      verbaalBegrip: { iqScore: 100, betrouwbaarheidsLinks: 90, betrouwbaarheidsRechts: 110, emoji: '💬', beschrijving: 'Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken' },
      perceptueelRedeneren: { iqScore: 100, betrouwbaarheidsLinks: 90, betrouwbaarheidsRechts: 110, emoji: '👁️', beschrijving: 'Visueel-analytisch oplossingsvermogen, planning, overzicht' },
      werkgeheugen: { iqScore: 100, betrouwbaarheidsLinks: 90, betrouwbaarheidsRechts: 110, emoji: '🧩', beschrijving: 'Informatie tijdelijk vasthouden, \'iets\' doen en tot een resultaat komen' },
      verwerkingssnelheid: { iqScore: 100, betrouwbaarheidsLinks: 90, betrouwbaarheidsRechts: 110, emoji: '⚡', beschrijving: 'Snel en correct eenvoudige visuele informatie scannen, onderscheiden' },
      totaalIQ: { iqScore: 100, betrouwbaarheidsLinks: 95, betrouwbaarheidsRechts: 105, emoji: '🧠', beschrijving: 'Je totale IQ score', disharmonisch: 'Ja' }
    },
    behandeling: {}
  },
  klachten: [{ tekst: '', emoji: '⚠️' }],
  belangrijksteBevindingen: [{ tekst: '', emoji: '🔍' }],
  praktischeAdviezen: [{ tekst: '', emoji: '💡' }]
});

const usePatientData = () => {
  const [patients, setPatients] = useState([initialTestPatientData]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const selectPatient = useCallback((patientId) => {
    setSelectedPatientId(patientId);
  }, []);

  const deselectPatient = useCallback(() => {
    setSelectedPatientId(null);
  }, []);

  const addPatient = useCallback(() => {
    const newPatientName = `Patiënt ${patients.length}`; // Simpele naamgeving
    const newPatient = createNewPatientTemplate(newPatientName);
    setPatients(prev => [...prev, newPatient]);
    setSelectedPatientId(newPatient.id); // Selecteer direct de nieuwe patiënt
    return newPatient.id;
  }, [patients]);
  
  const updatePatientField = useCallback((patientId, path, value) => {
    setPatients(prevPatients =>
      prevPatients.map(p => {
        if (p.id === patientId) {
          const keys = path.split('.');
          let current = p;
          for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
          // Als de naam in basisgegevens wordt gewijzigd, update ook de 'name' property van de patiënt
          if (path === 'data.basisgegevens.naam') {
            p.name = value || 'Naamloos';
          }
          return { ...p }; // Zorg voor een nieuwe referentie voor state update
        }
        return p;
      })
    );
  }, []);

  const updateFormData = useCallback((section, field, value) => {
    if (!selectedPatientId) return;
    updatePatientField(selectedPatientId, `data.${section}.${field}`, value);
  }, [selectedPatientId, updatePatientField]);

  const updateScore = useCallback((category, field, value) => {
    if (!selectedPatientId) return;
    updatePatientField(selectedPatientId, `data.intelligentie.${category}.${field}`, value);
  }, [selectedPatientId, updatePatientField]);

  // Generieke list updater
  const updateList = useCallback((listName, newList) => {
    if (!selectedPatientId) return;
    setPatients(prevPatients =>
      prevPatients.map(p =>
        p.id === selectedPatientId ? { ...p, [listName]: newList } : p
      )
    );
  }, [selectedPatientId]);

  // Handlers voor Klachten lijst
  const addKlacht = useCallback(() => {
    if (!selectedPatient) return;
    const newList = [...selectedPatient.klachten, { tekst: '', emoji: '⚠️' }];
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  const removeKlacht = useCallback((index) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.klachten.filter((_, i) => i !== index);
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  const updateKlacht = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.klachten.map((klacht, i) =>
      i === index ? { ...klacht, [field]: value } : klacht
    );
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  // Handlers voor Belangrijkste Bevindingen lijst
  const addBevinding = useCallback(() => {
    if (!selectedPatient) return;
    const newList = [...selectedPatient.belangrijksteBevindingen, { tekst: '', emoji: '🔍' }];
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  const removeBevinding = useCallback((index) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.belangrijksteBevindingen.filter((_, i) => i !== index);
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  const updateBevinding = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.belangrijksteBevindingen.map((bevinding, i) =>
      i === index ? { ...bevinding, [field]: value } : bevinding
    );
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  // Handlers voor Praktische Adviezen lijst
  const addAdvies = useCallback(() => {
    if (!selectedPatient) return;
    const newList = [...selectedPatient.praktischeAdviezen, { tekst: '', emoji: '💡' }];
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  const removeAdvies = useCallback((index) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.praktischeAdviezen.filter((_, i) => i !== index);
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  const updateAdvies = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.praktischeAdviezen.map((advies, i) =>
      i === index ? { ...advies, [field]: value } : advies
    );
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  return {
    patients,
    selectedPatient,
    selectedPatientId,
    selectPatient,
    deselectPatient,
    addPatient,
    updateFormData,
    updateScore,
    addKlacht,
    removeKlacht,
    updateKlacht,
    addBevinding,
    removeBevinding,
    updateBevinding,
    addAdvies,
    removeAdvies,
    updateAdvies,
  };
};

export default usePatientData;
