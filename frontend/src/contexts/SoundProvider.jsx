import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import foretDrys from "../assets/sounds/drys_sounds/foret.wav";
import foretJames from "../assets/sounds/james_sounds/forest.mp3"; // 👈 ajoute ça

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const location = useLocation();
  const audioDrysRef = useRef(null);
  const audioJamesRef = useRef(null); // 👈 ajoute ça

  const [soundOn, setSoundOn] = useState(() => localStorage.getItem("soundOn") !== "false");
  const [musicOn, setMusicOn] = useState(() => localStorage.getItem("musicOn") !== "false");

  useEffect(() => {
    localStorage.setItem("soundOn", soundOn);
  }, [soundOn]);

  useEffect(() => {
    localStorage.setItem("musicOn", musicOn);
  }, [musicOn]);

  useEffect(() => {
    const isDrys = location.pathname.startsWith("/jeuxDrys");
    const isJames = location.pathname.startsWith("/jeuxJames");

    // Préparer les sons si pas déjà créés
    if (!audioDrysRef.current) {
      const drys = new Audio(foretDrys);
      drys.loop = true;
      drys.volume = 0.4;
      audioDrysRef.current = drys;
    }

    if (!audioJamesRef.current) {
      const james = new Audio(foretJames);
      james.loop = true;
      james.volume = 0.2;
      audioJamesRef.current = james;
    }

    const audioDrys = audioDrysRef.current;
    const audioJames = audioJamesRef.current;

    // DRYS
    if (isDrys && musicOn) {
      audioDrys.play().catch(() => {});
    } else {
      audioDrys.pause();
      audioDrys.currentTime = 0;
    }

    // JAMES
    if (isJames && musicOn) {
      audioJames.play().catch(() => {});
    } else {
      audioJames.pause();
      audioJames.currentTime = 0;
    }

  }, [location.pathname, musicOn]);

  return (
    <SoundContext.Provider value={{ soundOn, setSoundOn, musicOn, setMusicOn }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
