import React, { useState } from 'react';
import PatientInfoCard from './PatientInfoCard';
import IntelligenceResultsCard from './IntelligenceResultsCard';
import ConclusieCard from './ConclusieCard';

const PreviewTabs = ({ formData, klachten, belangrijksteBevindingen, praktischeAdviezen, emojiSize }) => {
  const [activeTab, setActiveTab] = useState('voorblad');
  const tabs = [
    {
      id: 'voorblad',
      label: 'Voorblad',
      emoji: '📄',
      activeClass: 'bg-pink-600 text-white',
      inactiveClass: 'bg-pink-200 text-pink-700'
    },
    {
      id: 'onderzoeksresultaten',
      label: 'Onderzoeksresultaten',
      emoji: '🧠',
      activeClass: 'bg-yellow-600 text-white',
      inactiveClass: 'bg-yellow-200 text-yellow-700'
    },
    {
      id: 'conclusie',
      label: 'Conclusie & behandeling',
      emoji: '✅',
      activeClass: 'bg-green-600 text-white',
      inactiveClass: 'bg-green-200 text-green-700'
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
              activeTab === tab.id ? tab.activeClass : tab.inactiveClass
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
