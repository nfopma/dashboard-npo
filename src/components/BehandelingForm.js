import React from 'react';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';
import emojiOptions from '../config/emojiOptions'; // Importeer emoji opties

const BehandelingForm = ({ formData, updateFormData, addAdvies, removeAdvies, updateAdvies }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="text-3xl mr-3">🤝</span>
          Behandeling
        </h2>
        {/* Stap indicator kan hier optioneel worden toegevoegd, of in de parent */}
        {/* <div className="text-sm text-gray-500">Stap 7 van 7</div> */}
      </div>

      {/* Praktische adviezen sectie */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">💡 Praktische adviezen voor de behandeling</h3>
          <button
            className="text-blue-600 flex items-center text-sm"
            onClick={addAdvies}
          >
            <Plus size={16} className="mr-1" />
            Advies toevoegen
          </button>
        </div>

        {formData.praktischeAdviezen.map((advies, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2 p-2 border rounded bg-gray-50">
            <div className="flex-grow-0">
              <select
                className="p-2 border rounded-md"
                value={advies.emoji}
                onChange={(e) => updateAdvies(index, 'emoji', e.target.value)}
              >
                {emojiOptions.adviezen.map(option => (
                  <option key={option.emoji} value={option.emoji}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              className="flex-grow p-2 border rounded-md"
              placeholder="Beschrijf het praktische advies voor behandeling/begeleiding"
              value={advies.tekst}
              onChange={(e) => updateAdvies(index, 'tekst', e.target.value)}
            />

            <button
              className="p-2 text-red-500"
              onClick={() => removeAdvies(index)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        <div className="bg-teal-50 p-3 rounded-md mt-2 flex items-start">
          <HelpCircle className="text-teal-500 mr-2 flex-shrink-0 mt-1" size={18} />
          <p className="text-sm text-teal-700">
            Formuleer concrete, uitvoerbare adviezen die aansluiten bij de neuropsychologische bevindingen.
            Focus op praktische interventies die de patiënt, familie en behandelteam kunnen implementeren.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BehandelingForm;
