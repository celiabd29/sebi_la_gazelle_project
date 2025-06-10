import { FaGamepad, FaCog } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate("/jeuxJames/tableau");
  };

  const handleSettingsClick = () => {
    navigate("/jeuxJames/settings");
  };

  return (
    <div className="flex justify-center items-center fixed bottom-8 left-0 right-0 xl:gap-32 lg:gap-24 md:gap-16 sm:gap-12 gap-8 z-50">
      <button
        className="bg-[#BDFEC4] hover:bg-green-300 text-black rounded-lg lg:w-40 lg:h-40 md:w-32 md:h-32 w-28 h-28 flex items-center justify-center shadow-md transition-transform transform hover:scale-110"
        onClick={handleGameClick}
        title="Commencer le jeu"
        aria-label="Accéder au jeu"
      >
        <FaGamepad className="xl:text-[100px] md:text-[80px] text-[70px] text-[#009510] transition-all hover:text-[#005f2d]" />
      </button>

      <button
        className="bg-[#FF6D83] hover:bg-red-400 text-black rounded-lg lg:w-40 lg:h-40 md:w-32 md:h-32 w-28 h-28 flex items-center justify-center shadow-md transition-transform transform hover:scale-110"
        onClick={handleSettingsClick}
        title="Réglages"
        aria-label="Accéder aux réglages"
      >
        <FaCog className="xl:text-[100px] md:text-[80px] text-[70px] text-[#9B0017] transition-all hover:text-[#5c000f]" />
      </button>
    </div>
  );
};

export default ActionButtons;