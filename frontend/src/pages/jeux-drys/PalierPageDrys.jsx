import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LanguageButton from "../../components/LanguageSwitcher";
import ArbreImage from "../../assets/img/arbre.png";
import PommeImage from "../../assets/img/pomme.webp";
import OrangeImage from "../../assets/img/orange.png";
import MyrtilleImage from "../../assets/img/myrtille.png";
import StarIcon from "../../assets/img/star.png";
import background from "../../assets/img/fond-drys-palier.png";
import ReturnButton from "../../components/button-return";
import SettingsButton from "../../components/button-settings";
import sebiImgGauche from "../../assets/img/sebi_gauche.png";
import palierSound from "../../assets/sounds/drys_sounds/palier_drys.m4a";
import palierLoopSound from "../../assets/sounds/drys_sounds/palier_drys2.m4a";
import { useSound } from "../../contexts/SoundProvider";
import fruitClickSound from "../../assets/sounds/drys_sounds/fruit_click.mp3";




const PalierPage = () => {
  const { soundOn } = useSound();

  const navigate = useNavigate();
  const [fallingFruits, setFallingFruits] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("utilisateur"));

    if (!user || !user._id) {
      setLevels([
        { level: 1, stars: 0, unlocked: true },
        { level: 2, stars: 0, unlocked: true },
        { level: 3, stars: 0, unlocked: true },
        { level: 4, stars: 0, unlocked: true },
        { level: 5, stars: 0, unlocked: true },
      ]);
      return;
    }

    fetch(`http://localhost:8008/api/scores/${user._id}?gameName=Drys`)
      .then((res) => res.json())
      .then((data) => {
        const newLevels = [];
        for (let i = 1; i <= 5; i++) {
          const score = data.find((d) => d.level === i);
          const stars = score?.stars || 0;
          const unlocked = i === 1 || (data.find((d) => d.level === i - 1)?.stars >= 1);
          newLevels.push({ level: i, stars, unlocked });
        }
        setLevels(newLevels);
      });
  }, []);

  const handleClick = (id) => {
  const sound = new Audio(fruitClickSound);
  sound.volume = 0.6;
  sound.play().catch(() => {});
  
  setFallingFruits((prev) => [...prev, id]);
  setTimeout(() => {
    navigate(`/jeuxDrys/GamePage?level=${id}`);
  }, 500);
};


  useEffect(() => {
  if (!soundOn) return;

  const start = new Audio(palierSound);
  const loop = new Audio(palierLoopSound);
  start.volume = 0.4;
  loop.volume = 0.4;

  let loopInterval;
  let loopTimeout;

  start.play().catch(() => console.log("❌ son palier_drys bloqué"));

  loopTimeout = setTimeout(() => {
    loop.play().catch(() => console.log("❌ son drys_palier2 bloqué"));
    loopInterval = setInterval(() => {
      loop.currentTime = 0;
      loop.play().catch(() => {});
    }, 20000);
  }, 20000); // après 20 sec

  return () => {
    start.pause();
    loop.pause();
    start.currentTime = 0;
    loop.currentTime = 0;
    clearTimeout(loopTimeout);
    clearInterval(loopInterval);
  };
}, []);


  const fruits = [
    { id: 1, type: "pomme" },
    { id: 2, type: "orange" },
    { id: 3, type: "orange" },
    { id: 4, type: "myrtille" },
    { id: 5, type: "myrtille" },
  ];


  const getStarIcons = (count) => {
    return (
      <div className="flex justify-center gap-1">
        {Array.from({ length: 3 }, (_, i) => (
          <img
            key={i}
            src={StarIcon}
            alt="star"
            className={`w-5 h-5 ${i < count ? "opacity-100" : "opacity-20"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 left-4 z-50">
          <ReturnButton />
        </div>
        <div className="absolute top-6 right-4 z-50">
          <SettingsButton />
        </div>

        <div className="hidden md:flex justify-center relative w-full mt-30">
          <img
            src={ArbreImage}
            alt="Arbre"
            className="w-[45rem] h-auto object-contain"
          />

          {fruits.map((fruit, index) => {
            const positions = [
              { left: "48%", top: "18%" },
              { left: "40%", top: "26%" },
              { left: "56%", top: "26%" },
              { left: "44%", top: "36%" },
              { left: "52%", top: "36%" },
            ];
            const levelData = levels.find((lvl) => lvl.level === fruit.id);
            const isUnlocked = levelData?.unlocked ?? true;
            const starCount = levelData?.stars || 0;

            return (
              <motion.div
                key={fruit.id}
                className={`absolute flex flex-col items-center ${isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                style={{ left: positions[index].left, top: positions[index].top }}
                onClick={() => isUnlocked && handleClick(fruit.id)}
                animate={fallingFruits.includes(fruit.id) ? { y: "100vh", opacity: 0, transition: { duration: 1, ease: "easeIn" } } : {}}
              >
                <div className="absolute top-12 z-10">
                  {getStarIcons(starCount)}
                </div>

                <motion.div className="relative">
                  <motion.img
                    src={fruit.type === "pomme" ? PommeImage : fruit.type === "orange" ? OrangeImage : MyrtilleImage}
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
                    onMouseEnter={() => {
                      if (isUnlocked && soundOn) {
                        const hoverSound = new Audio(fruitHoverSound);
                        hoverSound.volume = 0.4;
                        hoverSound.play().catch(() => {});
                      }
                    }}
                  />

                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {isUnlocked ? fruit.id : "🔒"}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Version mobile */}
        <div className="md:hidden mt-8 p-6 bg-white/70 rounded-xl backdrop-blur-md flex flex-col items-center gap-8">
          {fruits.map((fruit) => {
            const levelData = levels.find((lvl) => lvl.level === fruit.id);
            const isUnlocked = levelData?.unlocked ?? true;
            const starCount = levelData?.stars || 0;
            const image = fruit.type === "pomme" ? PommeImage : fruit.type === "orange" ? OrangeImage : MyrtilleImage;

            return (
              <div key={fruit.id} className={`flex flex-col items-center ${isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`} onClick={() => isUnlocked && handleClick(fruit.id)}>
                <div className="mb-2">{getStarIcons(starCount)}</div>
                <div className="relative">
                  <img src={image} alt={fruit.type} className="w-[65px] h-[65px]" />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {isUnlocked ? fruit.id : "🔒"}
                  </span>
                </div>
              </div>
            );
          })}

         

        </div>
      </div>
    
        <motion.img
          src={sebiImgGauche}
          alt="Sebi"
          initial={{ x: -300, opacity: 0, scale: 0.9 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: [1, 1.1, 1],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: "easeOut"
          }}
          className="xl:w-[500px] absolute xl:bottom-8 xl:left-6 z-50 w-[300px] bottom-8 left-[-80px] md:left-[-50px] sm:left-[-60px] sm:w-[400px] sm:h-[400px] object-contain"
        />
    
    </div>
    
  );
};

export default PalierPage;