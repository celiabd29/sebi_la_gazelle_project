import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // Pour récupérer les niveaux et naviguer
import characterImage from "../../assets/img/drys_lecureuil.webp";
import gobletImage from "../../assets/img/goblet.png";
import ballImage from "../../assets/img/balle.webp";
import backgroundImage from "../../assets/img/table-drys.jpg";
import ReturnButton from "../../components/button-return";
import LanguageButton from "../../components/LanguageSwitcher";
import StarIcon from "../../assets/img/myrtille.png"; // ou le chemin correct


const GameBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const level = parseInt(queryParams.get("level"), 10) || 1; // Par défaut, niveau 1

  // Paramètres dynamiques basés sur le niveau
  const numberOfShuffles = 6; // Augmente les mélanges avec le niveau
  const shuffleSpeed = 1000 - Math.min(level * 100, 1500); // Plus long au début (max 2s par mélange)
  const initialTime = 60 - Math.min(level * 2, 40); // Temps plus long au début (min 20s)

  const [ballPosition, setBallPosition] = useState(1); // Position initiale de la balle
  const [isShuffling, setIsShuffling] = useState(false); // Si les gobelets sont en train de mélanger
  const [gameOver, setGameOver] = useState(false); // Si le jeu est terminé
  const [gameStarted, setGameStarted] = useState(false); // Si le jeu a commencé
  const [timeLeft, setTimeLeft] = useState(initialTime); // Temps restant
  const [cupPositions, setCupPositions] = useState([0, 1, 2]); // Positions logiques des gobelets
  const [ballVisible, setBallVisible] = useState(true); // Visibilité de la balle

  const timerRef = useRef(null); // ← AJOUTE ÇA ICI ✅

  const user = JSON.parse(localStorage.getItem("user")); // ou adapte selon ton auth
  const isLoggedIn = !!user;


  // Génère les mouvements pour mélanger les gobelets
  const generateMovePatterns = () => {
    const patterns = [];
    for (let i = 0; i < numberOfShuffles; i++) {
      let first = Math.floor(Math.random() * 3);
      let second;
      do {
        second = Math.floor(Math.random() * 3);
      } while (second === first);
      patterns.push([first, second]);
    }
    return patterns;
  };

  // Mélange les gobelets
  const shuffleCups = () => {
    setIsShuffling(true);
    setBallVisible(false); // Cache la balle avant le mélange

    const movePattern = generateMovePatterns();
    movePattern.forEach((pattern, index) => {
      setTimeout(() => {
        setCupPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          const [first, second] = pattern;
          [newPositions[first], newPositions[second]] = [
            newPositions[second],
            newPositions[first],
          ];
          return newPositions;
        });

        if (index === movePattern.length - 1) {
          setTimeout(() => {
            setIsShuffling(false); // Mélange terminé
          }, shuffleSpeed);
        }
      }, index * shuffleSpeed);
    });
  };

  const [triesLeft, setTriesLeft] = useState(3);

  const handleCupClick = (index) => {
    if (isShuffling || gameOver) return;
  
    if (cupPositions[index] === ballPosition) {
      const stars = triesLeft;
      const score = stars * 15;

     if (isLoggedIn && stars > 0) {
        console.log("👤 Enregistrement pour user :", user);
        fetch("http://localhost:8008/api/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user._id, // ✅ CORRECTION ICI
            gameName: "Drys",
            level,
            stars,
            score
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("✅ Score bien enregistré :", data);
          })
          .catch((err) => {
            console.error("❌ Erreur enregistrement score :", err);
          });
      }else {
        // invité = stockage local uniquement
        const guestScores = JSON.parse(localStorage.getItem("guestScores") || "{}");
        guestScores[level] = stars;
        localStorage.setItem("guestScores", JSON.stringify(guestScores));
      }

      alert(`Bravo ! Vous avez gagné ${stars} étoile(s) !`);
      navigate(`/jeuxDrys/ScorePage?level=${level}&stars=${stars}&score=${score}`);

    } else {
      if (triesLeft > 1) {
        setTriesLeft((prev) => prev - 1);
        alert(`Mauvais gobelet ! Il vous reste ${triesLeft - 1} essai(s).`);
      } else {
        alert("Dommage ! Vous avez perdu !");
        navigate(`/ScorePage?level=${level}&stars=0&score=0`);
      }
    }
  };
  


  // Démarre le jeu
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setBallPosition(Math.floor(Math.random() * 3)); // Place la balle sous un gobelet aléatoire
    setTimeLeft(initialTime);

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          alert("Temps écoulé !");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    shuffleCups();
  };

  // Réinitialise le jeu
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setTimeLeft(initialTime);
    setBallVisible(true); // La balle est visible au début
  };

  


  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex justify-between p-4">
        <ReturnButton />
        <LanguageButton />
      </div>

      <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 w-96">
        <img src={characterImage} alt="Character" className="w-full h-full object-contain" />
      </div>

      <div className="absolute w-[600px] h-[286px] left-1/2 transform -translate-x-1/2 bottom-20 flex justify-between">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="relative w-[150px] h-[200px] cursor-pointer"
            onClick={() => handleCupClick(index)}
            animate={{
              x: cupPositions[index] * 200 - 200,
            }}
            
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <img
              src={gobletImage}
              alt={`Goblet ${index + 1}`}
              className="w-64 h-64 object-cover"
            />
            {cupPositions[index] === ballPosition && (
              <motion.div
                className="absolute w-[80px] h-[80px] top-[180px] left-1/2 transform -translate-x-1/2"
                animate={{ opacity: ballVisible ? 1 : 0 }} // Gère la visibilité de la balle
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={ballImage} alt="Ball" className="w-full h-full object-contain" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {gameStarted && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded">
          Niveau : {level} | Temps restant : {timeLeft} s
        </div>
      )}

      {!gameStarted && !gameOver && (
        <button
          className="absolute top-20 left-1/2 transform -translate-x-1/2 py-4 px-20 bg-yellow-900 text-white text-lg rounded-lg shadow-lg hover:bg-yellow-950 transition duration-300"
          onClick={startGame}
        >
          Commencer
        </button>
      )}

      {gameOver && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            className="py-4 px-10 bg-red-600 text-white text-lg rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
            onClick={resetGame}
          >
            Recommencer
          </button>
          <button
            className="py-4 px-10 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            onClick={() => navigate("/PalierPage")}
          >
            Quitter
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
