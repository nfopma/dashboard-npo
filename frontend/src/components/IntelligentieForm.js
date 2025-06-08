import React, { useState, useEffect } from 'react';
import beschrijvingOpties from '../config/beschrijvingOpties';

// Een enkele subtest, nu met lokaal state management
const IntelligentieSubtestInput = ({ categorie, data, updateScore }) => {
  // Lokaal state voor elk veld om re-renders te voorkomen tijdens het typen
  const [iqScore, setIqScore] = useState(data.iqScore);
  const [links, setLinks] = useState(data.betrouwbaarheidsLinks);
  const [rechts, setRechts] = useState(data.betrouwbaarheidsRechts);
  const [beschrijving, setBeschrijving] = useState(data.beschrijving);
  const [disharmonisch, setDisharmonisch] = useState(data.disharmonisch || 'Ja');

  // Sync met globale state als de patiëntdata van buitenaf verandert
  useEffect(() => {
    setIqScore(data.iqScore);
    setLinks(data.betrouwbaarheidsLinks);
    setRechts(data.betrouwbaarheidsRechts);
    setBeschrijving(data.beschrijving);
    setDisharmonisch(data.disharmonisch || 'Ja');
  }, [data]);

  // Functie om de globale state bij te werken wanneer een veld wordt verlaten
  const handleBlur = (field, value) => {
    // Stuur de waarde door zoals hij is. De hook/API is verantwoordelijk voor de conversie.
    updateScore(categorie.key, field, value);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 mb-4">
      <h3 className="font-bold mb-3 text-lg flex items-center">
        <span className="mr-2">{categorie.emoji}</span>
        {categorie.label}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IQ Score</label>
          <input
            type="number" min="50" max="150" className="w-full p-2 border rounded-md"
            value={iqScore}
            onChange={(e) => setIqScore(e.target.value)}
            onBlur={(e) => handleBlur('iqScore', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Betrouwbaarheidsinterval - Links</label>
          <input
            type="number" min="50" max="150" className="w-full p-2 border rounded-md"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            onBlur={(e) => handleBlur('betrouwbaarheidsLinks', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Betrouwbaarheidsinterval - Rechts</label>
          <input
            type="number" min="50" max="150" className="w-full p-2 border rounded-md"
            value={rechts}
            onChange={(e) => setRechts(e.target.value)}
            onBlur={(e) => handleBlur('betrouwbaarheidsRechts', e.target.value)}
          />
        </div>
      </div>

      {categorie.key === 'totaalIQ' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">⚖️ Disharmonisch?</label>
          <select
            className="w-full p-2 border rounded-md"
            value={disharmonisch}
            onChange={(e) => {
              setDisharmonisch(e.target.value);
              updateScore(categorie.key, 'disharmonisch', e.target.value); // Direct updaten voor select
            }}
          >
            <option value="Ja">Ja - Toon totaal IQ score</option>
            <option value="Nee">Nee - Verberg totaal IQ score</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving (eenvoudige taal)</label>
        <select
          className="w-full p-2 border rounded-md mb-2" value=""
          onChange={(e) => {
            if (e.target.value) {
              setBeschrijving(e.target.value);
              updateScore(categorie.key, 'beschrijving', e.target.value); // Direct updaten
            }
          }}
        >
          <option value="">-- Kies een standaard beschrijving --</option>
          {beschrijvingOpties[categorie.key]?.map((optie, idx) => (
            <option key={idx} value={optie}>{optie}</option>
          ))}
        </select>
        <textarea
          className="w-full p-2 border rounded-md" rows="2" placeholder="Of voer een aangepaste beschrijving in"
          value={beschrijving}
          onChange={(e) => setBeschrijving(e.target.value)}
          onBlur={(e) => handleBlur('beschrijving', e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};


// Hoofdcomponent voor het intelligentieformulier
const IntelligentieForm = ({ formData, updateScore }) => {
  const intelligentieCategorieen = [
    { key: 'verbaalBegrip', label: 'Verbaal Begrip', emoji: '💬' },
    { key: 'perceptueelRedeneren', label: 'Perceptueel Redeneren', emoji: '👁️' },
    { key: 'werkgeheugen', label: 'Werkgeheugen', emoji: '🧩' },
    { key: 'verwerkingssnelheid', label: 'Verwerkingssnelheid', emoji: '⚡' },
    { key: 'totaalIQ', label: 'Totaal IQ', emoji: '🧠' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center"><span className="text-3xl mr-3">🧠</span>Intelligentie</h2>
      </div>
      <div className="space-y-6">
        {intelligentieCategorieen.map(categorie => (
          <IntelligentieSubtestInput
            key={categorie.key}
            categorie={categorie}
            data={formData[categorie.key]}
            updateScore={updateScore}
          />
        ))}
      </div>
    </div>
  );
};

export default IntelligentieForm;
