import { useState } from 'react';

const useFormData = () => {
  // Voorbeeld formuliergegevens - zou in praktijk state management gebruiken (Redux, Context)
  const [formData, setFormData] = useState({
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
      belangrijksteBevindingen: [
        { tekst: 'Verminderde werkgeheugencapaciteit beïnvloedt dagelijks functioneren', emoji: '🧩' },
        { tekst: 'Goede verbale vaardigheden kunnen compenseren voor andere tekorten', emoji: '💬' },
        { tekst: 'Middelengebruik heeft waarschijnlijk negatieve impact op cognitieve functies', emoji: '🍺' }
      ],
      dsmClassificatie: 'F06.7 Lichte neurocognitieve stoornis ten gevolge van multipele etiologieën'
    },
    intelligentie: {
      verbaalBegrip: {
        iqScore: 85,
        betrouwbaarheidsLinks: 75,
        betrouwbaarheidsRechts: 95,
        emoji: '💬',
        beschrijving: 'Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken'
      },
      perceptueelRedeneren: {
        iqScore: 102,
        betrouwbaarheidsLinks: 92,
        betrouwbaarheidsRechts: 112,
        emoji: '👁️',
        beschrijving: 'Visueel-analytisch oplossingsvermogen, planning, overzicht'
      },
      werkgeheugen: {
        iqScore: 78,
        betrouwbaarheidsLinks: 68,
        betrouwbaarheidsRechts: 88,
        emoji: '🧩',
        beschrijving: 'Informatie tijdelijk vasthouden, \'iets\' doen en tot een resultaat komen'
      },
      verwerkingssnelheid: {
        iqScore: 89,
        betrouwbaarheidsLinks: 79,
        betrouwbaarheidsRechts: 99,
        emoji: '⚡',
        beschrijving: 'Snel en correct eenvoudige visuele informatie scannen, onderscheiden'
      },
      totaalIQ: {
        iqScore: 88,
        betrouwbaarheidsLinks: 82,
        betrouwbaarheidsRechts: 94,
        emoji: '🧠',
        beschrijving: 'Je totale IQ score',
        disharmonisch: 'Ja'
      }
    }
  });

  // State voor dynamische lijsten (klachten, bevindingen, adviezen)
  const [klachten, setKlachten] = useState([
    { tekst: 'Woordvindproblemen', emoji: '🔤' },
    { tekst: 'Geheugenproblemen', emoji: '🧠' },
    { tekst: 'Verhoogd alcoholgebruik', emoji: '🍺' },
    { tekst: 'Agressie', emoji: '😠' },
    { tekst: 'Problemen met Politie & Justitie', emoji: '👮' }
  ]);

  const [belangrijksteBevindingen, setBelangrijksteBevindingen] = useState([
    { tekst: 'Verminderde werkgeheugencapaciteit beïnvloedt dagelijks functioneren', emoji: '🧩' },
    { tekst: 'Goede verbale vaardigheden kunnen compenseren voor andere tekorten', emoji: '💬' },
    { tekst: 'Middelengebruik heeft waarschijnlijk negatieve impact op cognitieve functies', emoji: '🍺' }
  ]);

  const [praktischeAdviezen, setPraktischeAdviezen] = useState([
    { tekst: 'Gebruik externe geheugensteun zoals agenda\'s en notities voor dagelijkse taken', emoji: '📝' },
    { tekst: 'Verminder alcohol consumptie tot maximaal 1-2 glazen per week', emoji: '🍺' },
    { tekst: 'Structureer complexe taken in kleinere, overzichtelijke stappen', emoji: '🔄' }
  ]);


  // Handler voor formulier updates (voor vaste velden)
  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handler voor score updates (Intelligentie sectie)
  const updateScore = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      intelligentie: {
        ...prev.intelligentie,
        [category]: {
          ...prev.intelligentie[category],
          [field]: value
        }
      }
    }));
  };

  // Handlers voor Klachten lijst
  const addKlacht = () => {
    setKlachten(prev => [...prev, { tekst: '', emoji: '⚠️' }]);
  };

  const removeKlacht = (index) => {
    setKlachten(prev => prev.filter((_, i) => i !== index));
  };

  const updateKlacht = (index, field, value) => {
    setKlachten(prev => prev.map((klacht, i) =>
      i === index ? { ...klacht, [field]: value } : klacht
    ));
  };

  // Handlers voor Belangrijkste Bevindingen lijst
  const addBevinding = () => {
    setBelangrijksteBevindingen(prev => [...prev, { tekst: '', emoji: '🔍' }]);
  };

  const removeBevinding = (index) => {
    setBelangrijksteBevindingen(prev => prev.filter((_, i) => i !== index));
  };

  const updateBevinding = (index, field, value) => {
    setBelangrijksteBevindingen(prev => prev.map((bevinding, i) =>
      i === index ? { ...bevinding, [field]: value } : bevinding
    ));
  };

  // Handlers voor Praktische Adviezen lijst
  const addAdvies = () => {
    setPraktischeAdviezen(prev => [...prev, { tekst: '', emoji: '💡' }]);
  };

  const removeAdvies = (index) => {
    setPraktischeAdviezen(prev => prev.filter((_, i) => i !== index));
  };

  const updateAdvies = (index, field, value) => {
    setPraktischeAdviezen(prev => prev.map((advies, i) =>
      i === index ? { ...advies, [field]: value } : advies
    ));
  };

  return {
    formData,
    klachten,
    belangrijksteBevindingen,
    praktischeAdviezen,
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

export default useFormData;
