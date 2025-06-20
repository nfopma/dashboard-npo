import React, { useState } from 'react';
import PatientInfoCard from './PatientInfoCard';
import IntelligenceResultsCard from './IntelligenceResultsCard';
import ConclusieCard from './ConclusieCard';

const PreviewTabs = ({ formData, klachten, belangrijksteBevindingen, praktischeAdviezen, emojiSize }) => {
  const [activeTab, setActiveTab] = useState('voorblad');
  const activeClass = 'bg-arkin-secondary text-white';
  const inactiveClass = 'bg-arkin-secondary/20 text-arkin-primary';

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
    <div id="print-area">
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

      <div className={`tab-content print-page ${activeTab === 'voorblad' ? '' : 'hidden'} page-break`}>
        <h1 className="print-main-title">Neuropsychologisch Onderzoek</h1>
        <h2 className="print-section-title">Voorblad</h2>
        <PatientInfoCard formData={formData} klachten={klachten} emojiSize={emojiSize} />
      </div>
      <div className={`tab-content print-page ${activeTab === 'onderzoeksresultaten' ? '' : 'hidden'} page-break`}>
        <h1 className="print-main-title">Neuropsychologisch Onderzoek</h1>
        <h2 className="print-section-title">Onderzoeksresultaten</h2>
        <IntelligenceResultsCard formData={formData} emojiSize={emojiSize} />
      </div>
      <div className={`tab-content print-page ${activeTab === 'conclusie' ? '' : 'hidden'}`}>
        <h1 className="print-main-title">Neuropsychologisch Onderzoek</h1>
        <h2 className="print-section-title">Conclusie &amp; Behandeling</h2>
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
