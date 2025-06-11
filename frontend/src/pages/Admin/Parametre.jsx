import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContexte";
import { useNavigate } from "react-router-dom";

const Parametre = () => {
  const auth = useAuth?.();
  const utilisateur = auth?.utilisateur;
  const navigate = useNavigate();
  const { setUtilisateur } = useAuth();

  const [activeTab, setActiveTab] = useState("modifier");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    dateDeNaissance: "",
    avatar: "",
  });

  const [passwordData, setPasswordData] = useState({
    ancienMotDePasse: "",
    nouveauMotDePasse: "",
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

    fetch("http://localhost:8008/api/utilisateurs/me", {
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
    fetch("http://localhost:8008/api/avatars")
      .then((res) => res.json())
      .then((data) => setAvatarOptions(data))
      .catch((err) => console.error("Erreur chargement avatars :", err));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    fetch("http://localhost:8008/api/utilisateurs/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setFormData(updated);
        setUtilisateur(updated);
        localStorage.setItem("utilisateur", JSON.stringify(updated));
        alert("Profil mis à jour avec succès !");
      })
      .catch((err) => console.error("Erreur mise à jour :", err));
  };

  const handlePasswordChange = () => {
    fetch("http://localhost:8008/api/utilisateurs/me/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message || "Mot de passe mis à jour !");
        setPasswordData({ ancienMotDePasse: "", nouveauMotDePasse: "" });
      })
      .catch((err) => console.error("Erreur mot de passe :", err));
  };

  const handleAvatarChange = (url) => {
    const updatedData = { ...formData, avatar: url };
    setFormData(updatedData);

    fetch("http://localhost:8008/api/utilisateurs/me", {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Paramètre</h1>
        <p className="text-gray-600">Gérez vos paramètres de profil et de sécurité</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "modifier", label: "Modifier", icon: "fas fa-edit" },
              { id: "securite", label: "Sécurité", icon: "fas fa-lock" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "modifier" && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
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
                      className={`w-16 h-16 rounded-full border-4 cursor-pointer object-cover ${
                        formData.avatar === url
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      onClick={() => handleAvatarChange(url)}
                    />
                  ))}
                </div>
              </div>

              {/* Form Section */}
              <div className="flex-1 max-w-md">
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="charlieneese@gmail.com"
                    />
                  </div>

                  {/* Votre Nom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre Nom
                    </label>
                    <input
                      type="text"
                      value={formData.prenom || ""}
                      onChange={(e) => handleChange("prenom", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Charlene Reed"
                    />
                  </div>

                  {/* Date de naissance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de naissance
                    </label>
                    <input
                      type="date"
                      value={formData.dateDeNaissance?.split("T")[0] || ""}
                      onChange={(e) => handleChange("dateDeNaissance", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "securite" && (
            <div className="max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Changer le mot de passe
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    value={passwordData.ancienMotDePasse}
                    onChange={(e) =>
                      setPasswordData((p) => ({
                        ...p,
                        ancienMotDePasse: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordData.nouveauMotDePasse}
                    onChange={(e) =>
                      setPasswordData((p) => ({
                        ...p,
                        nouveauMotDePasse: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Changer le mot de passe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parametre;
