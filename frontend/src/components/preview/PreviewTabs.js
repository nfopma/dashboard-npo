import React, { useState } from 'react';
import PatientInfoCard from './PatientInfoCard';
import IntelligenceResultsCard from './IntelligenceResultsCard';
import ConclusieCard from './ConclusieCard';

const PreviewTabs = ({ formData, klachten, belangrijksteBevindingen, praktischeAdviezen, emojiSize }) => {
  const [activeTab, setActiveTab] = useState('voorblad');
  const activeClass = 'bg-blue-600 text-white';
  const inactiveClass = 'bg-blue-200 text-blue-700';

  const tabs = [
    {
      id: 'voorblad',
      label: 'Voorblad',
      emoji: '📄'
    },
    {
      id: 'onderzoeksresultaten',
      label: 'Onderzoeksresultaten',
      emoji: '🧠'
    },
    {
      id: 'conclusie',
      label: 'Conclusie & behandeling',
      emoji: '✅'
    }
  ];

  return (
    <div>
      <div className="flex mb-4 space-x-2 no-print">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md text-center ${
              activeTab === tab.id ? activeClass : inactiveClass
            }`}
          >
            <span className="mr-1">{tab.emoji}</span>
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
