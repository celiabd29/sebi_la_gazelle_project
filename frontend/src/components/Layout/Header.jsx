import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoSite from "../../img/logo-sebi.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-[rgb(64,224,208)] px-4 py-8 bg-contain bg-no-repeat w-screen">
      <nav className="bg-pink-500 px-6 py-4 flex items-center justify-between rounded-lg shadow-lg">
        <Link className="flex items-center gap-2">
          <img src={LogoSite} alt="Logo Sebi" className="w-12 animate-bounce" />
          <span className="text-white text-2xl font-bold">Sebi la Gazelle</span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
        <div
          className={`flex flex-col md:flex-row md:gap-6 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <NavLink
            to="/jeux"
            className={({ isActive }) =>
              `text-white hover:text-yellow-300 transition duration-200 ${
                isActive ? "font-bold underline" : ""
              }`
            }
          >
            Jeux
          </NavLink>
          <NavLink
            to="#apropos"
            className={({ isActive }) =>
              `text-white hover:text-yellow-300 transition duration-200 ${
                isActive ? "font-bold underline" : ""
              }`
            }
          >
            À propos
          </NavLink>
          <NavLink
            to="#contact"
            className={({ isActive }) =>
              `text-white hover:text-yellow-300 transition duration-200 ${
                isActive ? "font-bold underline" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>

      <div className="relative mt-8">
        <h2 className="text-2xl text-center text-white font-bold mb-4">
          Explorez le Header Interactif!
        </h2>
      </div>
    </header>
  );
};

export default Header;
