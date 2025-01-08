import LogoSite from "../img/logo-sebi.webp";
const InscriptionForm = () => {
  return (
    <div>
      <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 mx-auto p-8 md:p-10 bg-[#fce5c2] rounded-2xl shadow-xl">
        {/* Section du logo */}
        <div className="flex items-center gap-3 pb-4">
          {/* Remplacez 'votre-logo.png' par le chemin réel de votre image */}
          <img
            src={LogoSite}
            alt="Logo"
            className="w-12 h-12 object-cover" // Ajustez la taille du logo
          />
          <h1 className="text-3xl font-bold text-[#4B5563] my-auto">
            Inscription
          </h1>
        </div>

        <form className="flex flex-col">
          {/* Nom */}
          <div className="pb-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg block w-full p-3 focus:ring-1 focus:outline-none focus:ring-gray-400"
              placeholder="Votre nom"
            />
          </div>

          {/* Prénom */}
          <div className="pb-2">
            <label
              htmlFor="prenom"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              className="bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg block w-full p-3 focus:ring-1 focus:outline-none focus:ring-gray-400"
              placeholder="Votre prénom"
            />
          </div>

          {/* Âge */}
          <div className="pb-2">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Âge
            </label>
            <input
              type="number"
              name="age"
              id="age"
              className="bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg block w-full p-3 focus:ring-1 focus:outline-none focus:ring-gray-400"
              placeholder="Votre âge"
            />
          </div>

          {/* Email */}
          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg block w-full p-3 focus:ring-1 focus:outline-none focus:ring-gray-400"
              placeholder="name@company.com"
            />
          </div>

          {/* Mot de passe */}
          <div className="pb-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg block w-full p-3 focus:ring-1 focus:outline-none focus:ring-gray-400"
              placeholder="••••••••"
            />
          </div>

          {/* Confirmation du mot de passe */}
          <div className="pb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg block w-full p-3 focus:ring-1 focus:outline-none focus:ring-gray-400"
              placeholder="••••••••"
            />
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="w-full text-[#fce5c2] bg-[#000000] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center mb-6"
          >
            S&apos;inscrire
          </button>

          {/* Lien vers connexion */}
          <div className="text-sm font-light text-[#6B7280] text-center">
            Vous avez déjà un compte ?{" "}
            <a href="#" className="font-medium text-[#000000] hover:underline">
              Connectez-vous
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default InscriptionForm;
