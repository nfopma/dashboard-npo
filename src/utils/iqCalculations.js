// Functie om IQ niveau te bepalen
export const getIQNiveau = (iqScore) => {
  if (iqScore >= 136) return 'Zeer hoog';
  if (iqScore >= 121) return 'Hoog';
  if (iqScore >= 106) return 'Boven gemiddeld';
  if (iqScore >= 95) return 'Gemiddeld';
  if (iqScore >= 80) return 'Beneden gemiddeld';
  if (iqScore >= 65) return 'Laag';
  return 'Zeer laag';
};

// Functie om IQ kleur te bepalen
export const getIQKleur = (iqScore) => {
  if (iqScore >= 136) return 'bg-green-600';
  if (iqScore >= 121) return 'bg-green-500';
  if (iqScore >= 106) return 'bg-green-300';
  if (iqScore >= 95) return 'bg-yellow-400';
  if (iqScore >= 80) return 'bg-orange-400';
  if (iqScore >= 65) return 'bg-red-400';
  return 'bg-red-500';
};

// Functie om IQ score te converteren naar percentiel positie (voor visualisatie)
export const getIQPositie = (iqScore) => {
  // IQ schaal: 50-150 verdeeld over 7 gelijke segmenten
  // Elk segment = (150-50)/7 = ~14.3 punten = 14.29% van de schaal
  const segmentBreedte = 100 / 7; // 14.29%

  if (iqScore <= 50) return 0;
  if (iqScore <= 64) return ((iqScore - 50) / 14) * segmentBreedte;
  if (iqScore <= 79) return segmentBreedte + ((iqScore - 65) / 14) * segmentBreedte;
  if (iqScore <= 94) return 2 * segmentBreedte + ((iqScore - 80) / 14) * segmentBreedte;
  if (iqScore <= 105) return 3 * segmentBreedte + ((iqScore - 95) / 10) * segmentBreedte;
  if (iqScore <= 120) return 4 * segmentBreedte + ((iqScore - 106) / 14) * segmentBreedte;
  if (iqScore <= 135) return 5 * segmentBreedte + ((iqScore - 121) / 14) * segmentBreedte;
  if (iqScore <= 150) return 6 * segmentBreedte + ((iqScore - 136) / 14) * segmentBreedte;
  return 100;
};
