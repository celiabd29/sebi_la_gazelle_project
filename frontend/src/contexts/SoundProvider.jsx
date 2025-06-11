import { createContext, useContext, useRef, useState, useEffect } from "react";
import foretSound from "../assets/sounds/drys_sounds/foret.wav";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const audioRef = useRef(null);

  const [soundOn, setSoundOn] = useState(() => localStorage.getItem("soundOn") !== "false");
  const [musicOn, setMusicOn] = useState(() => localStorage.getItem("musicOn") !== "false");

  useEffect(() => {
    localStorage.setItem("soundOn", soundOn);
  }, [soundOn]);

  useEffect(() => {
<<<<<<< HEAD
    localStorage.setItem("musicOn", musicOn);

    if (musicOn) {
      play();
    } else {
      pause();
    }
  }, [musicOn]);
=======
  localStorage.setItem("musicOn", musicOn);
}, [musicOn]);

>>>>>>> dbd6d096b4d0e9dab38dfc7b43359458530505a1

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
    <SoundContext.Provider value={{ play, pause, soundOn, setSoundOn, musicOn, setMusicOn }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
