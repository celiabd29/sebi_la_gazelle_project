import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import ExitButton from "../../components/button-exit";
import LanguageButton from "../../components/button-language";
import ActionButtons from "../../components/compo_jeux/button-play";
import background from "../../assets/img/background-jeu-drys.png";
import foretSound from "../../assets/sounds/drys_sounds/foret.wav";
import mainVoice from "../../assets/sounds/drys_sounds/main_song_drys.m4a";
import secondAudioFile from "../../assets/sounds/drys_sounds/bouton_vert.m4a";
import sebiImg from "../../assets/img/sebi_droite.png";
import { useSound } from "../../contexts/SoundProvider";
import { motion } from "framer-motion";
import mainVoiceEn from "../../assets/sounds/drys_sounds/anglais/main_song.m4a";
import secondAudioFileEn from "../../assets/sounds/drys_sounds/anglais/green_button.m4a";
import { useTranslation } from "react-i18next";



// // 👉 Import du composant de contrôle parental
import CodeParent from "../../components/CodeParent.jsx";

const MainPage = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { startSound, soundOn, musicOn } = useSound();

  // 👉 Ajout du contrôle parental
  const [autorise, setAutorise] = useState(false);
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
  const isLoggedIn = !!utilisateur;
<<<<<<< HEAD
=======
  const forestAudioRef = useRef(null);

  useEffect(() => {
    const dejaAutorise = localStorage.getItem(`autorise-${utilisateur?._id}`) === "true";
    if (dejaAutorise) setAutorise(true);
  }, []);
>>>>>>> dbd6d096b4d0e9dab38dfc7b43359458530505a1


  useEffect(() => {
    const handleClick = () => {
      if (soundOn) startSound();
      window.removeEventListener("click", handleClick);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [soundOn, startSound]);

  useEffect(() => {
    if (!musicOn) return;
    const audio = new Audio(foretSound);
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(() => console.log("❌ Autoplay bloqué (forêt)"));
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [musicOn]);

  useEffect(() => {
  if (!soundOn) return;

  // Choisir les bons fichiers selon la langue
  const main = i18n.language === "fr"
    ? new Audio(mainVoice)
    : new Audio(mainVoiceEn);

  const second = i18n.language === "fr"
    ? new Audio(secondAudioFile)
    : new Audio(secondAudioFileEn);

  main.volume = 0.2;
  second.volume = 0.4;

  let intervalId, timeoutId;

  main.play().catch(() => console.log("❌ Lecture mainVoice bloquée"));

  timeoutId = setTimeout(() => {
    second.play().catch(() => console.log("❌ Lecture secondAudio bloquée"));
    intervalId = setInterval(() => {
      second.currentTime = 0;
      second.play().catch(() => console.log("❌ Relecture secondAudio bloquée"));
    }, 30000);
  }, 5000);

  return () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    main.pause();
    main.currentTime = 0;
    second.pause();
    second.currentTime = 0;
  };
}, [soundOn, i18n.language]);


  const handleGameClick = () => {
    navigate("/jeuxDrys/PalierPage");
  };

<<<<<<< HEAD
if (isLoggedIn && !autorise) {
  return <CodeParent onSuccess={() => setAutorise(true)} />;
=======
// ⏱ Redemander le code après 30 minutes
useEffect(() => {
  if (isLoggedIn && autorise) {
    const timer = setTimeout(() => {
      localStorage.removeItem("autorise");
      setAutorise(false);
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(timer);
  }
}, [isLoggedIn, autorise]);


if (isLoggedIn && !autorise) {
  return <CodeParent onSuccess={() => {
    setAutorise(true);
    localStorage.setItem("autorise", "true");
  }} />;
>>>>>>> dbd6d096b4d0e9dab38dfc7b43359458530505a1
}




<<<<<<< HEAD
=======

>>>>>>> dbd6d096b4d0e9dab38dfc7b43359458530505a1
  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-start"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between items-start p-6 w-full">
          <ExitButton />
          <LanguageButton />
        </div>

        <div className="w-full text-center mt-2 sm:mt-10 md:mt-28">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white font-[Fredoka] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] leading-tight">
            {t("mainPage.title")}
          </h1>
        </div>

        <div className="flex justify-center items-end pb-8">
          <ActionButtons onGameClick={handleGameClick} />
        </div>
      </div>

      <motion.img
        src={sebiImg}
        alt="Sebi"
        initial={{ x: 300, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: [1, 1.1, 1], y: [0, -20, 0] }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="lg:w-[520px] md:w-[400px] sm:w-[300px] w-[200px] absolute xl:bottom-8 md:bottom-8 bottom-44 right-[-20px] xl:right-6 z-50 object-contain"
      />

      <Outlet />
    </>
  );
};

export default MainPage;
