import { createContext, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import foretSound from "../assets/sounds/foret.wav";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const audioRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const isDrysRoute = location.pathname.startsWith("/jeuxDrys");

    if (isDrysRoute) {
      if (!audioRef.current) {
        const audio = new Audio(foretSound);
        audio.loop = true;
        audio.volume = 0.4;
        audioRef.current = audio;
        audio.play().catch(() => {
          console.log("Autoplay bloqué");
        });
      } else {
        audioRef.current.play().catch(() => {});
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => {
      // Ne rien faire ici, le son reste si on est toujours dans /jeuxDrys
    };
  }, [location.pathname]);

  return (
    <SoundContext.Provider value={{}}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
