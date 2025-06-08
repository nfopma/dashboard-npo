import React from 'react';
import { HelpCircle } from 'lucide-react';
import DynamicList from './DynamicList'; // Importeer DynamicList

const VoorinformatieForm = ({ formData, updateFormData, addKlacht, removeKlacht, updateKlacht }) => {
  // Opleidingsniveau opties
  const opleidingsniveauOpties = [
    'Basisonderwijs',
    'Vmbo, mbo1, avo onderbouw',
    'Havo, vwo, mbo',
    'Hbo, wo bachelor',
    'Wo, master, doctor'
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="text-3xl mr-3">📝</span>
          Voorinformatie
        </h2>
        {/* Stap indicator kan hier optioneel worden toegevoegd, of in de parent */}
        {/* <div className="text-sm text-gray-500">Stap 2 van 7</div> */}
      </div>

      {/* Nieuwe extra vragen */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🎓 Opleidingsniveau
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={formData.opleidingsniveau}
            onChange={(e) => updateFormData('voorinformatie', 'opleidingsniveau', e.target.value)}
          >
            <option value="">-- Selecteer opleidingsniveau --</option>
            {opleidingsniveauOpties.map((optie, index) => (
              <option key={index} value={optie}>
                {index + 1}. {optie}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🤕 Letsel
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Beschrijf eventuele letsels, hoofdtrauma's, neurologische aandoeningen, etc."
            value={formData.letsel}
            onChange={(e) => updateFormData('voorinformatie', 'letsel', e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🍺 Middelengebruik (alcohol/drugs, historisch en huidig)
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Beschrijf huidig en historisch gebruik van alcohol, drugs, medicatie, etc."
            value={formData.middelengebruik}
            onChange={(e) => updateFormData('voorinformatie', 'middelengebruik', e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Klachten sectie met DynamicList */}
      <DynamicList
        items={formData.klachten}
        sectionKey="klachten"
        addHandler={addKlacht}
        removeHandler={removeKlacht}
        updateHandler={updateKlacht}
        placeholder="Beschrijf de klacht"
        helpText="Kies een passende emoji en beschrijf de klacht beknopt. Gebruik concrete, eenvoudige taal die begrijpelijk is voor de patiënt."
        title="Klachten"
        titleEmoji="⚠️"
      />
    </div>
  );
};

export default VoorinformatieForm;
