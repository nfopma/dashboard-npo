import React from 'react';
import { Save, Eye, Edit } from 'lucide-react';
import EmojiSizeControl from './EmojiSizeControl';

const DashboardHeader = ({ previewMode, setPreviewMode, emojiSize, setEmojiSize }) => {
  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Neuropsychologisch Dashboard - Invoerscherm</h1>
        <div className="flex space-x-4 items-center">
          {/* Emoji grootte instelling */}
          <EmojiSizeControl emojiSize={emojiSize} setEmojiSize={setEmojiSize} />

          <button
            className={`px-4 py-2 rounded-md flex items-center ${previewMode ? 'bg-blue-600' : 'bg-green-600'}`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? (
              <>
                <Edit className="mr-2" size={18} />
                Bewerken
              </>
            ) : (
              <>
                <Eye className="mr-2" size={18} />
                Preview
              </>
            )}
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-md flex items-center">
            <Save className="mr-2" size={18} />
            Opslaan
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
