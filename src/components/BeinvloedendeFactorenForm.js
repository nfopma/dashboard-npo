import React from 'react';
import { HelpCircle } from 'lucide-react';

const BeinvloedendeFactorenForm = ({ formData, updateFormData }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="text-3xl mr-3">⚖️</span>
          Beïnvloedende factoren
        </h2>
        {/* Stap indicator kan hier optioneel worden toegevoegd, of in de parent */}
        {/* <div className="text-sm text-gray-500">Stap 3 van 7</div> */}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            💊 Medicatie
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Beschrijf huidige medicatie die mogelijk de testresultaten kan beïnvloeden"
            value={formData.medicatie}
            onChange={(e) => updateFormData('beinvloedendeFactoren', 'medicatie', e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📊 SCL uitkomsten
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Relevante uitkomsten van de SCL-90 of andere symptoom checklists"
            value={formData.sclUitkomsten}
            onChange={(e) => updateFormData('beinvloedendeFactoren', 'sclUitkomsten', e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ✋ Motorische snelheid
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Observaties over motorische vaardigheden die de testprestaties kunnen beïnvloeden"
            value={formData.motorischeSnelheid}
            onChange={(e) => updateFormData('beinvloedendeFactoren', 'motorischeSnelheid', e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="bg-purple-50 p-3 rounded-md mt-4 flex items-start">
        <HelpCircle className="text-purple-500 mr-2 flex-shrink-0 mt-1" size={18} />
        <p className="text-sm text-purple-700">
          Deze factoren kunnen de interpretatie van testresultaten beïnvloeden. Vul in wat relevant is voor de testprestaties en interpretatie.
        </p>
      </div>
    </div>
  );
};

export default BeinvloedendeFactorenForm;
