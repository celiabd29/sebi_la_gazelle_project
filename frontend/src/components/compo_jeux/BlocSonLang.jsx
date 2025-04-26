import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BlocSonLang() {
  const [language, setLanguage] = useState("fr");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "fr" ? "en" : "fr"));
    alert(`Langue changée en : ${language === "fr" ? "Anglais" : "Français"}`);
  };

  return (
    <div className="bg-[#FF6D83] rounded-lg shadow-md p-8 w-3/4 max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="ml-4 text-black text-2xl font-regular font-[Fredoka]">
          Son
        </h2>
        <button className="w-28 h-12 bg-[#F9C474] text-lg text-black font-medium px-11 py-2 rounded-md shadow hover:bg-gray-100 transition font-[Fredoka]">
          ON
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="ml-4 text-black text-2xl font-regular font-[Fredoka]">
          Langue
        </h2>
        <button
          className="w-28 h-12 rounded-lg bg-[#F9C474] flex items-center justify-center shadow-lg hover:bg-blue-300"
          onClick={toggleLanguage}
          title="Changer la langue"
        >
          <img
            src={language === "fr" ? "/img/france.png" : "/img/uk.png"}
            alt={language === "fr" ? "Français" : "Anglais"}
            className="w-8 h-8"
          />
          <p className="ml-2 text-lg font-medium text-black font-[Fredoka]">
            {language === "fr" ? "FR" : "EN"}
          </p>
          <i className="fa-solid fa-chevron-down ml-2"></i>
        </button>
      </div>
    </div>
  );
}

export default BlocSonLang;
