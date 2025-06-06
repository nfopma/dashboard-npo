import React from 'react';
import { Save, Eye, Edit, ArrowLeftCircle } from 'lucide-react'; // ArrowLeftCircle toegevoegd
import EmojiSizeControl from './EmojiSizeControl';

const DashboardHeader = ({ 
  previewMode, 
  setPreviewMode, 
  emojiSize, 
  setEmojiSize,
  showPatientName, // Nieuwe prop
  onCloseDashboard // Nieuwe prop
}) => {
  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {onCloseDashboard && (
            <button 
              onClick={onCloseDashboard} 
              className="mr-4 p-2 rounded-full hover:bg-blue-600 transition-colors"
              title="Terug naar patiëntenoverzicht"
            >
              <ArrowLeftCircle size={24} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold">Neuropsychologisch Dashboard</h1>
            {showPatientName && <p className="text-sm text-blue-200">{showPatientName}</p>}
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <EmojiSizeControl emojiSize={emojiSize} setEmojiSize={setEmojiSize} />
          <button
            className={`px-4 py-2 rounded-md flex items-center ${previewMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? (
              <><Edit className="mr-2" size={18} />Bewerken</>
            ) : (
              <><Eye className="mr-2" size={18} />Preview</>
            )}
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center">
            <Save className="mr-2" size={18} />
            Opslaan
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
