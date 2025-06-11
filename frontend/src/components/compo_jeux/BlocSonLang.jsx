import React from "react";
import { useTranslation } from "react-i18next";
import { useSound } from "../../contexts/SoundProvider";

function BlocSonLang() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language || "fr");
  const { soundOn, setSoundOn, musicOn, setMusicOn } = useSound(); // 🔥 nouveau
  

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  const toggleMusic = () => {
    setMusicOn(!musicOn);
  };

  return (
    <div className="bg-[#FF6D83] rounded-lg shadow-md p-8 w-3/4 max-w-xl space-y-6">
      {/* Bloc Musique */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="ml-4 text-black text-2xl font-[Fredoka]">Musique</h2>
          <button
            className={`w-28 h-12 text-lg font-medium px-11 py-2 rounded-md shadow font-[Fredoka] ${
              musicOn
                ? "bg-[#F9C474] text-black hover:bg-gray-100"
                : "bg-gray-300 text-white hover:bg-gray-400"
            }`}
            onClick={toggleMusic}
          >
            {musicOn ? "ON" : "OFF"}
          </button>
        </div>


      {/* Bloc Son (voix, bruitages) */}
      <div className="flex justify-between items-center">
        <h2 className="ml-4 text-black text-2xl font-[Fredoka]">Voix</h2>
        <button
          className={`w-28 h-12 text-lg font-medium px-11 py-2 rounded-md shadow font-[Fredoka] ${
            soundOn
              ? "bg-[#F9C474] text-black hover:bg-gray-100"
              : "bg-gray-300 text-white hover:bg-gray-400"
          }`}
          onClick={() => setSoundOn(!soundOn)}
        >
          {soundOn ? "ON" : "OFF"}
        </button>
      </div>

      {/* Bloc Langue */}
      <div className="flex justify-between items-center">
        <h2 className="ml-4 text-black text-2xl font-[Fredoka]">{t("language")}</h2>
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
