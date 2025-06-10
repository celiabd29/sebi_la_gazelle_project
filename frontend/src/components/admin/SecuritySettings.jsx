import { useState } from "react";
import { useAuth } from "../../contexts/AuthContexte";

const SecuritySettings = () => {
  const { utilisateur } = useAuth();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validation des mots de passe
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: "error", text: "Les mots de passe ne correspondent pas" });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères" });
      return;
    }

    setLoading(true);

    try {
      const userId = utilisateur?._id || JSON.parse(localStorage.getItem("utilisateur"))?._id;
      
      if (!userId) {
        setMessage({ type: "error", text: "Utilisateur non identifié" });
        setLoading(false);
        return;
      }

      
      setMessage({ type: "success", text: "Mot de passe mis à jour avec succès" });
      
      // Réinitialiser les champs
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      const errorMessage = error.response?.data?.message || "Erreur lors de la mise à jour du mot de passe";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl">
      {message.text && (
        <div className={`p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}
      
      <div>
        <label className="block mb-2 text-sm font-medium">Mot de passe actuel</label>
        <input 
          type="password" 
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1" 
          required
        />
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium">Nouveau mot de passe</label>
        <input 
          type="password" 
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1" 
          required
          minLength={6}
        />
        <p className="text-xs text-gray-500 mt-1">6 caractères minimum</p>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium">Confirmer le nouveau mot de passe</label>
        <input 
          type="password" 
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1" 
          required
        />
      </div>

      <button 
        type="submit" 
        className={`bg-blue-600 text-white px-6 py-2 rounded mt-4 float-right ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        disabled={loading}
      >
        {loading ? "Traitement..." : "Sauvegarder"}
      </button>
    </form>
  );
};

export default SecuritySettings;
