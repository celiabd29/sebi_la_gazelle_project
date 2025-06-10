import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import Background from "/src/assets/img/accueil/contact.webp";

const HeroSectionContact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Validation côté client
    if (!formData.nom || !formData.prenom || !formData.email || !formData.message) {
      alert("Tous les champs sont requis");
      return;
    }

    try {
      console.log("📤 Envoi des données :", formData);
      
      const response = await axios.post(
        "http://localhost:8008/api/contact",
        formData
      );
      
      console.log("✅ Réponse serveur :", response.data);
      
      if (response.status === 201) {
        launchConfetti();
        alert(t("form_success"));
        setFormData({ nom: "", prenom: "", email: "", message: "" });
      } else {
        alert(response.data.message || t("form_error_generic"));
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi :", error);
      
      if (error.response) {
        // Erreur de réponse du serveur
        console.error("Détails de l'erreur :", error.response.data);
        alert(error.response.data.message || t("form_error_server"));
      } else if (error.request) {
        // Problème de réseau
        console.error("Erreur réseau :", error.request);
        alert("Erreur de connexion au serveur");
      } else {
        // Autre erreur
        console.error("Erreur :", error.message);
        alert(t("form_error_server"));
      }
    }
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center pt-24 px-4 sm:px-6 md:justify-start md:px-10"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full max-w-[90%] md:max-w-2xl bg-white/90 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-[5px] border-[#FFE6C7] px-6 py-8 md:px-10 md:py-10 backdrop-blur-md">
        <h2 className="text-3xl md:text-4xl text-center font-[Fredoka] text-[#4B2A13] mb-6 md:mb-8">
          {t("contact_magic_title")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 md:gap-6 font-[Fredoka] text-base md:text-lg"
        >
          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_name_label")}
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder={t("form_name_placeholder")}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
              required
            />
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_firstname_label")}
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder={t("form_firstname_placeholder")}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
              required
            />
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_email_label")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("form_email_placeholder")}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
              required
            />
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_message_label")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={t("form_message_placeholder")}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFB570] hover:bg-[#FF994D] text-white text-lg font-medium py-3 rounded-full shadow-md transition"
          >
            {t("form_submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSectionContact;
