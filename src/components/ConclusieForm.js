import React from 'react';
import { HelpCircle } from 'lucide-react';
import DynamicList from './DynamicList'; // Importeer DynamicList

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

      {/* Belangrijkste bevindingen sectie met DynamicList */}
      <DynamicList
        items={formData.belangrijksteBevindingen}
        sectionKey="bevindingen"
        addHandler={addBevinding}
        removeHandler={removeBevinding}
        updateHandler={updateBevinding}
        placeholder="Beschrijf de belangrijkste bevinding"
        helpText="Formuleer de belangrijkste conclusies uit het neuropsychologisch onderzoek. Focus op klinisch relevante bevindingen die van belang zijn voor behandeling en begeleiding."
        title="Belangrijkste bevindingen"
        titleEmoji="🔍"
      />

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
        </p>
      </div>
    </div>
  );
};

export default ConclusieForm;
