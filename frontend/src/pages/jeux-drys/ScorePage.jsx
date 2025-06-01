import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from "../../assets/img/myrtille.png";
import characterWinImage from "../../assets/img/drys_win.png";
import characterLoseImage from "../../assets/img/drys_lose.png";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const stars = parseInt(queryParams.get("stars")) || 0;
  const level = parseInt(queryParams.get("level")) || 1;
  const score = parseInt(queryParams.get("score")) || 0;

  const isSuccess = stars >= 2;

  const [totalStars, setTotalStars] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  console.log("👤 Utilisateur :", user);

  const [userRank, setUserRank] = useState(null);




 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("utilisateur"));
  if (!storedUser || !storedUser._id) {
    console.warn("❌ Aucun utilisateur ou _id invalide.");
    return;
  }

  const saveScore = async () => {
    try {
      const res = await fetch("http://localhost:8008/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedUser._id,
          gameName: "Drys",
          level,
          stars
        }),
      });
      const data = await res.json();
      console.log("✅ Score enregistré :", data);
      return data;
    } catch (err) {
      console.error("❌ Erreur enregistrement score :", err);
    }
  };

  const fetchTotalStars = async () => {
  try {
    const res = await fetch(`http://localhost:8008/api/scores/${storedUser._id}?gameName=Drys`);
    const data = await res.json();
    console.log("⭐ Données brutes des scores récupérés :", data); // Ajout ici

    if (Array.isArray(data)) {
      const maxStarsByLevel = {};
      data.forEach((entry) => {
        const level = entry.level;
        if (!maxStarsByLevel[level] || entry.stars > maxStarsByLevel[level]) {
          maxStarsByLevel[level] = entry.stars;
        }
      });
      const total = Object.values(maxStarsByLevel).reduce((sum, stars) => sum + stars, 0);
      setTotalStars(total);
    } else {
      setTotalStars(0);
    }
  } catch (err) {
    console.error("❌ Erreur récupération scores :", err);
  }
};


  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`http://localhost:8008/api/scores/leaderboard?gameName=Drys`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setLeaderboard(data);
        const foundIndex = data.findIndex((entry) => entry.userId?.toString() === user._id);
        if (foundIndex !== -1) {
          setUserRank(foundIndex + 1);
        }
      } else {
        console.warn("⚠️ La donnée leaderboard n’est pas un tableau :", data);
        setLeaderboard([]);
      }
    } catch (err) {
      console.error("❌ Erreur leaderboard :", err);
    }
  };

  const runAll = async () => {
    await saveScore();
    await fetchTotalStars();
    await fetchLeaderboard();
  };

  runAll();
}, []);





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
      {/* Retour */}
      <div className="absolute top-4 left-4">
        <button onClick={handleHome} className="text-3xl">←</button>
      </div>

      {/* Classement */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">🏆 Classement</h2>
        <ul className="mb-2">
          {leaderboard.map((entry, index) => (
            <li key={entry.userId} className="flex items-center gap-2 my-2">
              <span>{index + 1}.</span>
              <img src={entry.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
              <span>{entry.prenom}</span>
              <span className="ml-auto">{entry.totalStars} ⭐</span>
            </li>
          ))}
        </ul>

        <p className="mt-2 text-sm text-gray-600">
          🧍‍♀️ {userRank
            ? <>Tu es classé(e) <strong>#{userRank}</strong> avec <strong>{totalStars}</strong> étoiles</>
            : <>Tu n’es pas encore dans le top 3, mais tu as <strong>{totalStars}</strong> étoiles</>}
        </p>

      </div>

      {/* Étoiles du niveau */}
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

      {/* Bravo / Échec */}
      <h1 className={`text-4xl font-bold ${isSuccess ? "text-green-800" : "text-red-800"}`}>
        {isSuccess ? "Bravo !" : "Oh non..."}
      </h1>
      <p className="text-xl text-gray-700 mt-2">Niveau {level}</p>

      {/* Image personnage */}
      <img
        src={isSuccess ? characterWinImage : characterLoseImage}
        alt="Personnage"
        className="w-48 h-48 my-4"
      />

      {/* Score brut */}
      <div className="bg-white text-gray-800 px-6 py-2 rounded-lg shadow-md text-lg mb-2">
        TON SCORE : <span className="font-bold">{score}</span>
      </div>

      {/* Total étoiles */}
      <div className="text-lg mb-6 text-gray-800">
        Total d'étoiles cumulées : <span className="font-bold">{totalStars}</span>
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
