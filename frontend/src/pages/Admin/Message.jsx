import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContexte";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Message = () => {
  const auth = useAuth?.();
  const utilisateur = auth?.utilisateur;
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
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
    fetchMessages();
  }, []);


  const fetchMessages = async () => {
    try {
      // ✅ Récupération des vrais messages depuis l'API
      const res = await axios.get("http://localhost:8008/api/contact/tous");
      setMessages(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur récupération messages :", error);
      setLoading(false);
    }
  };


  const deleteMessage = async (messageId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      try {
        // Ici vous pouvez ajouter l'appel API pour supprimer le message
        await axios.delete(`https://sebi-la-gazelle-backend.onrender.com/api/contact/${messageId}`);
        setMessages(messages.filter(msg => msg._id !== messageId));
        alert("Message supprimé avec succès");
      } catch (error) {
        console.error("Erreur suppression message :", error);
        alert("Erreur lors de la suppression");
      }
    }
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Messages</h1>
        <p className="text-gray-600">Gérez les messages des utilisateurs</p>
      </div>

    
      {/* Messages Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                        {message.prenom?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {message.prenom} {message.nom}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {message.email}
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-600 truncate" title={message.message}>
                        {message.message}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          alert(`Message complet :\n\n"${message.message}"`);
                        }}
                        className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition"
                        title="Voir le message complet"
                      >
                        <i className="fas fa-eye text-xs"></i>
                      </button>
                      <button
                        onClick={() => deleteMessage(message._id)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition"
                        title="Supprimer le message"
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {messages.length === 0 && !loading && (
          <div className="p-6 text-center text-gray-500">
            Aucun message reçu pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
