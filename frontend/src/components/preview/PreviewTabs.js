import React, { useState } from 'react';
import PatientInfoCard from './PatientInfoCard';
import IntelligenceResultsCard from './IntelligenceResultsCard';
import ConclusieCard from './ConclusieCard';

const PreviewTabs = ({ formData, klachten, belangrijksteBevindingen, praktischeAdviezen, emojiSize }) => {
  const [activeTab, setActiveTab] = useState('voorblad');
  const tabs = [
    { id: 'voorblad', label: 'Voorblad' },
    { id: 'onderzoeksresultaten', label: 'Onderzoeksresultaten' },
    { id: 'conclusie', label: 'Conclusie & behandeling' }
  ];

  return (
    <div>
      <div className="flex mb-4 space-x-2 no-print">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`tab-content ${activeTab === 'voorblad' ? '' : 'hidden'} page-break`}>
        <PatientInfoCard formData={formData} klachten={klachten} emojiSize={emojiSize} />
      </div>
      <div className={`tab-content ${activeTab === 'onderzoeksresultaten' ? '' : 'hidden'} page-break`}>
        <IntelligenceResultsCard formData={formData} emojiSize={emojiSize} />
      </div>
      <div className={`tab-content ${activeTab === 'conclusie' ? '' : 'hidden'}`}>
        <ConclusieCard
          formData={formData}
          belangrijksteBevindingen={belangrijksteBevindingen}
          praktischeAdviezen={praktischeAdviezen}
          emojiSize={emojiSize}
        />
      </div>
    </div>
  );
};

export default PreviewTabs;
