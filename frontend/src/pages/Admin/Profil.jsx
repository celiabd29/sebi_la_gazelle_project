import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContexte";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const auth = useAuth?.();
  const utilisateur = auth?.utilisateur;
  const navigate = useNavigate();
  const { setUtilisateur } = useAuth();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    dateDeNaissance: "",
    avatar: "",
  });

  const [avatarOptions, setAvatarOptions] = useState([]);
  const token = localStorage.getItem("token");

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
    if (!token) return navigate("/connexion");

    fetch("https://sebi-la-gazelle-backend.onrender.com/api/utilisateurs/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message?.includes("Token invalide") ||
          data.message?.includes("refusé")
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("utilisateur");
          return navigate("/connexion");
        }
        setFormData(data);
        localStorage.setItem("utilisateur", JSON.stringify(data));
      })
      .catch((err) => console.error("Erreur profil:", err));
  }, [navigate, token]);

  useEffect(() => {
    fetch("https://sebi-la-gazelle-backend.onrender.com/api/avatars")
      .then((res) => res.json())
      .then((data) => setAvatarOptions(data))
      .catch((err) => console.error("Erreur chargement avatars :", err));
  }, []);

  const handleAvatarChange = (url) => {
    const updatedData = { ...formData, avatar: url };
    setFormData(updatedData);

    fetch("https://sebi-la-gazelle-backend.onrender.com/api/utilisateurs/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setFormData(updated);
        setUtilisateur(updated);
        localStorage.setItem("utilisateur", JSON.stringify(updated));
      })
      .catch((err) => console.error("Erreur mise à jour avatar :", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mon Profil</h1>
        <p className="text-gray-600">
          Gérez les informations de votre compte administrateur
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Choisir un avatar
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {avatarOptions.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="choix-avatar"
                  className={`w-16 h-16 rounded-full border-4 cursor-pointer object-cover transition-all ${
                    formData.avatar === url
                      ? "border-blue-500 scale-110"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => handleAvatarChange(url)}
                />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">{formData.prenom}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">{formData.nom}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">
                      {formData.dateDeNaissance
                        ? new Date(formData.dateDeNaissance).toLocaleDateString(
                            "fr-FR"
                          )
                        : "Non renseigné"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Retour au Dashboard
              </button>

              <button
                onClick={() => navigate("/dashboard")} // Rediriger vers paramètres quand implémenté
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <i className="fas fa-edit mr-2"></i>
                Modifier le profil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">Admin</div>
          <div className="text-gray-600">Rôle</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formData.estVerifie ? "Vérifié" : "En attente"}
          </div>
          <div className="text-gray-600">Statut du compte</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {
              new Date().getFullYear() -
                new Date(formData.createdAt || Date.now()).getFullYear()
            }
            +
          </div>
          <div className="text-gray-600">Années d'expérience</div>
        </div>
      </div>
    </div>
  );
};

export default Profil;