import { motion } from "framer-motion";
import LogoSite from "../../assets/img/logo-sebi.webp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-no-repeat 
      bg-[url('./assets/img/footer/footer_vert.png')]
      text-white pt-28
        bg-right
        tablette:bg-top-right
      "
    >
      <div className="container mx-auto px-4 miniTablette:px-6 tablette:px-10 text-center">
        {/* Logo */}
        <div className="mb-2">
          <Link
          to="/"
          >
            <img
              src={LogoSite}
              alt="Logo"
              className="mx-auto w-28 h-28 miniTablette:w-36 miniTablette:h-36 tablette:w-44 tablette:h-44"
            />
          </Link>
        </div>

        <nav className="mb-2">
          <ul className=" grid grid-cols-2 space-y-1 text-lg font-bold miniTablette:space-y-0 miniTablette:flex miniTablette:justify-center miniTablette:space-x-10">
            {["Accueil", "Jeux", "Personnages", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text- transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        <motion.div
          className="flex flex-row miniTablette:flex-row justify-center items-center mb-2 space-y-4 miniTablette:space-y-0 "
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <input
            type="email"
            placeholder="you@example.com"
            className="w-64 miniTablette:w-96 p-3 rounded-full text-gray-800 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-3 ml-5 bg-teal-500 hover:bg-teal-600 rounded-full text-white miniTablette:ml-3"
          >
            →
          </motion.button>
        </motion.div>

        <motion.div className="mb-2" transition={{ delay: 0.8, duration: 0.5 }}>
          <a
            href="#"
            className="inline-block text-red-300 hover:text-teal-300 text-2xl transition-colors duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-sm text-gray-600"
          transition={{ delay: 1, duration: 0.5 }}
        >
          ©2024, Sebi La Gazelle. Tous droits réservés.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
