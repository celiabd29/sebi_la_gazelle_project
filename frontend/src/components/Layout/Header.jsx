import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoSite from "../../img/logo-sebi.webp";

const Header = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
<header
  className={`
    relative w-full
    h-[19rem] mobile:h-[24rem] grandMobile:h-[30rem] tablette:h-[42rem] pc:h-[50rem] fixe:h-[50rem]
    bg-[url('./img/accueil/page-accueil-440.png')]
    tablette:bg-[url('./img/accueil/page-accueil-930.png')]
    pc:bg-[url('./img/accueil/page-accueil-1440.jpg')] 
    fixe:bg-[url('./img/accueil/page-accueil-1920.jpg')] 
    bg-cover bg-bottom bg-no-repeat
    flex flex-col items-center justify-center text-center
    px-6 py-4
  `}
>
<div className="flex flex-col items-center justify-between z-10 mt-16">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-28">
      SEBI LA GAZELLE
    </h1>

    {/* Bouton Jouer */}
    <Link
      to="/jeux"
      className="px-8 py-6 mt-6 bg-yellow-500 text-pink-700 font-semibold text-2xl rounded-full shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-300 animate-bounce"
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

          {/* Bouton Menu Burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-3xl focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Liens de Navigation */}
          <div
            className={`absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:shadow-none rounded-lg md:flex gap-6 p-4 md:p-0 transition-all duration-300 ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
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
  

      {/* Contenu Optionnel */}
      <main className="container mx-auto mt-8">{children}</main>
    </header>
  );
};

export default Header;
