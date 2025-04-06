import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import titre from "../assets/img/titre.png";

const SectionJeux = ({ afficherDesc = true }) => {
  const { t } = useTranslation();

  const games = [
    {
      id: 1,
      title: t("game1.title"),
      description: t("game1.description"),
      image: "src/assets/img/fonds/james-fond.png",
      link: "/jeuxDrys", // tu pourras le rendre dynamique si besoin
    },
    {
      id: 2,
      title: t("game2.title"),
      description: t("game2.description"),
      image: "src/assets/img/fonds/drys-fond.webp",
      link: "/jeuxDrys", // idem
    },
  ];

  return (
    <section>
      <img
        src={titre}
        alt="titre du site"
        className="md:hidden w-4/5 pc:w-1/2 mx-auto my-6"
      />
      <div
        id="games"
        className="md:mt-24 py-16 px-4 bg-gradient-to-br from-teal-100 via-green-200 to-lime-200 bg-fondVert rounded-t-[7rem]"
      >
        <div className="container mx-auto">
          <h2 className="font-fredoka text-4xl md:text-5xl font-semibold text-center mb-12 text-teal-700">
            {t("gamesTitle")}
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
                className="bg-white rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <Link to={game.link}>
                    <img
                      src={game.image}
                      alt={game.title}
                      className={`w-full h-full transition-transform duration-300 object-cover ${
                        game.id === 2 ? "object-bottom" : ""
                      }`}
                    />
                  </Link>
                </div>

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

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mx-auto bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-full font-comic text-xl font-semibold hover:shadow-lg transition-all"
                  >
                    {t("playNow")}
                  </motion.button>
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
