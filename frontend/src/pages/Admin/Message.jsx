import { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { toast } from 'react-toastify';

const Messages = () => {
  const { api } = useApi();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact/messages");
      setMessages(res.data);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement des messages :", err);
      setError("Impossible de charger les messages. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [api]);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await api.delete(`/contact/messages/${id}`);
      setMessages(messages.filter(message => message._id !== id));
      toast.success("Message supprimé avec succès");
    } catch (err) {
      console.error("Erreur lors de la suppression du message:", err);
      toast.error("Erreur lors de la suppression du message");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          <button 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded" 
            onClick={() => fetchMessages()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Messages</h2>
        <button 
          onClick={() => fetchMessages()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
        >
          Actualiser
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Date d'envoi</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prénom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((m) => (
                <tr key={m._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{new Date(m.createdAt || m.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{m.nom}</td>
                  <td className="px-4 py-2">{m.prenom}</td>
                  <td className="px-4 py-2">{m.email}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{m.message}</td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleDelete(m._id)}
                      disabled={deletingId === m._id}
                      className={`bg-red-500 text-white px-2 py-1 rounded ${
                        deletingId === m._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                      }`}
                    >
                      {deletingId === m._id ? "..." : "X"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">Aucun message trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
