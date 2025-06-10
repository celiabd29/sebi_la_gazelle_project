// SoundLogic.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSound } from "../contexts/SoundProvider";

const SoundLogic = () => {
  const location = useLocation();
  const { play, pause } = useSound();

  useEffect(() => {
    const isDrysRoute = location.pathname.startsWith("/jeuxDrys");
    if (isDrysRoute) {
      play();
    } else {
      pause();
    }
  }, [location.pathname, play, pause]);

  return null;
};

export default SoundLogic;
