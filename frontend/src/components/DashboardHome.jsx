import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexte";
import axios from "axios";

const DashboardHome = () => {
  const auth = useAuth?.(); // Vérifie si le hook est bien défini
  const utilisateur = auth?.utilisateur;

  const navigate = useNavigate();

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nouveauxClients, setNouveauxClients] = useState(0);

  useEffect(() => {
    if (!utilisateur) {
      navigate("/connexion");
      return;
    }

    if (utilisateur.role !== "admin") {
      navigate("/");
    }
  }, [utilisateur, navigate]);

  useEffect(() => {
    // Récupérer tous les utilisateurs
    const fetchUtilisateurs = async () => {
      try {
        const res = await axios.get("/api/utilisateurs/tous");
        setUtilisateurs(res.data);

        // Calcul des nouveaux clients d’aujourd’hui
        const aujourdHui = new Date().toISOString().split("T")[0];
        const count = res.data.filter((user) =>
          new Date(user.createdAt).toISOString().startsWith(aujourdHui)
        ).length;

        setNouveauxClients(count);
      } catch (error) {
        console.error("Erreur récupération utilisateurs :", error);
      }
    };

    fetchUtilisateurs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Dashboard Administrateur
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Aujourd’hui</h2>
          <p className="text-5xl text-purple-600">{nouveauxClients}</p>
          <p className="text-sm text-gray-500">Nouveaux clients</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            Présentation des appareils
          </h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>💻 Ordinateur : 54% — 5.7M utilisateurs</li>
            <li>🧳 Laptop : 23% — 698k utilisateurs</li>
            <li>📱 Tablette : 19% — 468k utilisateurs</li>
            <li>📲 Mobile : 11% — 16k utilisateurs</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Dernier inscrit</h2>
          {utilisateurs.slice(-1).map((user) => (
            <div key={user._id} className="text-sm">
              <p>
                👤{" "}
                <strong>
                  {user.nom} {user.prenom}
                </strong>
              </p>
              <p>📧 {user.email}</p>
              <p>📅 {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Liste des derniers inscrits */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Derniers inscrits</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left px-4 py-2">Nom</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Date d’inscription</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs
              .slice(-5)
              .reverse()
              .map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">
                    {user.nom} {user.prenom}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
