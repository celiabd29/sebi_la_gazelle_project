import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexte";
import axios from "axios";

const Dashboard = () => {
  const auth = useAuth?.();
  const utilisateur = auth?.utilisateur;
  const navigate = useNavigate();

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nouveauxClients, setNouveauxClients] = useState(0);
  const [statsJeux, setStatsJeux] = useState({
    totalScores: 0,
    joueursActifs: 0,
    moyenneStars: 0
  });

  useEffect(() => {
    if (!utilisateur) {
      navigate("/connexion");
      return;
    }

    if (utilisateur.role !== "admin") {
      navigate("/profil");
      return;
    }
  }, [utilisateur, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Récupérer tous les utilisateurs
        const resUsers = await axios.get("http://localhost:8008/api/utilisateurs/tous");
        setUtilisateurs(resUsers.data);

        // Calcul des nouveaux clients d'aujourd'hui
        const aujourdHui = new Date().toISOString().split("T")[0];
        const count = resUsers.data.filter(user =>
          new Date(user.createdAt).toISOString().startsWith(aujourdHui)
        ).length;
        setNouveauxClients(count);

        // Récupérer les statistiques de jeux (si API disponible)
        // const resStats = await axios.get("http://localhost:8008/api/scores/stats");
        // setStatsJeux(resStats.data);

      } catch (error) {
        console.error("Erreur récupération données dashboard :", error);
      }
    };

    fetchDashboardData();
  }, []);

  const getDeviceStats = () => [
    { name: "💻 Ordinateur", percentage: 54, users: "5.7M" },
    { name: "🧳 Laptop", percentage: 23, users: "698k" },
    { name: "📱 Tablette", percentage: 19, users: "468k" },
    { name: "📲 Mobile", percentage: 11, users: "16k" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Administrateur
        </h1>
        <p className="text-gray-600">
          Bienvenue, {utilisateur?.prenom} ! Voici un aperçu de votre plateforme.
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nouveaux clients</p>
              <p className="text-3xl font-bold text-blue-600">{nouveauxClients}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Aujourd'hui</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total utilisateurs</p>
              <p className="text-3xl font-bold text-green-600">{utilisateurs.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Inscrits total</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Scores enregistrés</p>
              <p className="text-3xl font-bold text-purple-600">{statsJeux.totalScores}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Joueurs actifs</p>
              <p className="text-3xl font-bold text-yellow-600">{statsJeux.joueursActifs}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Ce mois</p>
        </div>
      </div>

      {/* Graphiques et informations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Répartition des appareils */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Répartition des appareils
          </h3>
          <div className="space-y-4">
            {getDeviceStats().map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">
                    {device.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {device.percentage}%
                  </span>
                  <span className="text-xs text-gray-500 w-16">
                    {device.users}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dernier inscrit */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Dernier utilisateur inscrit
          </h3>
          {utilisateurs.slice(-1).map((user) => (
            <div key={user._id} className="flex items-center space-x-4">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {user.prenom} {user.nom}
                </h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">
                  Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  user.estVerifie 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.estVerifie ? 'Vérifié' : 'En attente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau des derniers inscrits */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Derniers utilisateurs inscrits
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {utilisateurs.slice(-10).reverse().map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar || '/default-avatar.png'}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.prenom} {user.nom}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.estVerifie 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.estVerifie ? 'Vérifié' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
