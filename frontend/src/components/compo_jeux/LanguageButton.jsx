import React from "react";
import { useState } from "react";

function LanguageButton() {
  const [language, setLanguage] = useState("fr");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "fr" ? "en" : "fr"));
    alert(`Langue changée en : ${language === "fr" ? "Anglais" : "Français"}`);
  };

  return (
    <button
      className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg hover:bg-blue-300"
      style={{
        position: "absolute",
        top: "2rem",
        right: "2rem",
      }}
      onClick={toggleLanguage}
      title="Changer la langue"
    >
      <img
        src={language === "fr" ? "/img/france.png" : "/img/uk.png"}
        alt={language === "fr" ? "Français" : "Anglais"}
        className="w-8 h-8"
      />
    </button>
  );
}

export default LanguageButton;
