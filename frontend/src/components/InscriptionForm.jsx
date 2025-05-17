import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const Inscription = () => {
 const avatars = [
  "/avatars/drys_le_ecureuil.webp",
  "/avatars/james_le_hibou.webp",
  "/avatars/mel_la_marmotte.webp",
];

  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]); // avatar par défaut

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const finalData = { ...data, avatar: selectedAvatar };
      await axios.post("http://localhost:8008/api/utilisateurs/inscription", finalData);
      alert("Inscription réussie !");
      localStorage.setItem("utilisateur", JSON.stringify(finalData)); // dans ton `onSubmit`
    } catch (error) {
      console.error("Erreur d'inscription :", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>

        {/* Prénom */}
        <label className="block">Prénom :</label>
        <input
          type="text"
          {...register("prenom", { required: "Prénom requis" })}
          className="border p-2 rounded w-full"
        />
        {errors.prenom && <p className="text-red-500">{errors.prenom.message}</p>}

        {/* Nom */}
        <label className="block mt-3">Nom :</label>
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
          {...register("motDePasse", {
            required: "Mot de passe requis",
            minLength: { value: 6, message: "Minimum 6 caractères" },
          })}
          className="border p-2 rounded w-full"
        />
        {errors.motDePasse && <p className="text-red-500">{errors.motDePasse.message}</p>}

        {/* Avatar */}
        <label className="block mt-4 mb-1">Choisis un avatar :</label>
        <div className="flex gap-3 mb-4">
          {avatars.map((avatar) => (
            <img
              key={avatar}
              src={avatar}
              alt={avatar}
              className={`w-16 h-16 rounded-full border-4 cursor-pointer ${
                selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </div>

        {/* Bouton */}
        <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded w-full">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Inscription;
