import React from "react";
import { useNavigate } from "react-router-dom";
import ExitButton from "../../components/compo_jeux/ExitButton";
import LanguageButton from "../../components/compo_jeux/LanguageButton";
import ActionButtons from "../../components/compo_jeux/ActionButtons";
import Tableau from "./Tableau";

const Home = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    // Redirige vers la page du jeu
    navigate("/tableau");
  };
  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat bg-[url('../img/accueil-james.webp')]">
        <div>
          <ExitButton />
          <LanguageButton />
        </div>
        <h1 className="text-6xl font-bold text-center text-white .text-outline font-[Fredoka]">
          Super calcul avec James le hibou
        </h1>

        <div className="flex justify-center items-end pb-8">
          <ActionButtons onGameClick={handleGameClick} />
        </div>
      </div>
    </>
  );
};

export default Home;
