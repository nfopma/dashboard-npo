import React from 'react';

const BasicInfoForm = ({ formData, updateFormData }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">👤 Basisgegevens</h2>
        {/* Stap indicator kan hier optioneel worden toegevoegd, of in de parent */}
        {/* <div className="text-sm text-gray-500">Stap 1 van 7</div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Naam patiënt
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={formData.naam}
            onChange={(e) => updateFormData('basisgegevens', 'naam', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Geboortedatum
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={formData.geboortedatum}
            onChange={(e) => updateFormData('basisgegevens', 'geboortedatum', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Onderzoeksdatum
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={formData.onderzoeksdatum}
            onChange={(e) => updateFormData('basisgegevens', 'onderzoeksdatum', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Onderzoeker
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={formData.onderzoeker}
            onChange={(e) => updateFormData('basisgegevens', 'onderzoeker', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Afdeling
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={formData.afdeling}
            onChange={(e) => updateFormData('basisgegevens', 'afdeling', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
