import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoSite from "../../assets/img/logo-sebi.webp";
import titre from "../../assets/img/titre.png";

const Header = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Liste des routes où la bannière ne doit pas s'afficher
  const noBannerRoutes = ["/connexion", "/inscription"];

  // Vérifie si l'URL actuelle correspond à une de ces routes
  const isNoBannerPage = noBannerRoutes.includes(location.pathname);

  return (
    <>
      <header
        className={`
          relative w-full
          ${isNoBannerPage ? "h-auto" : "h-[19rem] mobile:h-[21rem] grandMobile:h-[25rem] miniTablette:h-[34rem] tablette:h-[42rem] pc:h-[50rem] fixe:h-[55rem]"}
          ${isNoBannerPage ? "" : "bg-[url('./assets/img/accueil/page-accueil-440.png')] tablette:bg-[url('./assets/img/accueil/page-accueil-930.png')] pc:bg-[url('./assets/img/accueil/page-accueil-1440.jpg')] fixe:bg-[url('./assets/img/accueil/page-accueil-1920.jpg')] bg-cover bg-bottom bg-no-repeat"}
          flex flex-col items-center justify-center text-center px-6 py-4
        `} 
      >
        {/* Bannière uniquement si ce n'est pas une des routes spécifiées */}
        {!isNoBannerPage && ( // Si ce n'est pas une des routes spécifiées dans noBannerRoutes alors afficher la bannière 
          <div className="flex flex-col items-center justify-between z-0 mt-5 relative">
            <img
              src={titre}
              alt="titre du site"
              className={`
                h-auto 
                w-3/5
                mobile:w-4/5
                grandMobile:w-11/12
                grandMobile:mt-0
                miniTablette:w-11/12
                miniTablette:mt-0
                tablette:w-9/12 
                tablette:-mt-28
                pc:w-2/3 
                fixe:w-11/12
              `}
            />

            <Link
              to="/jeux"
              className="
                bg-fondRoseFonce absolute 
                mobile:bottom-10 mobile:text-sm mobile:px-4 mobile:py-2
                grandMobile:bottom-28 grandMobile:text-lg grandMobile:px-5 grandMobile:py-3 
                miniTablette:bottom-32 miniTablette:text-lg miniTablette:px-6 miniTablette:py-4
                tablette:bottom-24 tablette:px-6 tablette:py-4 tablette:text-lg
                pc:bottom-32 pc:px-8 pc:py-6 pc:text-xl
                bg-yellow-500 text-pink-700 font-semibold text-2xl rounded-full shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-300 animate-bounce
              "
            >
              Jouer !
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 shadow-md z-50">
          <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={LogoSite}
                alt="Logo Sebi"
                className="w-12 hover:scale-110 transition-transform duration-300"
              />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-3xl focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute top-full left-0 w-full bg-gray-800 lg:static lg:bg-transparent lg:flex lg:items-center lg:gap-8`}
            >
              {[
                { name: "Accueil", path: "/" },
                { name: "Jeux", path: "/jeux" },
                { name: "Personnages ", path: "/personnages" },
                { name: "Contact", path: "/contact" },
                { name: "Inscription", path: "/inscription" },
                { name: "Connexion", path: "/connexion" }
              ].map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 text-lg lg:inline-block hover:bg-yellow-500 hover:text-gray-900 transition rounded-lg ${
                      isActive ? "bg-yellow-500 text-gray-900 font-bold" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        {/* Contenu Principal */}
        <main className="container mx-auto mt-8">{children}</main>
      </header>
    </>
  );
};

export default Header;
