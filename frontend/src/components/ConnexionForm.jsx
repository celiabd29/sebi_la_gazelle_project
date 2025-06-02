import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContexte";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Background from "/src/assets/img/accueil/contact.png";
import { useTranslation } from "react-i18next";

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
        "http://localhost:8008/api/utilisateurs/connexion",
        data
      );
      const { utilisateur } = response.data;

      enregistrerUtilisateur(utilisateur);

      localStorage.setItem(
        "utilisateur",
        JSON.stringify({
          _id: utilisateur._id,
          prenom: utilisateur.prenom,
          nom: utilisateur.nom,
          email: utilisateur.email,
          avatar: utilisateur.avatar,
        })
      );

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
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start pt-10 px-6"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="relative w-full max-w-xl bg-white/90 rounded-[2.5rem] shadow-xl border-[5px] border-[#FFE6C7] px-8 py-8 backdrop-blur-md font-[Fredoka] scale-[0.93] mr-auto ml-16">
        {/* Bouton langue */}
        <button
          onClick={toggleLangue}
          className="absolute top-4 right-6 text-sm text-[#4B2A13] bg-[#FFD6A5] px-4 py-1 rounded-full shadow hover:bg-[#FFC28A] transition"
        >
          {i18n.language === "fr" ? "EN" : "FR"}
        </button>

        <h2 className="text-4xl text-center font-[Fredoka] text-[#4B2A13] mb-4">
          {t("login_title") || "Connexion"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="text-[#804000] mb-1 block text-lg">
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
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-[#804000] mb-1 block text-lg">
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
              <p className="text-red-500 text-sm">
                {errors.motDePasse.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#FFB570] hover:bg-[#FF994D] text-white text-lg font-medium py-3 rounded-full shadow-md transition"
          >
            {t("login_button") || "Se connecter"}
          </button>
        </form>

        <p className="text-center text-[#4B2A13] mt-6 text-base">
          {t("no_account") || "Tu n'as pas de compte ?"}{" "}
          <Link
            to="/inscription"
            className="text-[#FF8C42] hover:underline font-semibold"
          >
            {t("create_one") || "Crée-en un !"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Connexion;
