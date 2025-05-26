import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from "../../assets/img/myrtille.png"; // ton image étoile
import characterWinImage from "../../assets/img/drys_win.png"; // ou ton image joyeuse
import characterLoseImage from "../../assets/img/drys_lose.png"; // ou ton image triste


const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const stars = parseInt(queryParams.get("stars")) || 0;
  const level = parseInt(queryParams.get("level")) || 1;
  const score = parseInt(queryParams.get("score")) || 0;

  const isSuccess = stars >= 2;

  const handleReplay = () => {
    navigate(`/GamePage?level=${level}`);
  };

  const handleNext = () => {
    navigate(`/GamePage?level=${level + 1}`);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center ${
        isSuccess ? "bg-green-100" : "bg-red-100"
      }`}
    >
      {/* Bouton retour en haut à gauche */}
      <div className="absolute top-4 left-4">
        <button onClick={handleHome} className="text-3xl">←</button>
      </div>

      {/* Étoiles */}
      <div className="flex justify-center gap-2 mb-4">
        {[...Array(3)].map((_, index) => (
          <img
            key={index}
            src={StarIcon}
            alt="étoile"
            className={`w-10 h-10 ${index < stars ? "opacity-100" : "opacity-20"}`}
          />
        ))}
      </div>

      {/* Titre */}
      <h1 className={`text-4xl font-bold ${isSuccess ? "text-green-800" : "text-red-800"}`}>
        {isSuccess ? "Bravo !" : "Oh non..."}
      </h1>
      <p className="text-xl text-gray-700 mt-2">Niveau {level}</p>

      {/* Personnage */}
      <img
        src={isSuccess ? characterWinImage : characterLoseImage}
        alt="Personnage"
        className="w-48 h-48 my-4"
        />

      {/* Score */}
      <div className="bg-white text-gray-800 px-6 py-2 rounded-lg shadow-md text-lg mb-6">
        TON SCORE : <span className="font-bold">{score}</span>
      </div>

      {/* Boutons */}
      <div className="flex gap-4">
        <button
          onClick={handleReplay}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full text-xl shadow"
        >
          🔁
        </button>
        <button
          onClick={handleHome}
          className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-xl shadow"
        >
          🏠
        </button>
        {isSuccess && (
          <button
            onClick={handleNext}
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-full text-xl shadow"
          >
            ➡️
          </button>
        )}
      </div>
    </div>
  );
};

export default ScorePage;
