import React, { useState } from 'react';
import { Save, Eye, Edit, ArrowLeftCircle, Printer } from 'lucide-react';
import EmojiSizeControl from './EmojiSizeControl';
import printSection from '../utils/printSection';

const DashboardHeader = ({
  previewMode,
  setPreviewMode,
  emojiSize,
  setEmojiSize,
  showPatientName, // Nieuwe prop
  onCloseDashboard // Nieuwe prop
}) => {
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  return (
    <header className="bg-arkin-primary text-white p-4 no-print">
      <div className="container mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="flex items-center">
          {onCloseDashboard && (
            <button 
              onClick={onCloseDashboard} 
              className="mr-4 p-2 rounded-full hover:bg-arkin-primary-light transition-colors"
              title="Terug naar patiëntenoverzicht"
            >
              <ArrowLeftCircle size={24} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold">Neuropsychologisch Dashboard</h1>
            {showPatientName && <p className="text-sm text-arkin-secondary">{showPatientName}</p>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:space-x-4">
          <EmojiSizeControl emojiSize={emojiSize} setEmojiSize={setEmojiSize} />
          <button
            className={`px-4 py-2 rounded-md flex items-center ${
              previewMode
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? (
              <>
                <Edit className="mr-2" size={18} />Bewerken
              </>
            ) : (
              <>
                <Eye className="mr-2" size={18} />Visualisatie
              </>
            )}
          </button>
          <button
            className="px-4 py-2 bg-arkin-secondary hover:bg-arkin-primary-light rounded-md flex items-center"
            onClick={handleSave}
          >
            <Save className="mr-2" size={18} />
            Opslaan
          </button>
          {showSaveMessage && (
            <span className="text-green-300 text-sm">Opgeslagen!</span>
          )}
          {previewMode && (
            <button
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md flex items-center"
              onClick={() => printSection('print-area')}
            >
              <Printer className="mr-2" size={18} />
              Download PDF
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
