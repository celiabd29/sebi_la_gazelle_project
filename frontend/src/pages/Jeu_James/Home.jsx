import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExitButton from "../../components/button-exit";
import LanguageButton from "../../components/button-language";
import ActionButtons from "../../components/compo_jeux/ActionButtons";
import BgJames from "../../assets/img/fonds/accueil-james.webp";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGameClick = () => {
    navigate("/jeuxJames/tableau");
  };

  const handleSettingsClick = () => {
    navigate("/jeuxJames/settings");
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${BgJames})` }}
    >
      {/* Boutons Exit et Langue */}
      <div className="flex justify-between items-start p-4 w-full">
        <ExitButton />
        <LanguageButton />
      </div>

      {/* Titre en haut centré */}
      <div className="w-full text-center mt-6 sm:mt-10 md:mt-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white font-[Fredoka] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] leading-tight">
          {t("title_james")}
        </h1>
      </div>

      {/* Boutons en bas */}
      <div className="flex justify-center items-end pb-10 sm:pb-12 md:pb-16">
        <ActionButtons />
      </div>
    </div>
  );
};

export default Home;
