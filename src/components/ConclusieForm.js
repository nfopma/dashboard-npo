import React from 'react';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';
import emojiOptions from '../config/emojiOptions'; // Importeer emoji opties

const ConclusieForm = ({ formData, updateFormData, addBevinding, removeBevinding, updateBevinding }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          Conclusie
        </h2>
        {/* Stap indicator kan hier optioneel worden toegevoegd, of in de parent */}
        {/* <div className="text-sm text-gray-500">Stap 6 van 7</div> */}
      </div>

      {/* Belangrijkste bevindingen sectie */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">🔍 Belangrijkste bevindingen</h3>
          <button
            className="text-blue-600 flex items-center text-sm"
            onClick={addBevinding}
          >
            <Plus size={16} className="mr-1" />
            Bevinding toevoegen
          </button>
        </div>

        {formData.belangrijksteBevindingen.map((bevinding, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2 p-2 border rounded bg-gray-50">
            <div className="flex-grow-0">
              <select
                className="p-2 border rounded-md"
                value={bevinding.emoji}
                onChange={(e) => updateBevinding(index, 'emoji', e.target.value)}
              >
                {emojiOptions.bevindingen.map(option => (
                  <option key={option.emoji} value={option.emoji}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              className="flex-grow p-2 border rounded-md"
              placeholder="Beschrijf de belangrijkste bevinding"
              value={bevinding.tekst}
              onChange={(e) => updateBevinding(index, 'tekst', e.target.value)}
            ></input>

            <button
              className="p-2 text-red-500"
              onClick={() => removeBevinding(index)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        <div className="bg-green-50 p-3 rounded-md mt-2 flex items-start">
          <HelpCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
          <p className="text-sm text-green-700">
            Formuleer de belangrijkste conclusies uit het neuropsychologisch onderzoek. Focus op klinisch relevante bevindingen die van belang zijn voor behandeling en begeleiding.
          </p>
        </div>
      </div>

      {/* DSM Classificatie sectie */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">📋 DSM Classificatie</h3>
        <textarea
          className="w-full p-3 border rounded-md"
          rows="4"
          placeholder="Voer de DSM-5-TR classificatie in, inclusief code en beschrijving (bijv. F06.7 Lichte neurocognitieve stoornis)"
          value={formData.dsmClassificatie}
          onChange={(e) => updateFormData('conclusie', 'dsmClassificatie', e.target.value)}
        ></textarea>

        <div className="bg-blue-50 p-3 rounded-md mt-2 flex items-start">
          <HelpCircle className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={18} />
          <p className="text-sm text-blue-700">
            Specificeer de DSM-5-TR classificatie op basis van de neuropsychologische bevindingen. Vermeld zowel de diagnostische code als de volledige beschrijving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConclusieForm;
