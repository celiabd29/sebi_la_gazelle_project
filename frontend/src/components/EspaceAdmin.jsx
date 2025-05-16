import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexte"; // Assure-toi d’avoir ce contexte

const EspaceAdmin = () => {
  const { utilisateur } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!utilisateur) {
      navigate("/connexion");
      return;
    }

    if (utilisateur.role !== "admin") {
      navigate("/"); // Redirige les utilisateurs non-admin vers l'accueil
    }
  }, [utilisateur, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">👑 Tableau de bord Admin</h1>
        <p className="text-gray-700 mb-4">Bienvenue {utilisateur?.prenom || "admin"} dans votre espace d’administration.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <h2 className="font-bold">Nombre d’utilisateurs :</h2>
            <p>📊 Statistique à venir</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow">
            <h2 className="font-bold">Actions récentes :</h2>
            <p>📄 Liste ou résumé des dernières actions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspaceAdmin;
