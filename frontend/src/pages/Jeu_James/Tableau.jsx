import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../components/button-return";
import SettingsButton from "../../components/button-settings";
import GrandeEtoile from "../../assets/img/icons/star_big.svg";
import EtoileVide from "../../assets/img/icons/star_small.svg";
import LockIcon from "../../assets/img/icons/lock.png";

// Couleurs des cases de niveau
const rowColors = ["#94E7FC", "#F9C474", "#FF6D83"];

const niveaux = Array.from({ length: 5 }, (_, i) => ({
  number: i + 1,
  unlocked: i < 5, // 👈 À rendre dynamique selon progression
  stars: 3 - i > 0 ? 3 - i : 0,
  color: rowColors[i % rowColors.length],
}));

function Tableau() {
  const navigate = useNavigate();

  const handleClick = (level) => {
    if (level.unlocked) {
      navigate(`/jeuxJames/level/${level.number}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative px-4 py-8">
      {/* Boutons */}
      <div className="absolute top-6 left-4">
        <ReturnButton />
      </div>
      <div className="absolute top-6 right-4 z-50">
        <SettingsButton />
      </div>

      {/* Tableau */}
      <div
        className="bg-green-700 rounded-xl p-6 sm:p-10 shadow-lg w-full max-w-4xl"
        style={{ border: "16px solid #CE7F42" }}
      >
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-10 justify-center">
          {niveaux.map((level) => (
            <div
              key={level.number}
              onClick={() => handleClick(level)}
              className="flex flex-col items-center cursor-pointer"
            >
              {/* Étoiles */}
              <div className="flex mb-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <img
                    key={i}
                    src={i < level.stars ? GrandeEtoile : EtoileVide}
                    alt="star"
                    className="w-4 h-4 mx-[1px] sm:w-5 sm:h-5"
                  />
                ))}
              </div>

              {/* Case niveau */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-xl font-bold font-[Fredoka] shadow-md ${
                  level.unlocked ? "hover:scale-105 transition" : ""
                }`}
                style={{
                  backgroundColor: level.unlocked ? level.color : "#d1d5db",
                  color: level.unlocked ? "#000" : "#555",
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
