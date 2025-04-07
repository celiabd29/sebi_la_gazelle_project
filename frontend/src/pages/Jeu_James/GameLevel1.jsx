import React, { useState } from "react";

function GameLevel1() {
  const [feedback, setFeedback] = useState(""); // Définit un état pour gérer le feedback de l'utilisateur
  const [selectedNumbers, setSelectedNumbers] = useState([]); // Pour stocker les numéros sélectionnés
  const correctAnswer = 7; // Exemple de réponse correcte (tu peux la générer dynamiquement)

  const handleNumberClick = (number) => {
    if (number === correctAnswer) {
      setFeedback("Bravo, c'est la bonne réponse !");
    } else {
      setFeedback("Oups, essaie encore !");
    }
  };

  return (
    <div className="game-level-1">
      <h1>Bienvenue au Niveau 1</h1>
      <p>Sélectionnez le bon chiffre :</p>

      {/* Affichage des chiffres */}
      <div className="numbers-grid">
        {[...Array(10).keys()].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="number-button"
          >
            {number}
          </button>
        ))}
      </div>

      {/* Affichage du feedback */}
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default GameLevel1;
