import React from 'react';

// Component voor het beheren van de emoji grootte
const EmojiSizeControl = ({ emojiSize, setEmojiSize }) => {
  return (
    <div className="flex items-center space-x-2 bg-arkin-primary px-3 py-2 rounded-md">
      <span className="text-sm">📏 Emoji grootte:</span>
      <input
        type="range"
        min="1"
        max="5"
        value={emojiSize}
        onChange={(e) => setEmojiSize(parseInt(e.target.value))}
        className="w-20 h-2 bg-arkin-primary-light rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-xs bg-arkin-secondary px-2 py-1 rounded">
        {['XS', 'S', 'M', 'L', 'XL'][emojiSize - 1]}
      </span>
    </div>
  );
};

export default EmojiSizeControl;
