import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/img/accueil/fond-parc-profil.webp";

const ProfilUtilisateur = () => {
  const [utilisateur, setUtilisateur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("utilisateur");
    if (stored) {
      try {
        setUtilisateur(JSON.parse(stored));
      } catch (err) {
        console.error("Erreur parsing localStorage:", err);
        setUtilisateur(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("utilisateur");
    navigate("/connexion");
  };

  if (!utilisateur) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Aucun utilisateur connecté.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <img
          src={utilisateur.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto border-4 border-fondOrange"
        />
        <h2 className="text-2xl font-bold mt-4">
          {utilisateur.prenom} {utilisateur.nom}
        </h2>
        <p className="text-gray-600 mt-2">{utilisateur.email}</p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default ProfilUtilisateur;
