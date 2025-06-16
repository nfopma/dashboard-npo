import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeftCircle } from 'lucide-react';
import SectionNavigation from './SectionNavigation';
import DashboardHeader from './DashboardHeader';
import BasicInfoForm from './BasicInfoForm';
import VoorinformatieForm from './VoorinformatieForm';
import BeinvloedendeFactorenForm from './BeinvloedendeFactorenForm';
import IntelligentieForm from './IntelligentieForm'; // <-- Nieuw, schoon formulier
import ConclusieForm from './ConclusieForm';
import BehandelingForm from './BehandelingForm';
import PreviewTabs from './preview/PreviewTabs';

// Behandelaar invoerscherm voor Neuropsychologisch Dashboard
const BehandelaarInvoerDashboard = ({
  patient, // Geselecteerde patiënt object
  updateFormData,
  updateScore,
  addKlacht,
  removeKlacht,
  updateKlacht,
  addBevinding,
  removeBevinding,
  updateBevinding,
  addAdvies,
  removeAdvies,
  updateAdvies,
  onCloseDashboard // Functie om terug te gaan naar overzicht
}) => {
  // State voor actieve sectie en preview modus, emojiSize lokaal voor dit dashboard
  const [activeSection, setActiveSection] = useState('basisgegevens');
  const [previewMode, setPreviewMode] = useState(false);
  const [emojiSize, setEmojiSize] = useState(2); // 1=klein, 2=medium, 3=groot, 4=extra groot

  if (!patient) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">Geen patiënt geselecteerd.</p>
        <button
          onClick={onCloseDashboard}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center mx-auto"
        >
          <ArrowLeftCircle className="mr-2" size={18} />
          Terug naar overzicht
        </button>
      </div>
    );
  }

  const { data: formData, klachten, belangrijksteBevindingen, praktischeAdviezen } = patient;

  const sections = [
    { id: 'basisgegevens', label: '👤 Basisgegevens' },
    { id: 'voorinformatie', label: '📝 Voorinformatie' },
    { id: 'beinvloedendeFactoren', label: '⚖️ Beïnvloedende factoren' },
    { id: 'intelligentie', label: '🧠 Intelligentie' },
    { id: 'conclusie', label: '🎯 Conclusie' },
    { id: 'behandeling', label: '🤝 Behandeling' }
  ];

  const nextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id);
  };

  const prevSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardHeader
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        emojiSize={emojiSize}
        setEmojiSize={setEmojiSize}
        showPatientName={patient.name} // Toon patiëntnaam in header
        onCloseDashboard={onCloseDashboard} // Knop om terug te gaan
      />

      <div className="container mx-auto p-4">
        {!previewMode && (
          <div className="no-print">
            <SectionNavigation
              sections={sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          {previewMode ? (
            <PreviewTabs
              formData={formData}
              klachten={klachten}
              belangrijksteBevindingen={belangrijksteBevindingen}
              praktischeAdviezen={praktischeAdviezen}
              emojiSize={emojiSize}
            />
          ) : (
            <> {/* Bewerkingsmodus */}
              {activeSection === 'basisgegevens' && <BasicInfoForm formData={formData.basisgegevens} updateFormData={updateFormData} />}
              {activeSection === 'voorinformatie' && <VoorinformatieForm formData={{ ...formData.voorinformatie, klachten: klachten }} updateFormData={updateFormData} addKlacht={addKlacht} removeKlacht={removeKlacht} updateKlacht={updateKlacht} />}
              {activeSection === 'beinvloedendeFactoren' && <BeinvloedendeFactorenForm formData={formData.beinvloedendeFactoren} updateFormData={updateFormData} />}
              
              {/* Gebruik van het nieuwe, schone formulier */}
              {activeSection === 'intelligentie' && <IntelligentieForm formData={formData.intelligentie} updateScore={updateScore} />}
              
              {activeSection === 'conclusie' && <ConclusieForm formData={{ ...formData.conclusie, belangrijksteBevindingen: belangrijksteBevindingen }} updateFormData={updateFormData} addBevinding={addBevinding} removeBevinding={removeBevinding} updateBevinding={updateBevinding} />}
              {activeSection === 'behandeling' && <BehandelingForm formData={{ ...formData.behandeling, praktischeAdviezen: praktischeAdviezen }} updateFormData={updateFormData} addAdvies={addAdvies} removeAdvies={removeAdvies} updateAdvies={updateAdvies} />}
            </>
          )}

          {!previewMode && (
            <div className="flex justify-between mt-6 pt-4 border-t no-print">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md flex items-center disabled:opacity-50"
                onClick={prevSection}
                disabled={activeSection === sections[0].id}
              >
                <ChevronLeft className="mr-2" size={18} /> Vorige
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center disabled:opacity-50"
                onClick={nextSection}
                disabled={activeSection === sections[sections.length - 1].id}
              >
                Volgende <ChevronRight className="ml-2" size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BehandelaarInvoerDashboard;
