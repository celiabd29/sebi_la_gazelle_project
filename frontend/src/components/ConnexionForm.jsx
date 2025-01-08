import LogoSite from "../img/logo-sebi.webp";

const Connexion = () => {
  return (
    <main className="flex items-center justify-center w-full h-screen bg-[#f3f4f6]">
      <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 mx-auto p-8 md:p-10 bg-[#fce5c2] rounded-2xl shadow-xl">
        {/* Section du logo */}
        <div className="flex items-center gap-3 pb-4">
          <img
            src={LogoSite}
            alt="Logo"
            className="w-12 h-12 object-cover" // Ajustez la taille du logo
          />
          <h1 className="text-3xl font-bold text-[#4B5563] my-auto">
            Connexion
          </h1>
        </div>

        <form className="flex flex-col">
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
          <div className="pb-6">
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

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full text-[#fce5c2] bg-[#000000] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center mb-6"
          >
            Se connecter
          </button>

          {/* Lien vers inscription */}
          <div className="text-sm font-light text-[#6B7280] text-center">
            Vous n'avez pas de compte ?{" "}
            <a href="#" className="font-medium text-[#000000] hover:underline">
              Inscrivez-vous
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Connexion
