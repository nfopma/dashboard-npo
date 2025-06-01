import React from 'react';
import { getEmojiSizeClass } from '../../utils/emojiUtils';

const PatientInfoCard = ({ formData, klachten, emojiSize }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">📝 Patiëntgegevens</h3>
        <p><span className="font-semibold">Naam:</span> {formData.basisgegevens.naam}</p>
        <p><span className="font-semibold">Geboortedatum:</span> {new Date(formData.basisgegevens.geboortedatum).toLocaleDateString('nl-NL')}</p>
      </div>

      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <h3 className="font-bold mb-3 flex items-center">
          <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>📋</span>Voorinformatie
        </h3>
        <div className="space-y-2 text-sm">
          <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>🎓</span><span className="font-semibold">Opleidingsniveau:</span> {formData.voorinformatie.opleidingsniveau || 'Niet ingevuld'}</p>
          <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>🤕</span><span className="font-semibold">Letsel:</span> {formData.voorinformatie.letsel || 'Niet ingevuld'}</p>
          <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>🍺</span><span className="font-semibold">Middelengebruik:</span> {formData.voorinformatie.middelengebruik || 'Niet ingevuld'}</p>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2 flex items-center">
          <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>⚠️</span>Klachten
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {klachten.map((klacht, index) => (
            <li key={index} className="flex items-center">
              <span className={`mr-3 ${getEmojiSizeClass(emojiSize, 'normal')}`}>{klacht.emoji}</span>
              {klacht.tekst}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 p-4 bg-orange-50 rounded-lg">
        <h3 className="font-bold mb-3 flex items-center">
          <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>⚖️</span>Beïnvloedende factoren
        </h3>
        <div className="space-y-2 text-sm">
          <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>💊</span><span className="font-semibold">Medicatie:</span> {formData.beinvloedendeFactoren.medicatie || 'Niet ingevuld'}</p>
          <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>📊</span><span className="font-semibold">SCL uitkomsten:</span> {formData.beinvloedendeFactoren.sclUitkomsten || 'Niet ingevuld'}</p>
          <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>✋</span><span className="font-semibold">Motorische snelheid:</span> {formData.beinvloedendeFactoren.motorischeSnelheid || 'Niet ingevuld'}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;
