import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import titre from "../assets/img/titre.png";

// ✅ IMPORTS D'IMAGES CORRECTS
import jamesFond from "../assets/img/fonds/james-fond.png";
import drysFond from "../assets/img/fonds/drys-fond.webp";

const SectionJeux = ({ afficherDesc = true }) => {
  const { t } = useTranslation();

  const games = [
    {
      id: 1,
      title: t("game1.title"),
      description: t("game1.description"),
      image: jamesFond, // ✅ image importée
      link: "/jeuxJames",
    },
    {
      id: 2,
      title: t("game2.title"),
      description: t("game2.description"),
      image: drysFond, // ✅ image importée
      link: "/jeuxDrys",
    },
  ];

  return (
    <section
      id="games"
      className="py-16 px-4 bg-gradient-to-br from-teal-100 via-green-200 to-lime-200  bg-fondVert"
    >
      <div className="container mx-auto  ">
        <h2 className="text-4xl md:text-5xl font-comic font-bold text-center mb-12 text-teal-700">
          Jeux
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {games.map((game) => (
            <div
              key={game.id}
              className="rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Link to="/jeuxDrys">
                  <img
                    src={game.image}
                    alt={game.title}
                    className={`w-full h-full transition-transform duration-300 object-cover ${
                      game.id === 2 ? "object-bottom" : ""
                    }`}
                  />
                </Link>

                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-comic font-bold text-teal-700 text-center mb-2">
                      {game.title}
                    </h3>
                    {afficherDesc && (
                      <p className="text-lg font-comic text-gray-700 text-center">
                        {game.description}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center mt-4">
                    <Link to={game.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-full font-comic text-xl font-semibold hover:shadow-lg transition-all"
                      >
                        {t("playNow")}
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionJeux;
