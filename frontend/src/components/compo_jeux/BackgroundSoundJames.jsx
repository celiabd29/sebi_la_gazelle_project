// src/components/compo_jeux/BackgroundSoundJames.jsx
import { useEffect, useRef } from "react";
import forestSound from "../../assets/sounds/james_sounds/forest.mp3";
import { useSound } from "../../contexts/SoundProvider";
import { useLocation } from "react-router-dom";

const BackgroundSoundJames = () => {
  const { musicOn } = useSound();
  const location = useLocation();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(forestSound);
      audio.loop = true;
      audio.volume = 0.2;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    if (location.pathname.startsWith("/jeuxJames")) {
      if (musicOn) {
        audio.play().catch((err) => console.warn("🎵 Blocage auto-play", err));
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      // Ne pas supprimer `audioRef.current` ici sinon il sera recréé
    };
  }, [location.pathname, musicOn]); // ← important : écouter `musicOn`

  return null;
};

export default BackgroundSoundJames;
