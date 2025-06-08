import React from 'react';
import { HelpCircle } from 'lucide-react';
import DynamicList from './DynamicList'; // Importeer DynamicList

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

      {/* Praktische adviezen sectie met DynamicList */}
      <DynamicList
        items={formData.praktischeAdviezen}
        sectionKey="adviezen"
        addHandler={addAdvies}
        removeHandler={removeAdvies}
        updateHandler={updateAdvies}
        placeholder="Beschrijf het praktische advies voor behandeling/begeleiding"
        helpText="Formuleer concrete, uitvoerbare adviezen die aansluiten bij de neuropsychologische bevindingen. Focus op praktische interventies die de patiënt, familie en behandelteam kunnen implementeren."
        title="Praktische adviezen voor de behandeling"
        titleEmoji="💡"
      />
    </div>
  );
};

export default BehandelingForm;
