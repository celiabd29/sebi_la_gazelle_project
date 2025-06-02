import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaChevronDown,
  FaGlobe,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const SettingsButton = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };
  const { t } = useTranslation();

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

      {/* PANEL RÉGLAGES */}
      {open && (
        <div className="absolute right-0 mt-4 w-[22rem] bg-[#FF6D83] text-black rounded-xl shadow-2xl p-6 font-[Fredoka]">
          <h2 className="text-2xl font-bold text-center mb-6">
            {t("settings")}
          </h2>

          {/* Bloc Son */}
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg">{t("sound")}</span>
            <button
              onClick={toggleMute}
              className="w-28 h-12 bg-[#FDBA74] hover:bg-orange-300 rounded-md shadow text-xl font-bold active:translate-y-[2px] transition"
            >
              {muted ? t("off") : t("on")}
            </button>
          </div>

          {/* Bloc Langue */}
          <div className="flex justify-between items-center">
            <span className="text-lg">{t("language")}</span>
            <button
              onClick={toggleLanguage}
              className="w-28 h-12 bg-[#FDBA74] hover:bg-orange-300 rounded-md shadow text-xl font-bold flex items-center justify-center gap-2 active:translate-y-[2px] transition"
            >
              <FaGlobe />
              {i18n.language === "fr" ? t("french") : t("english")}
              <FaChevronDown className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
