import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const SectionJeux = ({ afficherDesc = true }) => {
  const games = [
    {
      id: 1,
      title: "Les aventures de James le Hibou",
      description:
        "Sebi la gazelle t'invite à jouer avec elle pour compter ensemble ! Son copain James le hibou adore les nombres. Il va te poser des petits calculs, et tu devras trouver la réponse super vite, avant que le temps ne soit écoulé ! Plus tu gagnes des points, plus les calculs deviennent difficiles ! Tu es prêt(e) à relever le défi ?",
      image: "src/img/fonds/james-fond.png",
    },
    {
      id: 2,
      title: "Les cachotteries de Drys le l'écureuil",
      description:
        "Oh là là, Drys l’écureuil est un petit coquin, il mange en cachette ! Viens aider Sebi la gazelle à retrouver les petites gourmandises que Drys l’écureuil a cachées sous des gobelets ! Est-ce que tu pourras deviner où il les a mises ? Attention, plus tu avances dans le jeu, plus les gobelets bougeront vite ! Est-ce que tu es prêt(e) à relever le défi ?",
      image: "src/img/fonds/drys-fond.png",
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
                <Link to="/">
                  <img
                    src={game.image}
                    alt={game.title}
                    className={`w-full h-full transition-transform duration-300 object-cover ${
                      game.id === 2 ? "object-bottom" : ""
                    }`}
                  />
                </Link>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-comic font-bold text-teal-700 mb-2">
                  {game.title}
                </h3>
                {afficherDesc && (
                  <p className="text-lg font-comic text-gray-700">
                    {game.description}
                  </p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 mx-auto bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-full font-comic text-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                  Jouez maintenant !
                </motion.button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionJeux;
