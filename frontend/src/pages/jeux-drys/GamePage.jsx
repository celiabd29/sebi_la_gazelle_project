import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // Pour récupérer les niveaux et naviguer
import characterImage from "../../assets/img/drys_lecureuil.webp";
import gobletImage from "../../assets/img/goblet.png";
import ballImage from "../../assets/img/balle.webp";
import backgroundImage from "../../assets/img/table-drys.png";
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
  const [showWrongMessage, setShowWrongMessage] = useState(false);


  const getProgressColor = (timeLeft) => {
  if (timeLeft > 39) return "#22c55e"; // vert
  if (timeLeft > 19) return "#f97316"; // orange
  return "#ef4444"; // rouge
};



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
      fetch("http://localhost:8008/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          gameName: "Drys",
          level,
          stars,
          score
        }),
      }).catch((err) => {
        console.error("❌ Erreur enregistrement score :", err);
      });
    } else {
      const guestScores = JSON.parse(localStorage.getItem("guestScores") || "{}");
      guestScores[level] = stars;
      localStorage.setItem("guestScores", JSON.stringify(guestScores));
    }

    navigate(`/jeuxDrys/ScorePage?level=${level}&stars=${stars}&score=${score}`);
  } else {
    if (triesLeft > 1) {
      setTriesLeft((prev) => prev - 1);
      setShowWrongMessage(true);
      setBallVisible(true); // Montre la balle
      setTimeout(() => {
        setShowWrongMessage(false);
        setBallVisible(false); // Cache la balle après l’aperçu
        shuffleCups(); // Relance le mélange
      }, 2000);
    } else {
      navigate(`/jeuxDrys/ScorePage?level=${level}&stars=0&score=0`);
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
          navigate(`/jeuxDrys/ScorePage?level=${level}&stars=0&score=0`);
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

  const [cupOffset, setCupOffset] = useState(100); // Valeur mobile par défaut

useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1280) setCupOffset(200);     // xl
    else if (width >= 768) setCupOffset(175); // md
    else if (width >= 640) setCupOffset(140); // sm
    else setCupOffset(80);                   // mobile
  };

  handleResize(); // au chargement
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


 return (
  <div
    className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat relative font-[Fredoka]"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    {/* Top bar avec retour et langue */}
    <div className="flex justify-between p-4">
      <div className="absolute top-4 left-4">
        <ReturnButton />
      </div>
      <div className="absolute top-4 right-4">
        <LanguageButton />
      </div>
    </div>

    {/* Niveau + Timer */}
    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <div className="text-white xl:text-4xl md:text-3xl text-2xl font-extrabold mb-2">Niveau {level}</div>

      {/* Timer visible uniquement si le jeu est lancé */}
      {gameStarted && (
        <svg className="w-24 h-24 rotate-[-90deg]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={getProgressColor(timeLeft)}
            strokeWidth="10"
            fill="none"
            strokeDasharray="282.6"
            strokeDashoffset={(1 - timeLeft / initialTime) * 282.6}
            strokeLinecap="round"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="14"
            fill="#fff"
            className="rotate-[90deg]"
          >
            {timeLeft}s
          </text>
        </svg>
      )}
    </div>

    
    {/* <div className="absolute xl:bottom-64 left-1/2 transform -translate-x-1/2 xl:w-96 md:w-72 md:bottom-56 sm:w-60 sm:bottom-56 bottom-20 mobile:w-48 ">
      <img src={characterImage} alt="Character" className="w-full h-full object-contain" />
    </div> */}

    {/* Gobelets (remontés aussi) */}
    <div className="absolute  xl:w-[500px] xl:h-[266px] md:w-[350px]  sm:w-[250px] left-1/2 transform -translate-x-1/2 bottom-32 w-[200px] h-[133px] flex justify-between">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="relative w-[150px] h-[200px] cursor-pointer"
          onClick={() => handleCupClick(index)}
          animate={{
            x: cupPositions[index] * cupOffset - cupOffset
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
            className="xl:w-64 xl:h-64 md:w-52 md:h-52 sm:w-40 sm:h-40 w-32 h-32 object-cover"
          />
          {cupPositions[index] === ballPosition && (
            <motion.div
              className="absolute xl:w-[80px] xl:h-[80px] xl:top-[180px] md:w-16 md:h-16 md:top-12 sm:w-12 sm:h-12 sm:top-28 w-12 h-12 top-24 left-1/2 transform -translate-x-1/2"
              animate={{ opacity: ballVisible ? 1 : 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={ballImage} alt="Ball" className="w-full h-full object-contain" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Bouton "Commencer" toujours visible avant que le jeu démarre */}
    {!gameStarted && !gameOver && (
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
        <button
          className=" text-white xl:text-3xl xl:w-52 xl:h-20 md:text-2xl md:w-40 md:h-16 sm:text-xl sm:w-32 sm:h-12 w-32 text-xl h-16 bg-green-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-green-700 transition duration-300"
          onClick={startGame}
        >
          Commencer
        </button>
      </div>
    )}


    
    {showWrongMessage && (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white xl:text-3xl md:text-2xl text-xl px-8 py-4 rounded-xl shadow-lg z-50">
        Mauvaise réponse ! Réessaie...
      </div>
    )}

  </div>

);
};

export default GameBoard;
