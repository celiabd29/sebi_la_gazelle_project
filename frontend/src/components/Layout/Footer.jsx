import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LogoSite from "../../assets/img/logo-sebi.webp";
import { Link, useLocation } from "react-router-dom";

import footerVert from "../../assets/img/footer/footer_vert.png";
import footerRose from "../../assets/img/footer/footer_rose.png";
import footerMarron from "../../assets/img/footer/footer_marron.png";
import footerJaune from "../../assets/img/footer/footer_jaune.png";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const navLinks = [
    { label: t("footer.home"), to: "/" },
    { label: t("footer.games"), to: "/jeux" },
    { label: t("footer.characters"), to: "/personnages" },
    { label: t("footer.contact"), to: "/contact" },
  ];

  // Mapping des routes vers les images
  const footerBackgrounds = {
    "/": footerVert,
    "/jeux": footerMarron,
    "/personnages": footerRose,
    "/contact": footerJaune,
  };

  // Image de fond selon la route, valeur par défaut si route non définie
  const backgroundImage = footerBackgrounds[location.pathname] || footerMarron;
  return (
    <footer
      className="relative bg-cover bg-no-repeat pt-28 bg-right tablette:bg-top-right"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto px-4 miniTablette:px-6 tablette:px-10 text-center text-black">
        {/* Logo */}
        <div className="mb-4">
          <Link to="/">
            <img
              src={LogoSite}
              alt="Logo"
              className="mx-auto w-28 h-28 miniTablette:w-36 miniTablette:h-36 tablette:w-44 tablette:h-44"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mb-6">
          <ul className="grid grid-cols-2 text-lg font-fredoka font-medium space-y-1 miniTablette:space-y-0 miniTablette:flex miniTablette:justify-center miniTablette:space-x-10">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="hover:text-fondOrange transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Email + Langue */}
        <div className="flex flex-col miniTablette:flex-row items-center justify-center gap-4 mb-6">
          {/* Langue */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeLanguage("fr")}
              className={`text-base font-fredoka ${
                i18n.language === "fr" ? "font-bold" : ""
              }`}
            >
              🇫🇷
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`text-base font-fredoka ${
                i18n.language === "en" ? "font-bold" : ""
              }`}
            >
              🇬🇧
            </button>
          </div>

          {/* Email */}
          <motion.div
            className="flex items-center"
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="w-64 miniTablette:w-96 p-3 rounded-full text-gray-800 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 ml-3 bg-teal-500 hover:bg-teal-600 rounded-full text-white"
            >
              →
            </motion.button>
          </motion.div>
        </div>

        {/* Mentions légales */}
        <div className="text-center mb-2 text-black">
          <Link to="/mentions" className="font-fredoka hover:text-fondOrange">
            {t("footer.legal")}
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-black font-comic">{t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
