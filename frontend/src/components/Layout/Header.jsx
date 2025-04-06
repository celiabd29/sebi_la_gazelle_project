import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoSite from "../../assets/img/logo-sebi.webp";
import { UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const noBannerRoutes = ["/connexion", "/inscription"];
  const isNoBannerPage = noBannerRoutes.includes(location.pathname);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isNoBannerPage) return null;

  const links = [
    { name: t("home"), path: "/" },
    { name: t("games"), path: "/jeux" },
    { name: t("characters"), path: "/personnages" },
    { name: t("contact"), path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-[1px] border-b border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={LogoSite}
            alt="Logo Sebi"
            className="w-16 hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-12 font-fredoka">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `text-xl font-regular transition px-4 py-1 rounded-full ${
                  isActive
                    ? "bg-fondVertMoyen text-black shadow-md"
                    : "hover:text-fondOrange text-black"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Icône profil + langue en desktop */}
        <div className="hidden lg:flex items-center gap-6 mr-2">
          <Link to="/connexion" className="hover:scale-110 transition">
            <UserCircle
              size={28}
              className="text-black hover:text-fondOrange"
            />
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Burger menu mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-3xl focus:outline-none"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-2/3 z-[999] 
          bg-white shadow-xl transition-all duration-300 ease-in-out transform
          ${
            isMenuOpen
              ? "translate-x-0"
              : "translate-x-full pointer-events-none"
          }
        `}
      >
        {/* Bouton fermeture */}
        <button
          className="absolute top-4 right-4 text-3xl font-bold text-black focus:outline-none"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        <div className="flex flex-col items-center justify-center gap-6 mt-20">
          {[...links, { name: "Connexion", path: "/connexion" }].map(
            (link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-lg font-semibold hover:text-fondOrange transition ${
                    isActive ? "text-fondOrange font-bold" : "text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          )}

          {/* Langue en mobile */}
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
