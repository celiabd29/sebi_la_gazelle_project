import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReturnButton from "../../components/compo_jeux/ReturnButton";

function LevelPage() {
  const { id } = useParams(); // Récupère le numéro du niveau à partir de l'URL
  const levelNumber = id ? parseInt(id, 10) : null;
  const navigate = useNavigate(); // Initialisation de useNavigate

  // Définir le contenu du niveau en fonction de son numéro
  const getLevelContent = (level) => {
    switch (level) {
      case 1:
        return "Bienvenue au Niveau 1 ! Résolvez cette énigme pour commencer.";
      case 2:
        return "Niveau 2 : James le hibou a besoin de votre aide pour avancer.";
      case 3:
        return "Niveau 3 : Un nouveau défi vous attend ici !";
      // Ajoute plus de niveaux si nécessaire
      default:
        return "Ce niveau n'existe pas encore. Revenez bientôt !";
    }
  };

  return (
    <div>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
        {/* Bulles animées */}
        <div className="bubble bg-[#BDFEC4]"></div>
        <div className="bubble bg-[#BDFEC4]"></div>
        <div className="bubble bg-[#BDFEC4]"></div>
        <div className="bubble bg-[#BDFEC4]"></div>
        <div className="bubble bg-[#BDFEC4]"></div>
        <div className="bubble bg-[#BDFEC4]"></div>
        <div className="bubble bg-[#BDFEC4]"></div>

        {/* Contenu principal */}
        <ReturnButton />
        <div className="bg-[url('../img/Roll.svg')] relative z-8 w-[61.3rem] h-[80vh]">
          <div
            className="relative z-10 flex flex-col items-center justify-center  "
            style={{ fontFamily: "Fredoka" }}
          >
            <div className="bg-[url('../img/Banderole.svg')] relative z-9 w-[17rem] h-[10.2vh] flex items-center justify-center">
              <h1 className="text-3xl text-white font-medium mb-6 ">
                Niveau {levelNumber}
              </h1>
            </div>
            <div className="bg-[url('../img/The_task.svg')] relative z-9 mt-8 w-[22rem] h-[21.7vh] flex items-end justify-center">
              <p className="text-base text-[#DF514E] text-center mb-5 px-6">
                {getLevelContent(levelNumber)}
              </p>
            </div>
            <div className="bg-[url('../img/classement.svg')] relative z-9 mt-8 w-[29rem] h-[24vh]"></div>
            <button
              className="bg-[#BDFEC4] font-bold text-black text-2xl mt-5 px-9 py-2 rounded-lg shadow-md hover:bg-[#FF6D83] transition-all"
              onClick={() => navigate(`/game/${levelNumber}`)} // Redirection vers la page de jeu
            >
              Commencer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelPage;
