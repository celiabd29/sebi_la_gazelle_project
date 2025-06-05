import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsButton from "../../components/button-settings";
import ReturnButton from "../../components/button-return";
import backgroundImage from "../../assets/img/backgroundJames.png"; // adapte le nom si besoin
import { motion } from "framer-motion";
import gameStartAudio from "../../assets/sounds/james_sounds/game_song.m4a";
import warningAudio from "../../assets/sounds/drys_sounds/time_play.m4a";
import sebiImage from "../../assets/img/tete-seb.png";
import { useSound } from "../../contexts/SoundProvider";




function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOperations(level) {
  let operators = ["+"];
  let max = 10;

  switch (level) {
    case 1:
      operators = ["+"];
      max = 10;
      break;
    case 2:
      operators = ["+", "-"];
      max = 20;
      break;
    case 3:
      operators = ["×"];
      max = 10;
      break;
    case 4:
      operators = ["÷"];
      max = 10;
      break;
    case 5:
      operators = ["+", "-", "×", "÷"];
      max = 20;
      break;
    default:
      operators = ["+"];
  }

  const operations = [];
  let attempts = 0;

  while (operations.length < 3 && attempts < 1000) {
    attempts++;
    const left = getRandomInt(1, max);
    const right = getRandomInt(1, max);
    const operator = operators[getRandomInt(0, operators.length - 1)];

    let answer;
    switch (operator) {
      case "+":
        answer = left + right;
        break;
      case "-":
        if (left < right) continue;
        answer = left - right;
        break;
      case "×":
        answer = left * right;
        break;
      case "÷":
        if (right === 0 || left % right !== 0 || left / right > 10) continue;
        answer = left / right;
        break;
      default:
        continue;
    }

    operations.push({ left, right, operator, answer });
  }

  return operations;
}

