import { useForm } from "react-hook-form";
import axios from "axios";

const Inscription = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8008/api/utilisateurs/inscription", data);
      alert("Inscription réussie !");
    } catch (error) {
      console.error("Erreur d'inscription :", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>

        {/* Nom */}
        <label className="block">Nom :</label>
        <input
          type="text"
          {...register("nom", { required: "Nom requis" })}
          className="border p-2 rounded w-full"
        />
        {errors.nom && <p className="text-red-500">{errors.nom.message}</p>}

        {/* Email */}
        <label className="block mt-3">Email :</label>
        <input
          type="email"
          {...register("email", { required: "Email requis" })}
          className="border p-2 rounded w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Mot de passe */}
        <label className="block mt-3">Mot de passe :</label>
        <input
          type="password"
          {...register("motDePasse", { required: "Mot de passe requis", minLength: { value: 6, message: "Minimum 6 caractères" } })}
          className="border p-2 rounded w-full"
        />
        {errors.motDePasse && <p className="text-red-500">{errors.motDePasse.message}</p>}

        {/* Bouton */}
        <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded w-full">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Inscription;
