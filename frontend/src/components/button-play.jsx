import { FaGamepad, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import de useNavigate

function ActionButtons() {
  const navigate = useNavigate(); // Crée une instance de useNavigate

  const handleGameClick = () => {
    navigate('/GamePage');  // Redirige vers '/game'
  };

  const handleSettingsClick = () => {
    // Affiche un message dans la console
    console.log("Accéder aux réglages !");
    // Tu peux ajouter la redirection vers la page des réglages ici si tu en as une
    // navigate('/settings'); // Rediriger vers une page de réglages si nécessaire
  };

  return (
    <div className="flex justify-center items-center fixed bottom-8 left-0 right-0 space-x-4">
      <button
        className="bg-[#BDFEC4] hover:bg-green-300 text-black rounded-lg w-24 h-24 flex items-center justify-center shadow-md transition-transform transform hover:scale-110"
        onClick={handleGameClick}
        title="Commencer le jeu"
        aria-label="Accéder au jeu"
      >
        <FaGamepad className="text-5xl text-[#009510] transition-all hover:text-[#005f2d]" />
      </button>

      <button
        className="bg-[#FF6D83] hover:bg-red-400 text-black rounded-lg w-24 h-24 flex items-center justify-center shadow-md transition-transform transform hover:scale-110"
        onClick={handleSettingsClick}
        title="Réglages"
        aria-label="Accéder aux réglages"
      >
        <FaCog className="text-5xl text-[#9B0017] transition-all hover:text-[#5c000f]" />
      </button>
    </div>
  );
}

export default ActionButtons;
