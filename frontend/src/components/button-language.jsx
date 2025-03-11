import { useState } from "react";

function LanguageButton() {
  const [language, setLanguage] = useState("fr");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "fr" ? "en" : "fr"));
    // Utilisation correcte des backticks dans JSX
    alert(`Langue changée en : ${language === "fr" ? "Anglais" : "Français"}`);
  };

  return (
    <button
      className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-blue-300"
      style={{
        position: "absolute",
        top: "2rem",
        right: "2rem",
      }}
      onClick={toggleLanguage}
      title="Changer la langue"
    >
      <img
        src={language === "fr" ? "/images/france.png" : "/images/uk.png"}
        alt={language === "fr" ? "Français" : "Anglais"}
        className="w-8 h-8"
      />
    </button>
  );
}

export default LanguageButton;
