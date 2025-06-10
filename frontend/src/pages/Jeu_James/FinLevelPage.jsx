import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarIcon from "../../assets/img/star.png";
import characterWinImage from "../../assets/img/james_le_hibou-heureux.webp";
import characterLoseImage from "../../assets/img/james_le_hibou_pleure.webp";
import lightImage from "../../assets/img/lumiere.png";
import ReturnButton from "../../components/button-return";
import SettingsButton from "../../components/button-settings";
import { useSound } from "../../contexts/SoundProvider";
import confettiAudio from "../../assets/sounds/james_sounds/win.mp3";
import trompetteAudio from "../../assets/sounds/james_sounds/lost.mp3";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";

const ScorePage = () => {
  const { level } = useParams(); // <-- récupération via l’URL
  const levelNumber = parseInt(level, 10) || 1;

  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(window.location.search);
  const stars = parseInt(queryParams.get("stars")) || 0;

  const isSuccess = stars >= 2;
  const [totalStars, setTotalStars] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const user = JSON.parse(localStorage.getItem("utilisateur"));

  const trompetteRef = useRef(null);
  const audioRef = useRef(null);
  const { musicOn } = useSound();

  useEffect(() => {
    if (isSuccess && musicOn) {
      audioRef.current = new Audio(confettiAudio);
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isSuccess, musicOn]);

  useEffect(() => {
    if (!isSuccess && musicOn) {
      trompetteRef.current = new Audio(trompetteAudio);
      trompetteRef.current.volume = 0.4;
      trompetteRef.current.play().catch(() => {});
    }
    return () => {
      if (trompetteRef.current) {
        trompetteRef.current.pause();
        trompetteRef.current.currentTime = 0;
      }
    };
  }, [isSuccess, musicOn]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("utilisateur"));

    const saveScore = async () => {
      if (!storedUser || !storedUser._id) return;
      await fetch("http://localhost:8008/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedUser._id,
          gameName: "James",
          level: levelNumber,
          stars,
        }),
      });
    };

    const fetchTotalStars = async () => {
      if (!storedUser || !storedUser._id) return;
      const res = await fetch(
        `http://localhost:8008/api/scores/${storedUser._id}?gameName=James`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        const maxStarsByLevel = {};
        data.forEach((entry) => {
          const lvl = entry.level;
          if (!maxStarsByLevel[lvl] || entry.stars > maxStarsByLevel[lvl]) {
            maxStarsByLevel[lvl] = entry.stars;
          }
        });
        const total = Object.values(maxStarsByLevel).reduce(
          (sum, s) => sum + s,
          0
        );
        setTotalStars(total);
      }
    };

    const fetchLeaderboard = async () => {
      const res = await fetch(
        "http://localhost:8008/api/scores/leaderboard?gameName=James"
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setLeaderboard(data);
        if (storedUser && storedUser._id) {
          const rank = data.findIndex(
            (entry) => entry.userId === storedUser._id
          );
          if (rank !== -1) setUserRank(rank + 1);
        }
      }
    };

    const runAll = async () => {
      if (storedUser && storedUser._id) {
        await saveScore();
        await fetchTotalStars();
      }
      await fetchLeaderboard();
    };

    runAll();
  }, [levelNumber, stars]);

  const handleReplay = () => navigate(`/jeuxJames/game/${levelNumber}`);
  const handleNext = () => navigate(`/jeuxJames/game/${levelNumber + 1}`);
  const handleHome = () => navigate("/jeuxJames/tableau");

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center pt-28 xl:pt-0 ${
        isSuccess ? "bg-[#65B76E]" : "bg-[#ff95ac]"
      }`}
    >
      <div className="absolute top-6 left-4">
        <ReturnButton />
      </div>
      <div className="absolute top-6 right-4 z-50">
        <SettingsButton />
      </div>

      <div className="flex justify-center gap-3 mb-4">
        {[...Array(3)].map((_, index) => (
          <img
            key={index}
            src={StarIcon}
            alt={t("stars")}
            className={`xl:w-[100px] xl:h-[100px] w-[50px] h-[50px] object-contain ${
              index < stars ? "opacity-100" : "opacity-20"
            } ${index === 1 ? "xl:-mt-10 -mt-4" : "mt-0"}`}
          />
        ))}
      </div>

      <p className="xl:text-2xl text-xl text-white mt-1">
        {t("levelWithNumber", { level: levelNumber })}
      </p>

      <h1 className="text-[60px] xl:text-[96px] font-extrabold text-white leading-none tracking-wide">
        {isSuccess ? t("congrats") : t("fail")}
      </h1>

      <div className="relative xl:w-[550px] xl:h-[250px] w-[350px] h-[150px] my-6">
        <img
          src={lightImage}
          alt={t("light")}
          className="absolute inset-0 w-full h-auto object-contain z-0"
        />
        <img
          src={isSuccess ? characterWinImage : characterLoseImage}
          alt={t("character")}
          className="relative w-full h-full object-contain z-10"
        />
      </div>

      <div className="px-6 py-2 rounded-[20px] w-fit flex items-center gap-2">
        <span className="text-white font-bold text-[25px]">
          {t("yourScore")}
        </span>
      </div>

      <div className="bg-black/30 px-8 py-3 rounded-[30px] mt-2 flex items-center gap-3 text-white font-extrabold text-3xl px-24 shadow-lg">
        <img src={StarIcon} alt="star" className="w-10 h-10 " />
        {stars}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleReplay}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-yellow-400 shadow-md border-2 border-white flex items-center justify-center text-white text-3xl sm:text-4xl hover:scale-105 transition"
        >
          <i className="fas fa-rotate-right"></i>
        </button>
        <button
          onClick={handleHome}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-sky-400 shadow-md border-2 border-white flex items-center justify-center text-white text-3xl sm:text-4xl hover:scale-105 transition"
        >
          <i className="fas fa-house"></i>
        </button>
        {isSuccess && (
          <button
            onClick={handleNext}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-lime-500 shadow-md border-2 border-white flex items-center justify-center text-white text-3xl sm:text-4xl hover:scale-105 transition"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        )}
      </div>

      <div className="w-full flex justify-center mt-20 px-4 xl:absolute xl:left-32 xl:top-1/2 xl:-translate-y-1/2 xl:w-auto xl:mt-0 xl:px-0 pb-20 xl:pb-0">
        <div className="bg-[#AB673B] rounded-[20px] p-6 shadow-lg w-[320px]">
          <div className="bg-[#cb935a] rounded-[20px] py-16 px-6">
            <ul className="space-y-4">
              {leaderboard.slice(0, 3).map((entry, index) => (
                <li
                  key={entry.userId}
                  className="flex items-center justify-between rounded-xl px-3 py-2 shadow-sm"
                >
                  <span className="text-xl font-extrabold text-white drop-shadow-md">
                    {index + 1}
                  </span>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-lg bg-white shadow-md overflow-hidden flex items-center justify-center">
                      <img
                        src={entry.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs mt-1 text-gray-700 font-semibold">
                      {entry.prenom}
                    </span>
                  </div>
                  <span className="text-right text-lg font-extrabold text-white">
                    {entry.totalStars} ⭐
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;