import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContexte";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Background from "/src/assets/img/fonds/page-ins_co.webp";
import Sebi from "../assets/img/sebi_droite.png";
import { useTranslation } from "react-i18next";
import logo from "../assets/img/logo-sebi.webp";
import { motion } from "framer-motion";

const Connexion = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { enregistrerUtilisateur } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://sebi-la-gazelle-backend.onrender.com/api/utilisateurs/connexion",
        data
      );

      const { utilisateur, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "utilisateur",
        JSON.stringify({
          _id: utilisateur._id,
          prenom: utilisateur.prenom,
          nom: utilisateur.nom,
          email: utilisateur.email,
          avatar: utilisateur.avatar,
          role: utilisateur.role,
        })
      );

      enregistrerUtilisateur(utilisateur);
      navigate(utilisateur.role === "admin" ? "/dashboard" : "/");
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert(error.response?.data?.message || "Erreur lors de la connexion");
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

        <h2 className="text-3xl md:text-4xl text-center font-[Fredoka] text-[#4B2A13] mb-6">
          {t("login_title") || "Connexion"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 text-base md:text-lg"
        >
          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_email_label") || "Email"}
            </label>
            <input
              type="email"
              {...register("email", {
                required: t("form_email_required") || "Email requis",
              })}
              placeholder="exemple@email.com"
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[#804000] mb-1 block">
              {t("form_password_label") || "Mot de passe"}
            </label>
            <input
              type="password"
              {...register("motDePasse", {
                required: t("form_password_required") || "Mot de passe requis",
              })}
              placeholder="••••••"
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.motDePasse && (
              <p className="text-red-500 text-sm mt-1">
                {errors.motDePasse.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#FFB570] hover:bg-[#FF994D] text-white text-lg font-medium py-3 rounded-full shadow-md transition w-full"
          >
            {t("login_button") || "Se connecter"}
          </button>
        </form>

        <p className="text-center text-[#4B2A13] mt-6 text-sm md:text-base">
          {t("no_account") || "Tu n'as pas de compte ?"}{" "}
          <Link
            to="/inscription"
            className="text-[#FF8C42] hover:underline font-semibold"
          >
            {t("create_one") || "Crée-en un !"}
          </Link>
        </p>
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

export default Connexion;
