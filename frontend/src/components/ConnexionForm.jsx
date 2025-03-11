import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContexte";
import axios from "axios";

const Connexion = () => {
  const { enregistrerUtilisateur } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8008/api/utilisateurs/connexion", data);
      enregistrerUtilisateur(response.data.utilisateur);
      alert("Connexion réussie !");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>

        {/* Email */}
        <label className="block">Email :</label>
        <input
          type="email"
          {...register("email", { required: "L'email est requis" })}
          className="border p-2 rounded w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Mot de passe */}
        <label className="block mt-3">Mot de passe :</label>
        <input
          type="password"
          {...register("motDePasse", { required: "Mot de passe requis" })}
          className="border p-2 rounded w-full"
        />
        {errors.motDePasse && <p className="text-red-500">{errors.motDePasse.message}</p>}

        {/* Bouton de connexion */}
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Connexion;
