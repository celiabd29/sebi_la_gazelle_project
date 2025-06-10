import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContexte";
import { useApi } from "../../contexts/ApiContext";

const avatars = [
  "/avatars/drys_le_ecureuil.webp",
  "/avatars/james_le_hibou.webp",
  "/avatars/mel_la_marmotte.webp",
  "/avatars/avatar_default.png"
];

const EditProfile = () => {
  const { utilisateur, enregistrerUtilisateur } = useAuth();
  const { api } = useApi();
  const [userInfo, setUserInfo] = useState({
    email: "",
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    avatar: ""
  });
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Charger les infos utilisateur depuis le localStorage si pas dans le contexte
    const storedUser = JSON.parse(localStorage.getItem("utilisateur"));
    if (utilisateur || storedUser) {
      const user = utilisateur || storedUser;
      setUserInfo({
        email: user.email || "",
        nom: user.nom || "",
        prenom: user.prenom || "",
        dateDeNaissance: user.dateDeNaissance ? user.dateDeNaissance.split('T')[0] : "",
        avatar: user.avatar || ""
      });
      setSelectedAvatar(user.avatar || "");
    }
  }, [utilisateur]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Mettre à jour avec l'API
      const userId = utilisateur?._id || JSON.parse(localStorage.getItem("utilisateur"))?._id;
      
      if (!userId) {
        setMessage({ type: "error", text: "Utilisateur non identifié" });
        setLoading(false);
        return;
      }

      const updatedData = {
        ...userInfo,
        avatar: selectedAvatar || userInfo.avatar
      };
      
      const response = await api.put(`/utilisateurs/${userId}`, updatedData);
      
      // Mettre à jour le localStorage
      const storedUser = JSON.parse(localStorage.getItem("utilisateur"));
      if (storedUser) {
        localStorage.setItem("utilisateur", JSON.stringify({
          ...storedUser,
          ...updatedData
        }));
      }
      
      // Mettre à jour le contexte
      if (utilisateur) {
        enregistrerUtilisateur({
          ...utilisateur,
          ...updatedData
        });
      }
      
      setMessage({ type: "success", text: "Profil mis à jour avec succès" });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setMessage({ type: "error", text: "Erreur lors de la mise à jour du profil" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {message.text && (
        <div className={`p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}
      
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">Avatar actuel</label>
        <div className="flex gap-4 items-center">
          <img 
            src={selectedAvatar || userInfo.avatar || "/avatars/avatar_default.png"} 
            className="w-16 h-16 rounded-full object-cover" 
            alt="Avatar actuel de l'utilisateur"
          />
          
          <div>
            <label className="block mb-2 text-sm font-medium">Changer d'avatar</label>
            <div className="flex gap-3 mb-4">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt={`Option d'avatar ${avatar.split('/').pop()}`}
                  className={`w-12 h-12 rounded-full border-2 cursor-pointer ${
                    selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded p-2"
            value={userInfo.email}
            onChange={handleChange}
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">Prénom</label>
          <input
            type="text"
            name="prenom"
            className="w-full border rounded p-2"
            value={userInfo.prenom}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">Nom</label>
          <input
            type="text"
            name="nom"
            className="w-full border rounded p-2"
            value={userInfo.nom}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">Date de naissance</label>
          <input
            type="date"
            name="dateDeNaissance"
            className="w-full border rounded p-2"
            value={userInfo.dateDeNaissance}
            onChange={handleChange}
          />
        </div>
      </div>

      <button 
        type="submit" 
        className={`bg-blue-600 text-white px-6 py-2 rounded mt-4 float-right ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        disabled={loading}
      >
        {loading ? "Enregistrement..." : "Sauvegarder"}
      </button>
    </form>
  );
};

export default EditProfile;
