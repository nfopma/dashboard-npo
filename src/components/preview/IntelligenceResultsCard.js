import React from 'react';
import { getIQNiveau, getIQKleur, getIQPositie } from '../../utils/iqCalculations';
import { getEmojiSizeClass } from '../../utils/emojiUtils';

const IntelligenceResultsCard = ({ formData, emojiSize }) => {
  // Intelligentie categorieën voor rendering
  const intelligentieCategorieen = [
    {
      key: 'verbaalBegrip',
      label: 'Verbaal Begrip',
      emoji: '💬',
    },
    {
      key: 'perceptueelRedeneren',
      label: 'Perceptueel Redeneren',
      emoji: '👁️',
    },
    {
      key: 'werkgeheugen',
      label: 'Werkgeheugen',
      emoji: '🧩',
    },
    {
      key: 'verwerkingssnelheid',
      label: 'Verwerkingssnelheid',
      emoji: '⚡',
    },
    {
      key: 'totaalIQ',
      label: 'Totaal IQ',
      emoji: '🧠',
    }
  ];

  return (
    <div className="mt-4 bg-purple-50 p-4 rounded-lg">
      <h3 className="font-bold mb-3 flex items-center">
        <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>🧠</span>Intelligentie Test Resultaten
      </h3>

      {intelligentieCategorieen.map(categorie => {
        const data = formData.intelligentie[categorie.key];

        // Verberg totaal IQ in preview als disharmonisch = 'Nee'
        if (categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee') {
          return null; // Toon deze niet in de preview
        }

        return (
          <div key={categorie.key} className="mb-4 p-3 bg-white rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium flex items-center">
                <span className={`${getEmojiSizeClass(emojiSize, 'header')} mr-3`}>{categorie.emoji}</span>
                {categorie.label}
              </span>
              <span className="text-sm">
                IQ: {data.iqScore} ({getIQNiveau(data.iqScore)})
              </span>
            </div>

            {/* Mini versie van de IQ score visualisatie */}
            <div className="relative h-8 w-full rounded overflow-hidden mb-2">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-red-500"></div>
                <div className="flex-1 bg-red-400"></div>
                <div className="flex-1 bg-orange-400"></div>
                <div className="flex-1 bg-yellow-400"></div>
                <div className="flex-1 bg-green-300"></div>
                <div className="flex-1 bg-green-500"></div>
                <div className="flex-1 bg-green-600"></div>
              </div>

              <div
                className="absolute top-1 h-2 bg-white opacity-40 rounded"
                style={{
                  left: `${getIQPositie(data.betrouwbaarheidsLinks)}%`,
                  width: `${getIQPositie(data.betrouwbaarheidsRechts) - getIQPositie(data.betrouwbaarheidsLinks)}%`
                }}>
              </div>

              <div
                className="absolute"
                style={{
                  left: `calc(${getIQPositie(data.iqScore)}% - 6px)`,
                  top: '0'
                }}>
                <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black"></div>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-1">
              95% BI: {data.betrouwbaarheidsLinks}-{data.betrouwbaarheidsRechts}
            </div>

            <p className="text-sm text-gray-600">{data.beschrijving}</p>
          </div>
        );
      })}
    </div>
  );
};

export default IntelligenceResultsCard;
