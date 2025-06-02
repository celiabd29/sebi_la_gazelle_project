import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Background from "/src/assets/img/accueil/contact.png"; // à adapter selon ton projet

const Inscription = () => {
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
      await axios.post(
        "http://localhost:8008/api/utilisateurs/inscription",
        finalData
      );
      alert("Inscription réussie !");
      localStorage.setItem("utilisateur", JSON.stringify(finalData));
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start pt-10 px-6"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full max-w-xl bg-white/90 rounded-[2.5rem] shadow-xl border-[5px] border-[#FFE6C7] px-8 py-8 backdrop-blur-md mx-auto font-[Fredoka] scale-[0.93]">
        <h2 className="text-4xl text-center font-[Fredoka] text-[#4B2A13] mb-4">
          Crée ton compte
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Prénom */}
          <div>
            <label className="text-[#804000] mb-1 block text-lg">Prénom</label>
            <input
              type="text"
              {...register("prenom", { required: "Prénom requis" })}
              placeholder="Ton prénom ici"
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.prenom && (
              <p className="text-red-500 text-sm">{errors.prenom.message}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label className="text-[#804000] mb-1 block text-lg">Nom</label>
            <input
              type="text"
              {...register("nom", { required: "Nom requis" })}
              placeholder="Ton nom de famille"
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.nom && (
              <p className="text-red-500 text-sm">{errors.nom.message}</p>
            )}
          </div>

          {/* Date de naissance */}
          <div>
            <label className="text-[#804000] mb-1 block text-lg">
              Date de naissance
            </label>
            <input
              type="date"
              {...register("dateDeNaissance", { required: "Date requise" })}
              className="w-full p-3 rounded-xl border-2 border-[#FFD6A5] bg-[#FFF8F0] text-[#4B2A13] focus:outline-none focus:ring-2 focus:ring-[#FFC28A]"
            />
            {errors.dateDeNaissance && (
              <p className="text-red-500 text-sm">
                {errors.dateDeNaissance.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-[#804000] mb-1 block text-lg">
              Adresse email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email requis" })}
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
              {...register("motDePasse", {
                required: "Mot de passe requis",
                minLength: { value: 6, message: "Minimum 6 caractères" },
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

          {/* Avatar */}
          <div>
            <label className="text-[#804000] mb-2 block text-lg">
              Choisis ton avatar :
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

          {/* Bouton d’inscription */}
          <button
            type="submit"
            className="mt-4 bg-[#FFB570] hover:bg-[#FF994D] text-white text-lg font-medium py-3 rounded-full shadow-md transition"
          >
            S’inscrire
          </button>
        </form>
      </div>
    </section>
  );
};

export default Inscription;
