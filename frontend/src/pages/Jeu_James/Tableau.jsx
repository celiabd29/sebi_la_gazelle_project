import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../components/button-return";
import SettingsButton from "../../components/button-settings";
import StarIcon from "../../assets/img/star.png";
import LockIcon from "../../assets/img/icons/lock.png";
import backgroundImage from "../../assets/img/backgroundJames.png";

import sebiImage from "../../assets/img/sebi_gauche.png";
import palierVoice from "../../assets/sounds/james_sounds/palier_song.m4a";

import { motion } from "framer-motion";
import { useSound } from "../../contexts/SoundProvider";

const rowColors = ["#94E7FC", "#F9C474", "#FF6D83"];

function Tableau() {
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const { soundOn } = useSound();

  useEffect(() => {
    if (soundOn) {
      const voice = new Audio(palierVoice);
      voice.volume = 0.5;
      voice.play().catch(() => console.log("🔇 Lecture palier_song bloquée"));
    }
  }, [soundOn]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("utilisateur"));

    if (!user || !user._id) {
      setLevels(
        Array.from({ length: 5 }, (_, i) => ({
          number: i + 1,
          stars: 0,
          unlocked: true,
          color: rowColors[i % rowColors.length],
        }))
      );
      return;
    }

    fetch(`http://localhost:8008/api/scores/${user._id}?gameName=James`)
      .then((res) => res.json())
      .then((data) => {
        const newLevels = [];
        for (let i = 1; i <= 5; i++) {
          const score = data.find((d) => d.level === i);
          const stars = score?.stars || 0;
          const unlocked = i === 1 || (data.find((d) => d.level === i - 1)?.stars >= 1);
          newLevels.push({
            number: i,
            stars,
            unlocked,
            color: rowColors[(i - 1) % rowColors.length],
          });
        }
        setLevels(newLevels);
      });
  }, []);

  const handleClick = (level) => {
    if (level.unlocked) {
      navigate(`/jeuxJames/game/${level.number}`);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Sebi animé */}
      <motion.img
        src={sebiImage}
        alt="Sebi"
        initial={{ x: -300, opacity: 0, scale: 0.9 }}
        animate={{
          x: 0,
          opacity: 1,
          scale: [1, 1.1, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          ease: "easeOut",
        }}
        className="w-[300px] top-[65%] left-[-5%] xl:left-[30%] xl:top-[65%] xl:w-[400px] sm:w-[320px] sm:left-[5%] md:w-[360px] md:top-[62%] md:left-[15%]  absolute   transform -translate-x-1/2 -translate-y-1/2 object-contain z-50"
      />

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
          {levels.map((level) => (
            <div
              key={level.number}
              onClick={() => handleClick(level)}
              className={`flex flex-col items-center ${level.unlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
            >
              <div className="flex mb-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <img
                    key={i}
                    src={StarIcon}
                    alt="star"
                    className={`w-6 h-6 mx-0.5 ${i < level.stars ? "opacity-100" : "opacity-20"}`}
                  />
                ))}
              </div>

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
