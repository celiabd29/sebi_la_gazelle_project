import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Fonction pour changer la langue
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      {/* Boutons pour changer la langue */}
      <button
        onClick={() => changeLanguage("fr")}
        className="text-2xl focus:outline-none"
        aria-label="Français"
      >
        🇫🇷
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className="text-2xl focus:outline-none"
        aria-label="English"
      >
        🇬🇧
      </button>
    </div>
  );
};

export default LanguageSwitcher;
