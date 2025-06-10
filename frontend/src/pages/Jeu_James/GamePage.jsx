import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsButton from "../../components/button-settings";
import ReturnButton from "../../components/button-return";
import backgroundImage from "../../assets/img/backgroundJames.png";
import { motion } from "framer-motion";
import gameStartAudio from "../../assets/sounds/james_sounds/game_song.m4a";
import warningAudio from "../../assets/sounds/drys_sounds/time_play.m4a";
import sebiImage from "../../assets/img/tete-seb.png";
import { useSound } from "../../contexts/SoundProvider";
import gameStartAudioEn from "../../assets/sounds/james_sounds/anglais/game_sound.m4a";
import warningAudioEn from "../../assets/sounds/james_sounds/anglais/time_play.m4a";
import i18n from "../../i18n";


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
  const warningTimeoutRef = useRef(null);
  const playingAudiosRef = useRef([]);
  const [showSebi, setShowSebi] = useState(false);

  const { soundOn } = useSound();

  const [showReward, setShowReward] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [generationId, setGenerationId] = useState(null);






  useEffect(() => {
    setOperations(generateOperations(levelNumber));
    setAnswers(Array(3).fill(""));
    setValidated(false);
    setScore(null);
    setTimeLeft(60);

   if (soundOn) {
      const gameAudio = new Audio(i18n.language === "fr" ? gameStartAudio : gameStartAudioEn);
      gameAudio.loop = true;
      gameAudio.volume = 0.4;
      gameAudio.play().catch(() => console.log("❌ autoplay bloqué"));
      playingAudiosRef.current.push(gameAudio);
    }



    setShowSebi(true);
    setTimeout(() => setShowSebi(false), 4000);

    warningTimeoutRef.current = setTimeout(() => {
      if (soundOn) {
        const warn = new Audio(i18n.language === "fr" ? warningAudio : warningAudioEn);
        warn.play();
      }
      setShowSebi(true);
      setTimeout(() => setShowSebi(false), 4000);
    }, 30000);

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

    return () => {
        console.log("💥 Cleanup GamePage (James)");
      clearInterval(timerRef.current);
      clearTimeout(warningTimeoutRef.current);
      playingAudiosRef.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      playingAudiosRef.current = [];
    };
  }, [levelNumber]);

  const handleChange = (e, i) => {
    const updated = [...answers];
    updated[i] = e.target.value;
    setAnswers(updated);
  };

  const handleValidation = () => {
    clearInterval(timerRef.current);
    clearTimeout(warningTimeoutRef.current);

    let newScore = 0;
    answers.forEach((ans, index) => {
      if (parseInt(ans) === operations[index].answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setValidated(true);

    const stars = newScore;
    const fail = stars <= 1;

    if (isLoggedIn && stars > 0) {
      fetch("http://localhost:8008/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          gameName: "James",
          level: levelNumber,
          stars,
          score: newScore * 10,
        }),
      }).catch((err) => console.error("❌ Erreur enregistrement score :", err));
    } else {
      const guestScores = JSON.parse(
        localStorage.getItem("guestScores_James") || "{}"
      );
      guestScores[levelNumber] = stars;
      localStorage.setItem("guestScores_James", JSON.stringify(guestScores));
    }

    if (stars >= 2) {
      generateRewardImage(); // 💡 On lance la génération IA
    } else {
      navigate(
        `/jeuxJames/fin/${levelNumber}?score=${newScore}&stars=${stars}&fail=${fail}`
      );
    }

  };

  const generateRewardImage = async () => {
  setShowReward(true);
  setLoadingImage(true);

  const res = await fetch("http://localhost:8008/api/images/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      character: "James",
      game: "jeu de calcul",
    }),
  });

  const data = await res.json();
  const id = data.generationId;
  setGenerationId(id);

  const intervalId = setInterval(async () => {
    try {
      const res = await fetch(`http://localhost:8008/api/images/${id}`);
      const data = await res.json();

      if (data.imageUrl) {
        clearInterval(intervalId);
        setImageUrl(data.imageUrl);
        setImageReady(true);
        setLoadingImage(false);
      }
    } catch (err) {
      console.log("⏳ Image IA pas encore prête...");
    }
  }, 3000);
};


  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-center p-4 font-[Fredoka]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-4 right-4">
        <SettingsButton />
      </div>
      <div className="absolute top-4 left-4">
        <ReturnButton />
      </div>

      {/* Niveau en haut centré */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white xl:text-4xl md:text-3xl text-2xl font-extrabold mt-20">
        {t("level")} {levelNumber}
      </div>

      {/* Timer à droite, centré verticalement */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center justify-center mr-[10rem]">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#ddd"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={
                timeLeft > 19 ? "#22c55e" : timeLeft > 9 ? "#f97316" : "#ef4444"
              }
              strokeWidth="10"
              fill="none"
              strokeDasharray="282.6"
              strokeDashoffset={(1 - timeLeft / 60) * 282.6}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="text-white font-bold text-xl z-10">
            {`${Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}:${(timeLeft % 60)
              .toString()
              .padStart(2, "0")}`}
          </span>
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

      {/* Opérations */}
      <div className="flex flex-wrap justify-center items-start gap-10 mb-10 w-full px-4 max-w-6xl mt-24">
        {operations.map((op, i) => {
          const isCorrect = parseInt(answers[i]) === op.answer;
          return (
            <div
              key={i}
              className="w-full flex justify-center items-center gap-3 flex-wrap sm:flex-nowrap mb-6"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-4 border-blue-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold shadow-md">
                {op.left}
              </div>
              <div className="text-xl sm:text-3xl font-medium">
                {op.operator}
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-4 border-blue-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold shadow-md">
                {op.right}
              </div>
              <div className="text-xl sm:text-3xl font-medium">=</div>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(e, i)}
                disabled={validated}
                className={`w-16 h-16 sm:w-20 sm:h-20 text-center border-4 rounded-xl text-2xl sm:text-3xl font-extrabold shadow-md ${
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

      {!validated && (
        <button
          onClick={handleValidation}
          className="text-white xl:text-3xl xl:w-52 xl:h-20 md:text-2xl md:w-40 md:h-16 sm:text-xl sm:w-32 sm:h-12 w-32 text-xl h-16 bg-green-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-green-700 transition duration-300 mt-10"
        >
          {t("validate")}
        </button>
      )}

      {showReward && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          {loadingImage && (
            <div className="text-white text-xl text-center animate-pulse">
              {t("iaRewardLoading") || "Ta récompense magique arrive..."}
            </div>
          )}

          {imageReady && imageUrl && (
            <>
              <img
                src={imageUrl}
                alt="IA Reward"
                className="w-72 h-72 object-contain mb-4 rounded-lg shadow-lg"
              />
              <button
                onClick={() =>
                  navigate(
                    `/jeuxJames/fin/${levelNumber}?score=${score}&stars=${score}&fail=false`
                  )
                }
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                {t("continue") || "Continuer"}
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default GamePage;