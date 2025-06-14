import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Background from "/src/assets/img/fonds/page-ins_co.webp";
import Sebi from "../assets/img/sebi_droite.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-sebi.webp";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const InscriptionForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const avatars = [
    "/avatars/drys_le_ecureuil.webp",
    "/avatars/james_le_hibou.webp",
    "/avatars/mel_la_marmotte.webp",
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const finalData = { ...data, avatar: selectedAvatar };
      console.log("✅ Données envoyées :", finalData);
      await axios.post("http://localhost:8008/api/utilisateurs/inscription", finalData);

      localStorage.setItem("utilisateur", JSON.stringify(finalData));
      navigate("/connexion");
    } catch (error) {
      console.error("❌ Erreur d'inscription :", error.response?.data || error);
      alert(t("register_error"));
    }
  };



  const toggleLangue = () => {
    const nouvelleLangue = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(nouvelleLangue);
  };

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center pt-20 px-4 sm:px-6 md:justify-start md:px-10"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Link
        to="/"
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <img src={logo} alt="Logo Sebi la gazelle" className="w-20 h-20" />
      </Link>

      <div className="relative w-full max-w-[90%] md:max-w-xl bg-white/90 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-[5px] border-[#FFE6C7] px-6 py-8 md:px-8 md:py-10 backdrop-blur-md font-[Fredoka] mx-auto md:ml-16 z-10">
        <button
          onClick={toggleLangue}
          className="absolute top-4 right-4 text-sm text-[#4B2A13] bg-[#FFD6A5] px-4 py-1 rounded-full shadow hover:bg-[#FFC28A] transition"
        >
          {i18n.language === "fr" ? "EN" : "FR"}
        </button>

        <h2 className="text-3xl md:text-4xl text-center text-[#4B2A13] mb-6">
          {t("register_title")}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 text-base md:text-lg"
        >
         

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_name_label")}
            </label>
            <input
              type="text"
              {...register("nom", { required: t("form_name_required") })}
              placeholder={t("form_name_placeholder")}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.nom && (
              <p className="text-red-500 text-sm">{errors.nom.message}</p>
            )}
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_firstname_label")}
            </label>
            <input
              type="text"
              {...register("prenom", {
                required: t("form_firstname_required"),
              })}
              placeholder={t("form_firstname_placeholder")}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.prenom && (
              <p className="text-red-500 text-sm">{errors.prenom.message}</p>
            )}
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_birthdate_label")}
            </label>
            <input
              type="date"
              {...register("dateDeNaissance", {
                required: t("form_birthdate_required"),
              })}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] text-[#4B2A13] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.dateDeNaissance && (
              <p className="text-red-500 text-sm">
                {errors.dateDeNaissance.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_email_label")}
            </label>
            <input
              type="email"
              {...register("email", { required: t("form_email_required") })}
              placeholder={t("form_email_placeholder")}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_password_label")}
            </label>
            <input
              type="password"
              {...register("motDePasse", {
                required: t("form_password_required"),
                minLength: { value: 6, message: t("form_password_min") },
              })}
              placeholder="••••••"
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.motDePasse && (
              <p className="text-red-500 text-sm">
                {errors.motDePasse.message}
              </p>
            )}
          </div>

           <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_parental_code_label") || "Code parental (PIN)"}
            </label>
            <input
              type="password"
              {...register("codeParental", {
                required: t("form_parental_code_required") || "Le code parental est requis",
                minLength: { value: 4, message: "Le code doit faire au moins 4 chiffres" },
                maxLength: { value: 6, message: "Le code ne peut pas dépasser 6 chiffres" },
                pattern: { value: /^[0-9]+$/, message: "Le code doit contenir uniquement des chiffres" }
              })}
              placeholder={t("form_parental_code_placeholder") || "Entrez un code PIN"}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.codeParental && (
              <p className="text-red-500 text-sm">{errors.codeParental.message}</p>
            )}
          </div>

          <div>
            <label className="text-[#804000] mb-2 block">
              {t("form_avatar_label")}
            </label>
            <div className="flex justify-center gap-4">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt="avatar"
                  className={`w-16 h-16 rounded-full border-4 cursor-pointer transition-transform duration-300 ${
                    selectedAvatar === avatar
                      ? "border-[#FFB570] scale-110"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#FFB570] hover:bg-[#FF994D] text-white text-lg font-medium py-3 rounded-full shadow-md transition w-full"
          >
            {t("register_button")}
          </button>
        </form>
      </div>

      <motion.img
        src={Sebi}
        alt="Sebi"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden md:block absolute bottom-0 right-10 w-[35rem] z-0"
      />
    </section>
  );
};

export default InscriptionForm;
