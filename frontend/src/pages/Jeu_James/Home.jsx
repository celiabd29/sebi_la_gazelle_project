import React from "react";
import { useNavigate } from "react-router-dom";
import ExitButton from "../../components/compo_jeux/ExitButton";
import LanguageButton from "../../components/compo_jeux/LanguageButton";
import ActionButtons from "../../components/compo_jeux/ActionButtons";
import BgJames from "../../assets/img/fonds/accueil-james.webp";
import Tableau from "./Tableau.jsx";

const Home = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate("/tableau");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgJames})` }}
    >
      {/* Titre tout en haut */}
      <div className="text-center mt-20">
        <h1 className="text-5xl md:text-6xl font-medium text-white font-[Fredoka] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Super calculs avec James le hibou
        </h1>
      </div>

      {/* Boutons Exit et Langue */}
      <div className="flex justify-between p-4">
        <ExitButton />
        <LanguageButton />
      </div>

      {/* Boutons en bas */}
      <div className="flex justify-center items-end pb-8">
        <ActionButtons
          onGameClick={handleGameClick}
          onSettingsClick={handleSettingsClick}
        />
      </div>
    </div>
  );
};

export default Home;
