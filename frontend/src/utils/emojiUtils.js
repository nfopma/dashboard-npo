import emojiOptions from '../config/emojiOptions';

// Functie om emoji grootte klasse te bepalen
export const getEmojiSizeClass = (emojiSize, type = 'normal') => {
  const sizes = {
    1: { normal: 'text-sm', header: 'text-lg', subheader: 'text-base' },
    2: { normal: 'text-xl', header: 'text-2xl', subheader: 'text-xl' },
    3: { normal: 'text-2xl', header: 'text-3xl', subheader: 'text-2xl' },
    4: { normal: 'text-3xl', header: 'text-4xl', subheader: 'text-3xl' },
    5: { normal: 'text-4xl', header: 'text-5xl', subheader: 'text-4xl' }
  };
  return sizes[emojiSize][type] || sizes[2][type];
};

// Haal het label op dat hoort bij een emoji binnen een bepaalde sectie
// sectionKey verwijst naar de sleutel in emojiOptions (bijv. 'klachten' of 'adviezen')

export const getEmojiLabel = (sectionKey, emoji) => {
  const options = emojiOptions[sectionKey] || [];
  const match = options.find(option => option.emoji === emoji);
  return match ? match.label : '';
};
