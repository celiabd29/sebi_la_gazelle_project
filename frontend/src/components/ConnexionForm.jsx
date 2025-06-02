import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContexte";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Background from "/src/assets/img/accueil/contact.png"; // même fond que l'inscription

const Connexion = () => {
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

      if (utilisateur.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert(error.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start pt-10 px-6"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full max-w-xl bg-white/90 rounded-[2.5rem] shadow-xl border-[5px] border-[#FFE6C7] px-8 py-8 backdrop-blur-md mx-auto font-[Fredoka] scale-[0.93]">
        <h2 className="text-4xl text-center font-[Fredoka] text-[#4B2A13] mb-4">
          Connexion
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="text-[#804000] mb-1 block text-lg">
              Adresse email
            </label>
            <input
              type="email"
              {...register("email", { required: "L'email est requis" })}
              placeholder="exemple@email.com"
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div>
            <label className="text-[#804000] mb-1 block text-lg">
              Mot de passe
            </label>
            <input
              type="password"
              {...register("motDePasse", { required: "Mot de passe requis" })}
              placeholder="••••••"
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.motDePasse && (
              <p className="text-red-500 text-sm">
                {errors.motDePasse.message}
              </p>
            )}
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="mt-2 bg-[#FFB570] hover:bg-[#FF994D] text-white text-lg font-medium py-3 rounded-full shadow-md transition"
          >
            Se connecter
          </button>
        </form>

        {/* Lien vers l'inscription */}
        <p className="text-center text-[#4B2A13] mt-6 text-base">
          Tu n'as pas de compte ?{" "}
          <Link
            to="/inscription"
            className="text-[#FF8C42] hover:underline font-semibold"
          >
            Crée-en un !
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Connexion;
