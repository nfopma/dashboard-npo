// Functie om IQ niveau te bepalen
export const getIQNiveau = (iqScore) => {
  const score = parseInt(iqScore, 10);
  if (isNaN(score)) return 'N/A';

  if (score >= 136) return 'Zeer hoog';
  if (score >= 121) return 'Hoog';
  if (score >= 106) return 'Boven gemiddeld';
  if (score >= 95) return 'Gemiddeld';
  if (score >= 80) return 'Beneden gemiddeld';
  if (score >= 65) return 'Laag';
  return 'Zeer laag';
};

// Functie om IQ kleur te bepalen
export const getIQKleur = (iqScore) => {
  const score = parseInt(iqScore, 10);
  if (isNaN(score)) return 'bg-gray-200';

  if (score >= 136) return 'bg-green-600';
  if (score >= 121) return 'bg-green-500';
  if (score >= 106) return 'bg-green-300';
  if (score >= 95) return 'bg-yellow-400';
  if (score >= 80) return 'bg-orange-400';
  if (score >= 65) return 'bg-red-400';
  return 'bg-red-500';
};

// Functie om IQ score te converteren naar percentiel positie (voor visualisatie)
export const getIQPositie = (iqScore) => {
  const score = parseInt(iqScore, 10);
  if (isNaN(score)) return 0;

  // IQ schaal: 50-150 verdeeld over 7 gelijke segmenten
  // Elk segment = (150-50)/7 = ~14.3 punten = 14.29% van de schaal
  const segmentBreedte = 100 / 7; // 14.29%

  if (score <= 50) return 0;
  if (score <= 64) return ((score - 50) / 14) * segmentBreedte;
  if (score <= 79) return segmentBreedte + ((score - 65) / 14) * segmentBreedte;
  if (score <= 94) return 2 * segmentBreedte + ((score - 80) / 14) * segmentBreedte;
  if (score <= 105) return 3 * segmentBreedte + ((score - 95) / 10) * segmentBreedte;
  if (score <= 120) return 4 * segmentBreedte + ((score - 106) / 14) * segmentBreedte;
  if (score <= 135) return 5 * segmentBreedte + ((score - 121) / 14) * segmentBreedte;
  if (score <= 150) return 6 * segmentBreedte + ((score - 136) / 14) * segmentBreedte;
  return 100;
};
