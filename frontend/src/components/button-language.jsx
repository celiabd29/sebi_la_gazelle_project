import React from "react";
import { useTranslation } from "react-i18next";

const LanguageButton = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "fr";

  const toggleLanguage = () => {
    const newLang = currentLang === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-blue-300 transition duration-200"
      title={currentLang === "fr" ? "Passer à l’anglais" : "Switch to French"}
    >
      <span className="text-2xl">{currentLang === "fr" ? "🇫🇷" : "🇬🇧"}</span>
    </button>
  );
};

export default LanguageButton;
