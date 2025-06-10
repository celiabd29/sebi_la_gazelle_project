import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexte";
import axios from "axios";

const DashboardHome = () => {
  const auth = useAuth?.(); // Vérifie si le hook est bien défini
  const utilisateur = auth?.utilisateur;

  const navigate = useNavigate();

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nouveauxClients, setNouveauxClients] = useState(0);
  const [devices, setDevices] = useState([]);

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
    const fetchUtilisateurs = async () => {
      try {
        const res = await axios.get("http://localhost:8008/api/utilisateurs/tous");
        // const res = await axios.post(`https://sebi-la-gazelle-backend.onrender.com/api/utilisateurs/tous`);
        setUtilisateurs(res.data);

        const aujourdHui = new Date().toISOString().split("T")[0];
        const count = res.data.filter(user =>
          new Date(user.createdAt).toISOString().startsWith(aujourdHui)
        ).length;

        setNouveauxClients(count);
      } catch (error) {
        console.error("Erreur récupération utilisateurs :", error);
      }
    };

    const fetchAnalyticsDevices = async () => {
      try {
        const res = await axios.get("http://localhost:8008/api/analytics/devices");
        setDevices(res.data);
      } catch (error) {
        console.error("Erreur récupération GA devices :", error);
      }
    };

    fetchUtilisateurs();
    fetchAnalyticsDevices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
        <div className="text-sm text-gray-500">Bienvenue, {utilisateur?.prenom}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-md font-semibold text-gray-600">Aujourd’hui</h2>
          <p className="text-5xl text-purple-600 font-bold">{nouveauxClients}</p>
          <p className="text-sm text-gray-500">Nouveaux clients</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Présentation des appareils</h2>
          <ul className="space-y-2 text-sm">
            {devices.map((device, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{device.icon} {device.deviceCategory}</span>
                <span>{device.percent}% — {device.users.toLocaleString()} utilisateurs</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Dernier inscrit</h2>
          {utilisateurs.slice(-1).map((user) => (
            <div key={user._id} className="text-sm">
              <p>👤 <strong>{user.nom} {user.prenom}</strong></p>
              <p>📧 {user.email}</p>
              <p>📅 {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

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
            {utilisateurs.slice(-5).reverse().map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.nom} {user.prenom}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
