import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContexte";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Utilisateur = () => {
  const auth = useAuth?.();
  const utilisateur = auth?.utilisateur;
  const navigate = useNavigate();
  
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get("http://localhost:8008/api/utilisateurs/tous");
      setUtilisateurs(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur récupération utilisateurs :", error);
      setLoading(false);
    }
  };

  const calculateAge = (dateDeNaissance) => {
    if (!dateDeNaissance) return "Non renseigné";
    const today = new Date();
    const birthDate = new Date(dateDeNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} ans`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Utilisateur</h1>
        <p className="text-gray-600">Gérez les utilisateurs de la plateforme</p>
      </div>

      {/* Users Inscrit Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Utilisateurs inscrits ({utilisateurs.length})
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
                  Age
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
              {utilisateurs.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={user.avatar || '/avatars/drys_le_ecureuil.webp'} 
                          alt="Avatar" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {user.prenom} {user.nom}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {calculateAge(user.dateDeNaissance)}
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

        {utilisateurs.length === 0 && !loading && (
          <div className="p-6 text-center text-gray-500">
            Aucun utilisateur inscrit pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Utilisateur;
