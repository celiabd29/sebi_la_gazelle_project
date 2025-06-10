import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Utilisateur = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:8008/api";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Tentative de récupération des utilisateurs...");
      const res = await axios.get(`${API_URL}/utilisateurs/tous`, {
        // Ajout de headers CORS
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Réponse API:", res);
      
      // Définir les utilisateurs à partir des données de l'API
      if (res.data && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        // Si les données ne sont pas un tableau, utiliser un tableau vide
        console.error("Format de réponse inattendu:", res.data);
        setUsers([]);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs:", err);
      setError("Impossible de charger les utilisateurs. Veuillez réessayer.");
      toast.error("Erreur de connexion à l'API");
      
      // Utiliser des données de secours en cas d'erreur
      const fallbackUsers = [
        {
          _id: "mockuser1",
          prenom: "Alex",
          nom: "Martin",
          email: "alex@exemple.com",
          role: "utilisateur",
          createdAt: new Date().toISOString(),
          dateDeNaissance: "1990-01-01"
        },
        {
          _id: "mockadmin1",
          prenom: "Admin",
          nom: "Principal",
          email: "admin@exemple.com",
          role: "admin",
          createdAt: new Date().toISOString(),
          dateDeNaissance: "1985-12-24"
        }
      ];
      
      setUsers(fallbackUsers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Utilisateurs inscrits ({users.length})
          {error && <span className="text-sm text-red-500 ml-2">(Données de secours affichées)</span>}
        </h2>
        <button
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
        >
          Actualiser
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Utilisateur</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Inscription</th>
              <th className="px-4 py-2">Naissance</th>
              <th className="px-4 py-2">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr key={u._id || index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{u._id ? u._id.slice(0, 6) : "------"}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={u.avatar || "/avatar.png"}
                      className="w-8 h-8 rounded-full object-cover"
                      alt={`Avatar de ${u.prenom || ""} ${u.nom || ""}`}
                      onError={(e) => { e.target.src = "/avatar.png"; }}
                    />
                    <span>
                      {u.prenom || "---"} {u.nom || "---"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{u.email || "---"}</td>
                  <td className="px-4 py-2">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {u.dateDeNaissance ? new Date(u.dateDeNaissance).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {u.role || "utilisateur"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Utilisateur;