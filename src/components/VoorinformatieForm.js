import React from 'react';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';

const VoorinformatieForm = ({ formData, updateFormData, addKlacht, removeKlacht, updateKlacht, emojiOptions }) => {
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

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">⚠️ Klachten</h3>
          <button
            className="text-blue-600 flex items-center text-sm"
            onClick={addKlacht}
          >
            <Plus size={16} className="mr-1" />
            Klacht toevoegen
          </button>
        </div>

        {formData.klachten.map((klacht, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2 p-2 border rounded bg-gray-50">
            <div className="flex-grow-0">
              <select
                className="p-2 border rounded-md"
                value={klacht.emoji}
                onChange={(e) => updateKlacht(index, 'emoji', e.target.value)}
              >
                {emojiOptions.klachten.map(option => (
                  <option key={option.emoji} value={option.emoji}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              className="flex-grow p-2 border rounded-md"
              placeholder="Beschrijf de klacht"
              value={klacht.tekst}
              onChange={(e) => updateKlacht(index, 'tekst', e.target.value)}
            />

            <button
              className="p-2 text-red-500"
              onClick={() => removeKlacht(index)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        <div className="bg-blue-50 p-3 rounded-md mt-2 flex items-start">
          <HelpCircle className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={18} />
          <p className="text-sm text-blue-700">
            Kies een passende emoji en beschrijf de klacht beknopt. Gebruik concrete, eenvoudige taal die begrijpelijk is voor de patiënt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoorinformatieForm;
