// SoundProvider.jsx
import { createContext, useContext, useRef } from "react";
import foretSound from "../assets/sounds/foret.wav";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const audioRef = useRef(null);

  const play = () => {
    if (!audioRef.current) {
      const audio = new Audio(foretSound);
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
      audio.play().catch(() => console.log("Autoplay bloqué"));
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <SoundContext.Provider value={{ play, pause }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
