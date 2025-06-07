import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/img/accueil/fond-parc-profil.webp";

const Profil = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [editingField, setEditingField] = useState(null);
  const [activeTab, setActiveTab] = useState("profil"); // <-- 🔄 nouvel onglet actif
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    dateDeNaissance: "",
    avatar: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) return navigate("/connexion");
    setToken(userToken);

    fetch("http://localhost:8008/api/utilisateurs/me", {
      headers: {
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token invalide") {
          localStorage.removeItem("token");
          localStorage.removeItem("utilisateur");
          return navigate("/connexion");
        }
        setFormData(data);
        localStorage.setItem("utilisateur", JSON.stringify(data));
      })
      .catch((err) => console.error("Erreur profil:", err));
  }, [navigate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = () => {
    fetch("http://localhost:8008/api/utilisateurs/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setFormData(updated);
        setEditingField(null);
        localStorage.setItem("utilisateur", JSON.stringify(updated));
      })
      .catch((err) => console.error("Erreur mise à jour :", err));
  };

  return (
    <div
      className="min-h-screen px-4 py-8 flex justify-start items-center bg-[url('/backgrounds/parc_profil.png')] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-[#C6FFCB] w-full max-w-5xl rounded-3xl shadow-lg ml-6 p-6 md:p-10">
        {/* Onglets */}
        <div className="flex gap-6 border-b-4 border-[#9CF29B] text-xl font-[Fredoka] mb-6">
          <button
            onClick={() => setActiveTab("profil")}
            className={`pb-2 ${
              activeTab === "profil"
                ? "border-b-4 border-[#4C9E57] text-[#3A4D39]"
                : "text-gray-400 hover:text-[#3A4D39]"
            }`}
          >
            {t("profile_tab") || "Profil"}
          </button>
          <button
            onClick={() => setActiveTab("recompenses")}
            className={`pb-2 ${
              activeTab === "recompenses"
                ? "border-b-4 border-[#4C9E57] text-[#3A4D39]"
                : "text-gray-400 hover:text-[#3A4D39]"
            }`}
          >
            {t("reward_tab") || "Récompenses"}
          </button>
        </div>

        {/* Contenu de l'onglet actif */}
        {activeTab === "profil" && (
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Avatar */}
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-4 border-white object-cover"
              />
              <button
                onClick={() => handleEdit("avatar")}
                className="absolute -bottom-2 -right-2 bg-[#CFFAFE] p-2 rounded-full shadow"
              >
                <Pencil size={16} />
              </button>
            </div>

            {/* Formulaire infos */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-inner w-full space-y-4">
              {["nom", "prenom", "email", "dateDeNaissance", "avatar"].map(
                (field) => (
                  <div
                    key={field}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="font-medium text-[#4B2A13] capitalize">
                      {t(`form_${field}_label`, field)}
                    </div>
                    <div className="flex items-center gap-3">
                      {editingField === field ? (
                        <input
                          type={
                            field === "email"
                              ? "email"
                              : field === "dateDeNaissance"
                              ? "date"
                              : "text"
                          }
                          value={formData[field] || ""}
                          onChange={(e) => handleChange(field, e.target.value)}
                          className="border rounded-xl px-3 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-gray-600 text-sm">
                          {field === "dateDeNaissance"
                            ? formData[field]?.split("T")[0]
                            : formData[field]}
                        </span>
                      )}
                      <button
                        onClick={() =>
                          editingField === field
                            ? handleSave()
                            : handleEdit(field)
                        }
                        className="text-[#5EC2B4]"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {activeTab === "recompenses" && (
          <div className="p-4 mt-4 bg-white rounded-xl shadow-inner">
            <p className="text-center text-[#4B2A13] text-xl">
              🎉 {t("reward_message", "Tu n’as pas encore de récompenses...")}{" "}
              🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
