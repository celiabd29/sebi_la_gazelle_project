import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LanguageButton from "../../components/LanguageSwitcher";
import ArbreImage from "../../assets/img/arbre.png";
import PommeImage from "../../assets/img/pomme.webp";
import OrangeImage from "../../assets/img/orange.png";
import MyrtilleImage from "../../assets/img/myrtille.png";
import background from "../../assets/img/fond-drys-palier.png";

const PalierPage = () => {
  const navigate = useNavigate();
  const [fallingFruits, setFallingFruits] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("utilisateur"));

    if (!user || !user._id) {
      // Utilisateur non connecté : 0 étoile et tous les niveaux débloqués
      setLevels([
        { level: 1, stars: 0, unlocked: true },
        { level: 2, stars: 0, unlocked: true },
        { level: 3, stars: 0, unlocked: true },
        { level: 4, stars: 0, unlocked: true },
        { level: 5, stars: 0, unlocked: true },
      ]);
      return;
    }

    // Utilisateur connecté → on récupère les vrais scores
    fetch(`http://localhost:8008/api/scores/${user._id}?gameName=Drys`)
      .then((res) => res.json())
      .then((data) => {
        const newLevels = [];
        for (let i = 1; i <= 5; i++) {
          const score = data.find((d) => d.level === i);
          const stars = score?.stars || 0;
          const unlocked =
            i === 1 || (data.find((d) => d.level === i - 1)?.stars >= 1);
          newLevels.push({ level: i, stars, unlocked });
        }
        setLevels(newLevels);
      });
  }, []);

  const fruits = [
    { id: 1, type: "pomme", positionX: "45%", positionY: "18%" },
    { id: 2, type: "orange", positionX: "40%", positionY: "26%" },
    { id: 3, type: "myrtille", positionX: "50%", positionY: "26%" },
    { id: 4, type: "orange", positionX: "43%", positionY: "34%" },
    { id: 5, type: "myrtille", positionX: "48%", positionY: "34%" },
  ];

  const handleClick = (id) => {
    setFallingFruits((prev) => [...prev, id]);
    setTimeout(() => {
      navigate(`/jeuxDrys/GamePage?level=${id}`);
    }, 500);
  };

  const getStarIcons = (count) => {
    const icons = [];
    for (let i = 1; i <= 3; i++) {
      icons.push(
        <i
          key={i}
          className={`fas fa-star ${
            i <= count ? "text-yellow-400" : "text-gray-300"
          } text-sm mx-0.5`}
        ></i>
      );
    }
    return icons;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        <LanguageButton />

        <div className="hidden sm:flex justify-center relative w-full mt-30">
          <img
            src={ArbreImage}
            alt="Arbre"
            className="w-[45rem] h-auto object-contain"
          />

          {fruits.map((fruit) => {
            const levelData = levels.find((lvl) => lvl.level === fruit.id);
            const isUnlocked = levelData?.unlocked ?? true;
            const starCount = levelData?.stars || 0;

            return (
              <motion.div
                key={fruit.id}
                className={`absolute flex flex-col items-center ${
                  isUnlocked
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                style={{
                  left: fruit.positionX,
                  top: fruit.positionY,
                }}
                onClick={() => {
                  if (isUnlocked) handleClick(fruit.id);
                }}
                animate={
                  fallingFruits.includes(fruit.id)
                    ? {
                        y: "100vh",
                        opacity: 0,
                        transition: { duration: 1, ease: "easeIn" },
                      }
                    : {}
                }
              >
                {/* Étoiles dynamiques */}
                <div className="absolute top-12 flex items-center z-10">
                  {getStarIcons(starCount)}
                </div>

                <motion.div className="relative">
                  <motion.img
                    src={
                      fruit.type === "pomme"
                        ? PommeImage
                        : fruit.type === "orange"
                        ? OrangeImage
                        : MyrtilleImage
                    }
                    alt={fruit.type}
                    className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px]"
                    whileHover={
                      isUnlocked
                        ? {
                            x: ["0%", "-15%", "15%", "0%"],
                            transition: {
                              duration: 1,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut",
                            },
                          }
                        : {}
                    }
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {isUnlocked ? fruit.id : "🔒"}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PalierPage;
