import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaChevronDown,
  FaGlobe,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSound } from "../contexts/SoundProvider"; // ✅ contexte sonore

const SettingsButton = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { soundOn, setSoundOn, musicOn, setMusicOn } = useSound(); // ✅ inclut la musique

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  const toggleMute = () => setSoundOn(!soundOn);
  const toggleMusic = () => setMusicOn(!musicOn);

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-md flex items-center justify-center transition"
        aria-label="Réglages"
        title="Réglages"
      >
        <FiSettings size={24} />
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-[22rem] bg-[#FF6D83] text-black rounded-xl shadow-2xl p-6 font-[Fredoka] space-y-6">
          <h2 className="text-2xl font-bold text-center">{t("settings")}</h2>

          {/* Bloc Musique */}
          <div className="flex justify-between items-center">
            <span className="text-lg">Musique</span>
            <button
              onClick={toggleMusic}
              className={`w-28 h-12 rounded-md shadow text-xl font-bold transition ${
                musicOn
                  ? "bg-[#F9C474] text-black hover:bg-yellow-300"
                  : "bg-gray-300 text-white hover:bg-gray-400"
              }`}
            >
              {musicOn ? "ON" : "OFF"}
            </button>
          </div>

          {/* Bloc Voix */}
          <div className="flex justify-between items-center">
            <span className="text-lg">Voix</span>
            <button
              onClick={toggleMute}
              className={`w-28 h-12 rounded-md shadow text-xl font-bold transition ${
                soundOn
                  ? "bg-[#F9C474] text-black hover:bg-yellow-300"
                  : "bg-gray-300 text-white hover:bg-gray-400"
              }`}
            >
              {soundOn ? "ON" : "OFF"}
            </button>
          </div>

          {/* Bloc Langue */}
          <div className="flex justify-between items-center">
            <span className="text-lg">{t("language")}</span>
            <button
              onClick={toggleLanguage}
              className="w-28 h-12 bg-[#F9C474] hover:bg-blue-300 rounded-md shadow text-xl font-bold flex items-center justify-center gap-2 transition"
            >
              <FaGlobe />
              {i18n.language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
              <FaChevronDown className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
