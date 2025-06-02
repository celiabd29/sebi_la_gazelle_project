import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function BlocSonLang() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "fr");

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <div className="bg-[#FF6D83] rounded-lg shadow-md p-8 w-3/4 max-w-xl">
      {/* Bloc Son */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="ml-4 text-black text-2xl font-regular font-[Fredoka]">
          {t("sound")}
        </h2>
        <button className="w-28 h-12 bg-[#F9C474] text-lg text-black font-medium px-11 py-2 rounded-md shadow hover:bg-gray-100 transition font-[Fredoka]">
          ON
        </button>
      </div>

      {/* Bloc Langue */}
      <div className="flex justify-between items-center">
        <h2 className="ml-4 text-black text-2xl font-regular font-[Fredoka]">
          {t("language")}
        </h2>
        <button
          className="w-28 h-12 rounded-lg bg-[#F9C474] flex items-center justify-center shadow-lg hover:bg-blue-300"
          onClick={toggleLanguage}
          title={t("change_language")}
        >
          <p className="ml-2 text-lg font-medium text-black font-[Fredoka]">
            {language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
          </p>
        </button>
      </div>
    </div>
  );
}

export default BlocSonLang;
