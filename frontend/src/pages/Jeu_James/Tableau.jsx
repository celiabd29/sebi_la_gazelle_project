import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../components/compo_jeux/ReturnButton";
import GrandeEtoile from "../../assets/img/icons/star_big.svg"; // étoile obtenue
import EtoileVide from "../../assets/img/icons/star_small.svg"; // étoile non obtenue
import LockIcon from "../../assets/img/icons/lock.png"; // cadenas noir

// Définir les couleurs des lignes
const rowColors = ["#94E7FC", "#F9C474", "#FF6D83"];

const niveaux = Array.from({ length: 15 }, (_, i) => {
  return {
    number: i + 1,
    unlocked: i < 3,
    stars: 3 - i > 0 ? 3 - i : 0,
    color: rowColors[Math.floor(i / 5)],
  };
});

function Tableau() {
  const navigate = useNavigate();

  const handleButtonClick = (level) => {
    if (level.unlocked) {
      navigate(`/level/${level.number}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 relative">
      <ReturnButton className="absolute top-4 left-4" />

      <div
        className="bg-green-700 rounded-xl border-[1rem] border-brown-500 p-8"
        style={{ width: "fit-content" }}
      >
        <div className="grid grid-cols-5 gap-6">
          {niveaux.map((level) => (
            <div
              key={level.number}
              className="flex flex-col items-center"
              onClick={() => handleButtonClick(level)}
              style={{ cursor: level.unlocked ? "pointer" : "default" }}
            >
              {/* Étoiles */}
              <div className="flex mb-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <img
                    key={i}
                    src={i < level.stars ? GrandeEtoile : EtoileVide}
                    alt="star"
                    className="w-5 h-5 mx-[1px]"
                  />
                ))}
              </div>

              {/* Case niveau */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold font-[Fredoka] shadow-md"
                style={{
                  backgroundColor: level.unlocked ? level.color : "#d1d5db",
                }}
              >
                {level.unlocked ? (
                  level.number
                ) : (
                  <img src={LockIcon} alt="lock" className="w-5 h-5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tableau;
