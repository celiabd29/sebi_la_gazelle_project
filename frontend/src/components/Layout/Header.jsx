import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoSite from "../../img/logo-sebi.webp";
import titre from "../../img/titre.png";

const Header = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`
        relative
    relative w-full
    h-[19rem] 
    mobile:h-[21rem] 
    grandMobile:h-[25rem] 
    miniTablette:h-[34rem] 
    tablette:h-[42rem] 
    pc:h-[50rem] 
    fixe:h-[55rem]
    bg-[url('./img/accueil/page-accueil-440.png')]
    tablette:bg-[url('./img/accueil/page-accueil-930.png')]
    pc:bg-[url('./img/accueil/page-accueil-1440.jpg')] 
    fixe:bg-[url('./img/accueil/page-accueil-1920.jpg')] 
    bg-cover bg-bottom bg-no-repeat
    flex flex-col items-center justify-center text-center
    px-6 py-4
  `}
    >
      {/* Titre et Bouton Jouer */}
      <div className="flex flex-col items-center justify-between z-0 mt-5 relative ">
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

        {/* Bouton Jouer */}
        <Link
          to="/jeux"
          className=" 
          absolute 
          mobile:bottom-10 mobile:text-sm mobile:px-4 mobile:py-2
          grandMobile:bottom-28 grandMobile:text-lg grandMobile:px-5 grandMobile:py-3 
          miniTablette:bottom-32 miniTablette:text-lg miniTablette:px-6 miniTablette:py-4
          tablette:bottom-24 tablette:px-6 tablette:py-4 tablette:text-lg
          pc:bottom-32 pc:px-8 pc:py-6 pc:text-xl 
          bg-yellow-500 text-pink-700 font-semibold text-2xl rounded-full shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-300 animate-bounce "
        >
          Jouer !
        </Link>
      </div>

      {/* Logo et Navigation */}
      <div className="absolute top-0 left-0 w-full bg-opacity-70 bg-gray-800">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link className="flex items-center gap-2" to="/">
            <img
              src={LogoSite}
              alt="Logo Sebi"
              className="w-12 hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Bouton Menu Burger - Affiché uniquement sur mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="tablette:hidden grandMobile:hidden text-white text-3xl focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Liens de Navigation - Afficher toujours sur tablette et plus */}
          <div
            className={`hidden grandMobile:flex gap-6 p-4 md:p-0 ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } md:opacity-100 md:visible bg-gray-800 md:bg-transparent md:shadow-none rounded-lg transition-all duration-300`}
          >
            {["/jeux", "#apropos", "#contact"].map((link, index) => (
              <NavLink
                key={index}
                to={link}
                className={({ isActive }) =>
                  `block md:inline-block py-2 px-4 text-white hover:text-yellow-300 transition duration-200 ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                {link === "/jeux"
                  ? "Jeux"
                  : link === "#apropos"
                  ? "À propos"
                  : "Contact"}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Contenu Principal */}
      <main className="container mx-auto mt-8">{children}</main>
    </header>
  );
};

export default Header;
