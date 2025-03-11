// SettingsButton.js
import React from 'react';

const SettingsButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
    >
      Settings
    </button>
  );
};

export default SettingsButton;
