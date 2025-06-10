import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/img/accueil/fond-parc-profil.webp";
import { useAuth } from "../../contexts/AuthContexte";

const Profil = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUtilisateur } = useAuth();

  const [activeTab, setActiveTab] = useState("profil");
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    dateDeNaissance: "",
    avatar: "",
    codeParental: "",
  });

  const [passwordData, setPasswordData] = useState({
    ancienMotDePasse: "",
    nouveauMotDePasse: "",
  });

  const [avatarOptions, setAvatarOptions] = useState([]);
  const token = localStorage.getItem("token");
  const [ancienCodeParental, setAncienCodeParental] = useState("");
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const isLoggedIn = !!user;



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

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = () => {
    if (editingField === "codeParental") {
      fetch("http://localhost:8008/api/utilisateurs/me/code-parent", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body: JSON.stringify({
          ancienCode: ancienCodeParental,
          nouveauCode: formData.codeParental,
        }),

      })
        .then((res) => res.json())
        .then((updated) => {
          if (updated.success) {
            setFormData((prev) => ({
              ...prev,
              codeParental: formData.codeParental,
            }));
            setEditingField(null);
            setAncienCodeParental("");

            alert("Code parental mis à jour avec succès !");
          } else {
            alert(updated.message || "Erreur de mise à jour");
          }
        })
        .catch((err) =>
          console.error("Erreur mise à jour code parental :", err)
        );
    } else {
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
          setEditingField(null);
          localStorage.setItem("utilisateur", JSON.stringify(updated));
        })
        .catch((err) => console.error("Erreur mise à jour :", err));
    }
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
    <div
      className="min-h-screen px-4 py-8 flex justify-start items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[#C6FFCB] w-full max-w-5xl rounded-3xl shadow-lg ml-6 p-6 md:p-10">
        <div className="flex gap-6 border-b-4 border-[#9CF29B] text-xl font-[Fredoka] mb-6">
          {["profil", "recompenses", "securite"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-4 border-[#4C9E57] text-[#3A4D39]"
                  : "text-gray-400 hover:text-[#3A4D39]"
              }`}
            >
              {t(`${tab}_tab`) || tab}
            </button>
          ))}
        </div>

        {activeTab === "profil" && (
          <div className="flex flex-col md:flex-row items-start gap-10">
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

            <div className="flex-1 bg-white p-6 rounded-2xl shadow-inner w-full space-y-4">
              {[
                "nom",
                "prenom",
                "email",
                "dateDeNaissance",
                "codeParental",
              ].map((field) => (
                <div
                  key={field}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="font-medium text-[#4B2A13] capitalize">
                    {t(`form_${field}_label`, field)}
                  </div>
                  <div className="flex items-center gap-3">
                    {editingField === field ? (
                    field === "codeParental" ? (
                      <div className="flex flex-col gap-2">
                        <input
                          type="password"
                          placeholder="Ancien code parental"
                          value={ancienCodeParental}
                          onChange={(e) => setAncienCodeParental(e.target.value)}
                          className="border rounded-xl px-3 py-1 text-sm"
                        />
                        <input
                          type="password"
                          placeholder="Nouveau code parental"
                          value={formData.codeParental}
                          onChange={(e) => handleChange("codeParental", e.target.value)}
                          className="border rounded-xl px-3 py-1 text-sm"
                        />
                      </div>
                    ) : (
                      <input
                        type={
                          field === "email"
                            ? "email"
                            : field === "dateDeNaissance"
                            ? "date"
                            : "text"
                        }
                        value={
                          field === "dateDeNaissance"
                            ? formData[field]?.split("T")[0]
                            : formData[field] || ""
                        }
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="border rounded-xl px-3 py-1 text-sm"
                      />
                    )
                  ) : (
                    <span className="text-gray-600 text-sm">
                      {field === "dateDeNaissance"
                        ? formData[field]?.split("T")[0]
                        : field === "codeParental"
                        ? "••••"
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
              ))}

              <div className="mt-6">
                <p className="text-[#4B2A13] font-medium mb-2">
                  {t("choisir_avatar", "Choisir un avatar :")}
                </p>
                <div className="flex flex-wrap gap-4">
                  {avatarOptions.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="choix-avatar"
                      className={`w-16 h-16 rounded-full border-4 cursor-pointer object-cover ${
                        formData.avatar === url
                          ? "border-[#4C9E57]"
                          : "border-transparent"
                      }`}
                      onClick={() => handleAvatarChange(url)}
                    />
                  ))}
                </div>
              </div>
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

        {activeTab === "securite" && (
          <div className="bg-white p-6 mt-4 rounded-xl shadow-inner space-y-4">
            <h3 className="text-xl font-semibold text-[#4B2A13]">
              🔐 {t("changer_mdp", "Changer mon mot de passe")}
            </h3>
            <input
              type="password"
              placeholder={t(
                "form_ancienMotDePasse_label",
                "Ancien mot de passe"
              )}
              value={passwordData.ancienMotDePasse}
              onChange={(e) =>
                setPasswordData((p) => ({
                  ...p,
                  ancienMotDePasse: e.target.value,
                }))
              }
              className="w-full border rounded-lg p-2"
            />
            <input
              type="password"
              placeholder={t(
                "form_nouveauMotDePasse_label",
                "Nouveau mot de passe"
              )}
              value={passwordData.nouveauMotDePasse}
              onChange={(e) =>
                setPasswordData((p) => ({
                  ...p,
                  nouveauMotDePasse: e.target.value,
                }))
              }
              className="w-full border rounded-lg p-2"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-[#4C9E57] text-white px-6 py-2 rounded-xl"
            >
              {t("valider", "Valider")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;