import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameLevel1 from "../Jeu_James/GameLevel1";
import ReturnButton from "../../components/compo_jeux/ReturnButton";

function GamePage() {
  const { level } = useParams(); // Récupère le numéro du niveau à partir de l'URL
  const levelNumber = level ? parseInt(level, 10) : null;
  const navigate = useNavigate();

  // Définir le contenu du jeu en fonction du niveau
  const getGameContent = (level) => {
    switch (level) {
      case 1:
        return <GameLevel1 />;
      case 2:
        return {
          title: "Niveau 2",
          // description: "James le hibou a besoin de votre aide pour avancer.",
          // challenge: "Résolvez cette soustraction : 9 - 5 = ?",
        };
      case 3:
        return {
          title: "Niveau 3",
          // description: "Un nouveau défi vous attend ici !",
          // challenge: "Faites cette multiplication : 6 × 7 = ?",
        };
      default:
        return {
          title: "Ce niveau n'existe pas encore.",
          description: "Revenez bientôt !",
          challenge: "",
        };
    }
  };

  const { title, description, challenge } = getGameContent(levelNumber);

  return (
    <div>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
        <ReturnButton />

        {/* Contenu principal */}
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{ fontFamily: "Fredoka" }}
        >
          <h1 className="text-4xl font-bold text-[#27812A] mb-6">{title}</h1>
          <p className="text-lg text-gray-700 text-center mb-10 px-6">
            {description}
          </p>

          {challenge && (
            <div className="bg-[#FF6D83] text-white px-8 py-4 rounded-lg mb-6">
              <p className="text-xl font-semibold">{challenge}</p>
              {/* Formulaire de réponse ou interaction */}
              <input
                type="number"
                placeholder="Votre réponse"
                className="mt-4 p-2 rounded-lg"
                // Ici tu peux ajouter une logique de vérification des réponses
              />
            </div>
          )}

          <button
            className="bg-[#F9C474] text-black text-xl px-8 py-4 rounded-lg shadow-md hover:bg-[#FF6D83] transition-all"
            onClick={() => {
              if (levelNumber != null) {
                navigate(`/game/${levelNumber + 1}`);
              } else {
                console.error("Le niveau est invalide");
              }
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
