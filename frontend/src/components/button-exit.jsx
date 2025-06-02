import React from "react";
import { useNavigate } from "react-router-dom";

const ExitButton = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  return (
    <button
      className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg hover:bg-red-700"
      onClick={handleExit}
      title="Quitter"
    >
      <span className="text-2xl font-bold font-[Fredoka]">X</span>
    </button>
  );
};

export default ExitButton;
