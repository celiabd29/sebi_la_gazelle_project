import React from "react";
import { useNavigate } from "react-router-dom";

const ReturnButton = ({ targetPath = "/", className = "", style = {} }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log("Retour à la page :", targetPath);
    navigate(targetPath); // Navigue vers la page spécifiée
  };

  return (
    <button
      className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-white shadow-lg hover:bg-yellow-700 ${className}"
      style={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
        ...style,
      }}
      onClick={handleNavigate}
      title="Retour"
    >
      <span className="text-2xl font-bold font-fredoka">
        <i className="fa-solid fa-arrow-left"></i>
      </span>
    </button>
  );
};

export default ReturnButton;
