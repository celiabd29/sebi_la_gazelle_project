import { useForm } from "react-hook-form";
import axios from "axios";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8008/api/contact", data);
      // Dans votre frontend (ContactForm.js)
      // const response = await axios.post(
        // `https://sebi-la-gazelle-backend.onrender.com/api/contact`,
        // data,
        // { timeout: 15000 } // 15 secondes
      // );
      if (response.status === 201) {
        alert("Message envoyé avec succès !");
        reset(); // Vide le formulaire
      } else {
        alert(response.data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error); // Affiche l’erreur
      alert("Erreur serveur."); // Affiche un message à l’utilisateur
    }
  };

  return (
    <div>
      <div className="bg-[#FCE5C2] rounded-[40px] my-20 mx-14 py-16 px-4 md:px-0">
        <h2 className="text-center text-3xl md:text-4xl font-semibold font-fredoka text-black mb-10">
          CONTACT
        </h2>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <label htmlFor="nom" className="block mb-2 text-sm font-medium">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                {...register("nom", { required: "Le nom est requis" })}
                placeholder="Charlene Reed"
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              />
              {errors.nom && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nom.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="prenom"
                className="block mb-2 text-sm font-medium"
              >
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                {...register("prenom", { required: "Le prénom est requis" })}
                placeholder="Charlene"
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              />
              {errors.prenom && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.prenom.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email invalide",
                  },
                })}
                placeholder="charlenereed@gmail.com"
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                {...register("message", { required: "Le message est requis" })}
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-black text-white text-sm font-medium py-3 rounded-md"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
