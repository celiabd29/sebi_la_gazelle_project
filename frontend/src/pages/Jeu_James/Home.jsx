import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExitButton from "../../components/button-exit";
import LanguageButton from "../../components/button-language";
import ActionButtons from "../../components/compo_jeux/ActionButtons";
import BgJames from "../../assets/img/fonds/accueil-james.webp";
import BackgroundSoundJames from "../../components/compo_jeux/BackgroundSoundJames";
import { motion } from "framer-motion";
import sebiImg from "../../assets/img/sebi_droite.png";
import mainVoice from "../../assets/sounds/james_sounds/main_song.m4a";
import { useSound } from "../../contexts/SoundProvider";
import secondAudioFile from "../../assets/sounds/james_sounds/bouton_vert.m4a";
import mainVoiceEn from "../../assets/sounds/james_sounds/anglais/main_song.m4a";
import secondAudioFileEn from "../../assets/sounds/james_sounds/anglais/green_button.m4a";
import i18n from "../../i18n";
import CodeParent from "../../components/CodeParent.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { soundOn } = useSound();

  const user = JSON.parse(localStorage.getItem("user"));


const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
const isLoggedIn = !!utilisateur;

const [autorise, setAutorise] = useState(() => {
  return utilisateur && localStorage.getItem(`autorise-${utilisateur._id}`) === "true";
});

useEffect(() => {
  if (isLoggedIn && autorise) {
    const timer = setTimeout(() => {
      localStorage.removeItem(`autorise-${utilisateur._id}`);
      setAutorise(false);
    }, 30 * 60 * 1000); // 30 min

    return () => clearTimeout(timer);
  }
}, [isLoggedIn, autorise]);

if (isLoggedIn && !autorise) {
  return (
    <CodeParent
      message="🔒 Ce code est valide pendant 30 minutes pour ce compte."
      onSuccess={() => {
        localStorage.setItem(`autorise-${utilisateur._id}`, "true");
        setAutorise(true);
      }}
    />
  );
}


  // ✅ Son d'ambiance
  useEffect(() => {
    if (!soundOn) return;

    const main = new Audio(i18n.language === "fr" ? mainVoice : mainVoiceEn);
    const second = new Audio(i18n.language === "fr" ? secondAudioFile : secondAudioFileEn);
    main.volume = 0.3;
    second.volume = 0.4;

    let intervalId, timeoutId;
    main.play().catch(() => {});
    timeoutId = setTimeout(() => {
      second.play().catch(() => {});
      intervalId = setInterval(() => {
        second.currentTime = 0;
        second.play().catch(() => {});
      }, 20000);
    }, 7000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      main.pause();
      second.pause();
    };
  }, [soundOn, i18n.language]);

  return (
    <>
      <BackgroundSoundJames />
      <motion.img
        src={sebiImg}
        alt="Sebi"
        initial={{ x: 300, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: [1, 1.1, 1], y: [0, -20, 0] }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="lg:w-[520px] md:w-[400px] sm:w-[300px] w-[200px] absolute xl:bottom-8 md:bottom-8 bottom-44 right-[-20px] xl:right-6 z-50 object-contain"
      />
      <div
        className="min-h-screen flex flex-col justify-start bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: `url(${BgJames})` }}
      >
        <div className="flex justify-between items-start p-4 w-full">
          <ExitButton />
          <LanguageButton />
        </div>
        <div className="w-full text-center mt-6 sm:mt-10 md:mt-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white font-[Fredoka] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] leading-tight">
            {t("title_james")}
          </h1>
        </div>
        <div className="flex justify-center items-end pb-10 sm:pb-12 md:pb-16">
          <ActionButtons />
        </div>
      </div>
    </>
  );
};

export default Home;