const GamePage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const levelNumber = parseInt(level, 10) || 1;

  const [operations, setOperations] = useState([]);
  const [answers, setAnswers] = useState(Array(3).fill(""));
  const [score, setScore] = useState(null);
  const [validated, setValidated] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [showSebi, setShowSebi] = useState(false);
  const warningTimeoutRef = useRef(null);
  const audioRef = useRef(null);

  const { soundOn, musicOn } = useSound();





  useEffect(() => {
    setOperations(generateOperations(levelNumber));
    setAnswers(Array(3).fill(""));
    setValidated(false);
    setScore(null);
    setTimeLeft(60);
    setGameStarted(false);
  }, [levelNumber]);


  const startGame = () => {
    setGameStarted(true);
    setValidated(false);
    setTimeLeft(60);

    // Son de démarrage
    if (soundOn) {
      const gameAudio = new Audio(gameStartAudio);
      audioRef.current = gameAudio;
      gameAudio.play().catch(() => console.log("❌ autoplay bloqué"));
    }


    // Affiche Sebi pendant le son de démarrage
    setShowSebi(true);
    setTimeout(() => {
      setShowSebi(false);
    }, 4000); // il disparaît après 4 secondes (tu peux ajuster)

    // Son d’avertissement après 30 sec
    warningTimeoutRef.current = setTimeout(() => {
      if (soundOn) {
        const warn = new Audio(warningAudio);
        warn.play();
      }


      // Réaffiche Sebi pendant l'avertissement
      setShowSebi(true);
      setTimeout(() => {
        setShowSebi(false);
      }, 4000); // pareil, durée affichage
    }, 30000);

    // Timer de 60s
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          clearTimeout(warningTimeoutRef.current);
          setValidated(true);
          navigate(`/jeuxJames/fin/${levelNumber}?score=0&stars=0&fail=true`);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    useEffect(() => {
      setOperations(generateOperations(levelNumber));
      setAnswers(Array(3).fill(""));
      setValidated(false);
      setScore(null);
      setTimeLeft(60);
      setGameStarted(false);
    }, [levelNumber]);

    // 🔽 ICI
    useEffect(() => {
      return () => {
        clearInterval(timerRef.current);
        clearTimeout(warningTimeoutRef.current);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, []);


  };




  const getProgressColor = (timeLeft) => {
    if (timeLeft > 19) return "#22c55e"; // vert
    if (timeLeft > 9) return "#f97316"; // orange
    return "#ef4444"; // rouge
  };

  const handleChange = (e, i) => {
    const updated = [...answers];
    updated[i] = e.target.value;
    setAnswers(updated);
  };

  const handleValidation = () => {
    clearInterval(timerRef.current); // stop timer quand on valide
    clearTimeout(warningTimeoutRef.current);


    let newScore = 0;
    answers.forEach((ans, index) => {
      if (parseInt(ans) === operations[index].answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setValidated(true);

    const stars = newScore; // 1 bonne réponse = 1 étoile
    const fail = stars <= 1;

    if (isLoggedIn && stars > 0) {
      fetch("http://localhost:8008/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          gameName: "James",
          level: levelNumber,
          stars,
          score: newScore * 10
        }),
      }).catch((err) => {
        console.error("❌ Erreur enregistrement score :", err);
      });
    } else {
      const guestScores = JSON.parse(localStorage.getItem("guestScores_James") || "{}");
      guestScores[levelNumber] = stars;
      localStorage.setItem("guestScores_James", JSON.stringify(guestScores));
    }

    navigate(`/jeuxJames/fin/${levelNumber}?score=${newScore}&stars=${stars}&fail=${fail}`);
  };

  if (operations.length === 0) return <p>{t("loading")}</p>;



    
  

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-center p-4 font-[Fredoka]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <SettingsButton />

      <div className="flex justify-between p-4">
        <div className="absolute top-4 left-4">
          <ReturnButton />
        </div> 
      </div>

      {showSebi && (
        <motion.img
          src={sebiImage}
          alt="Sebi"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="xl:w-[450px] absolute xl:top-44 xl:left-[-130px] z-50 w-[200px] top-32 left-[-70px] md:w-[300px] md:top-40 md:left-[-100px] sm:w-[250px] sm:top-36 sm:left-[-90px] mobile:w-[150px] mobile:top-32 mobile:left-[-50px]"
        />
      )}


      <div className="flex flex-col items-center gap-4 mt-10 absolute top-12 left-1/2 transform -translate-x-1/2">
        <div className="text-white xl:text-4xl md:text-3xl text-2xl font-extrabold">
          {t("level")} {levelNumber}
        </div>

        {!gameStarted ? (
          <button
            onClick={startGame}
            className="text-white xl:text-3xl xl:w-52 xl:h-20 md:text-2xl md:w-40 md:h-16 sm:text-xl sm:w-32 sm:h-12 w-32 text-xl h-16 bg-green-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-green-700 transition duration-300"
          >
            Commencer
          </button>
        ) : (
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
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
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="text-white font-bold text-xl z-10">
              {`${Math.floor(timeLeft / 60).toString().padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`}
            </span>
          </div>


        )}
      </div>




      <div className="flex flex-wrap justify-center items-start gap-10 mb-10 w-full px-4 max-w-6xl mt-24">
        {operations.map((op, i) => {
          const isCorrect = parseInt(answers[i]) === op.answer;
          return (
            <div
              key={i}
              className="w-full flex justify-center items-center gap-3 flex-wrap sm:flex-nowrap mb-6"
            >


              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-4 border-blue-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold shadow-md"
>
                {op.left}
              </div>
              <div className="text-lg sm:text-xl font-bold">{op.operator}</div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-4 border-blue-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold shadow-md"
>
                {op.right}
              </div>
              <div className="text-lg sm:text-xl font-bold">=</div>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(e, i)}
                disabled={validated}
               className={`w-16 h-16 sm:w-20 sm:h-20 text-center border-4 rounded-xl text-2xl sm:text-3xl font-extrabold shadow-md


                  ${
                    validated
                      ? isCorrect
                        ? "border-green-500 bg-green-100"
                        : "border-red-500 bg-red-100"
                      : "border-blue-400"
                  }`}
              />
            </div>
          );
        })}
      </div>

    

      {gameStarted && !validated && (
  <button
    onClick={handleValidation}
    className="text-white xl:text-3xl xl:w-52 xl:h-20 md:text-2xl md:w-40 md:h-16 sm:text-xl sm:w-32 sm:h-12 w-32 text-xl h-16 bg-green-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-green-700 transition duration-300 mt-10"
  >
    {t("validate")}
  </button>
)}

    </div>
  );
};

export default GamePage;
