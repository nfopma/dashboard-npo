import React from 'react';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import emojiOptions from '../config/emojiOptions'; // Importeer emoji opties

const DynamicList = ({
  items,
  sectionKey, // 'klachten', 'bevindingen', 'adviezen'
  addHandler,
  removeHandler,
  updateHandler,
  placeholder,
  helpText,
  title,
  titleEmoji
}) => {
  const currentEmojiOptions = emojiOptions[sectionKey] || [];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold flex items-center">
          {titleEmoji && <span className="mr-2">{titleEmoji}</span>}
          {title}
        </h3>
        <button
          className="text-blue-600 flex items-center text-sm"
          onClick={addHandler}
        >
          <Plus size={16} className="mr-1" />
          {title} toevoegen
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex items-start space-x-2 mb-2 p-2 border rounded bg-gray-50">
          <div className="flex-grow-0">
            <select
              className="p-2 border rounded-md"
              value={item.emoji}
              onChange={(e) => updateHandler(index, 'emoji', e.target.value)}
            >
              {currentEmojiOptions.map(option => (
                <option key={option.emoji} value={option.emoji}>
                  {option.emoji} {option.label}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            className="flex-grow p-2 border rounded-md"
            placeholder={placeholder}
            value={item.tekst}
            onChange={(e) => updateHandler(index, 'tekst', e.target.value)}
          />

          <button
            className="p-2 text-red-500"
            onClick={() => removeHandler(index)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      {helpText && (
        <div className="bg-blue-50 p-3 rounded-md mt-2 flex items-start">
          <HelpCircle className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={18} />
          <p className="text-sm text-blue-700">
            {helpText}
          </p>
        </div>
      )}
    </div>
  );
};

export default DynamicList;
