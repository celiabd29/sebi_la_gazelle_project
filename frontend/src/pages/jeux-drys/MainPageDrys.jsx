import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate, Outlet } from 'react-router-dom';
import ExitButton from "../../components/compo_jeux/ExitButton";
import LanguageButton from "../../components/LanguageSwitcher";
import ActionButtons from "../../components/button-play";
import background from "../../assets/img/background-jeu-drys.png"; // corriger le chemin si nécessaire
import foretSound from "../../assets/sounds/foret.wav"; // adapte le chemin si besoin
import { useSound } from "../../contexts/SoundProvider"; // ✅ ajoute cette ligne

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const { startSound } = useSound(); // ✅

  useEffect(() => {
    const handleFirstClick = () => {
      startSound(); // ✅ démarrer le son
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [startSound]);


  const handleGameClick = () => {
    navigate('/jeuxDrys/PalierPage');
  };

  useEffect(() => {
    const audio = new Audio(foretSound);
    audio.loop = true;
    audio.volume = 0.4;
  
    const playSound = () => {
      audio.play().catch((e) => {
        console.log("Autoplay bloqué même après clic !");
      });
  
      // Retirer l'écouteur une fois lancé
      window.removeEventListener('click', playSound);
    };
  
    // Attendre une interaction utilisateur
    window.addEventListener('click', playSound);
  
    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener('click', playSound);
    };
  }, []);
  

  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-between"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >

        {/* Titre en haut centré */}
       <div className="w-full text-center mt-10 sm:mt-10 md:mt-28">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white font-[Fredoka] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] leading-tight"
          >
            Les cachotteries de Drys l'écureuil 
          </h1>
      </div>
      
        <div>
          <ExitButton />
          <LanguageButton />
        </div>

        <div className="flex justify-center items-end pb-8">
          <ActionButtons onGameClick={handleGameClick} />
        </div>
      </div>

      {/* C’est ici que tes routes enfants vont s’afficher */}
      <Outlet />
    </>
  );
};

export default MainPage;
