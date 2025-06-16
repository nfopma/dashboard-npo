import React from 'react';
import { getEmojiSizeClass, getEmojiLabel } from '../../utils/emojiUtils';

const ConclusieCard = ({ formData, belangrijksteBevindingen, praktischeAdviezen, emojiSize }) => {
  return (
    <>
      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-bold mb-3 flex items-center">
          <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>🎯</span>Conclusie
        </h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'subheader')}`}>🔍</span>Belangrijkste bevindingen:
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {belangrijksteBevindingen.map((bevinding, index) => (
                <li key={index} className="text-sm flex items-center">
                  <span className={`mr-3 ${getEmojiSizeClass(emojiSize, 'normal')}`}>{bevinding.emoji}</span>
                  <span className="font-semibold mr-1">{getEmojiLabel('bevindingen', bevinding.emoji)}</span>
                  {bevinding.tekst}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1 flex items-center">
              <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'subheader')}`}>📋</span>DSM Classificatie:
            </h4>
            <p className="text-sm bg-white p-2 rounded border">
              {formData.conclusie.dsmClassificatie || 'Niet ingevuld'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-teal-50 rounded-lg">
        <h3 className="font-bold mb-3 flex items-center">
          <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>🤝</span>Behandeling
        </h3>
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'subheader')}`}>💡</span>Praktische adviezen:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            {praktischeAdviezen.map((advies, index) => (
              <li key={index} className="text-sm flex items-center">
                <span className={`mr-3 ${getEmojiSizeClass(emojiSize, 'normal')}`}>{advies.emoji}</span>
                <span className="font-semibold mr-1">{getEmojiLabel('adviezen', advies.emoji)}</span>
                {advies.tekst}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ConclusieCard;
