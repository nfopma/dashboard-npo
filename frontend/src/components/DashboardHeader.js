import React from 'react';
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
  return (
    <header className="bg-blue-700 text-white p-4 no-print">
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
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center">
            <Save className="mr-2" size={18} />
            Opslaan
          </button>
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
