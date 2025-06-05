import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // Pour récupérer les niveaux et naviguer
import characterImage from "../../assets/img/drys_lecureuil.webp";
import gobletImage from "../../assets/img/goblet.png";
import ballImage from "../../assets/img/balle.webp";
import backgroundImage from "../../assets/img/table-drys.png";
import ReturnButton from "../../components/button-return";
import LanguageButton from "../../components/LanguageSwitcher";
import StarIcon from "../../assets/img/myrtille.png"; // ou le chemin correc
import SettingsButton from "../../components/button-settings"; // Bouton pour les paramètres
import commencerAudio from "../../assets/sounds/drys_sounds/commencer.m4a";
import raterAudio from "../../assets/sounds/drys_sounds/rater_drys.m4a";
import sebiImg from "../../assets/img/sebi_droite.png";
import sebiTete from "../../assets/img/tete-seb.png"; // Image de Sebi pour le jeu
import { useSound } from "../../contexts/SoundProvider"; // Contexte pour gérer le son
import timeAudio from "../../assets/sounds/drys_sounds/time_play.m4a"; // Son de fin de temps





const GameBoard = () => {
  const { soundOn } = useSound(); // ✅ récupère l'état de la voix
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const level = parseInt(queryParams.get("level"), 10) || 1; // Par défaut, niveau 1

  // Paramètres dynamiques basés sur le niveau
  const numberOfShuffles = 6; // Augmente les mélanges avec le niveau
  const shuffleSpeed = 1000 - Math.min(level * 100, 1500); // Plus long au début (max 2s par mélange)
  const initialTime = 60;

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

  const [sebiVisible, setSebiVisible] = useState(false);

  const [triggeredWarnings, setTriggeredWarnings] = useState(0);



  const getProgressColor = (timeLeft) => {
    if (timeLeft > 39) return "#22c55e"; // vert
    if (timeLeft > 19) return "#f97316"; // orange
    return "#ef4444"; // rouge
  };

const showSebi = (duration = 4300) => {
  setSebiVisible(true);
  setTimeout(() => {
    setSebiVisible(false);
  }, duration);
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

  const isCorrect = cupPositions[index] === ballPosition;

  if (isCorrect) {
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
    // Cas : mauvaise réponse
    if (triesLeft > 1) {
      setTriesLeft((prev) => prev - 1);

      if (soundOn) {
        const raterSound = new Audio(raterAudio);
        raterSound.play();
      }


      setShowWrongMessage(true);
      showSebi(); // ✅ ici

      setBallVisible(true);

      setTimeout(() => {
        setShowWrongMessage(false);
        setBallVisible(false);
        shuffleCups();
      }, 2000);
    }else {
      // Dernier essai = pas de son
      navigate(`/jeuxDrys/ScorePage?level=${level}&stars=0&score=0`);
    }
  }
};

  


const startGame = () => {
  if (soundOn) {
    const audio = new Audio(commencerAudio);
    audio.play();
  }

  showSebi();

  setGameStarted(true);
  setGameOver(false);
  setBallPosition(Math.floor(Math.random() * 3));
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

  useEffect(() => {
    if (!gameStarted) return;

    if (timeLeft === 30 && triggeredWarnings === 0) {
      if (soundOn) {
        const warnAudio = new Audio(timeAudio);
        warnAudio.play().catch((err) => {
          console.error("⚠️ Son ne s’est pas lancé :", err);
        });
      }

      showSebi();
      setTriggeredWarnings(1); // Pour ne pas le rejouer
    }
  }, [timeLeft, soundOn, triggeredWarnings, gameStarted]);


 return (
  <div
    className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat relative font-[Fredoka]"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute top-6 left-4">
      <ReturnButton />
    </div>
    <div className="absolute top-6 right-4 z-50">
      <SettingsButton />
    </div>

    {sebiVisible && (
      <motion.img
        src={sebiTete}
        alt="Sebi"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="xl:w-[450px] absolute xl:top-44 xl:left-[-130px] z-50 w-[200px] top-32 left-[-70px] md:w-[300px] md:top-40 md:left-[-100px] sm:w-[250px] sm:top-36 sm:left-[-90px] mobile:w-[150px] mobile:top-32 mobile:left-[-50px]"
        style={{ transform: "rotate(-45deg)" }} // ✅ flip horizontal
      />
    )}

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
            strokeDashoffset={(1 - timeLeft / 60) * 282.6}
            strokeLinecap="round"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="14"
            fill="#fff"
            transform="rotate(90 50 50)"
            className="font-bold text-xl z-10"
          >
            {`${Math.floor(timeLeft / 60).toString().padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`}
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
