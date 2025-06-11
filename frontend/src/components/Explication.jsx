import ludique from "../assets/img/icons/ludique.png";
import fun from "../assets/img/icons/fun.png";
import concentration from "../assets/img/icons/concentration.png";
import { motion } from "framer-motion";

const Explication = () => {
  const explications = [
    {
      id: 1,
      image: ludique,
      title: "Ludique",
      description:
        "Des jeux ludiques pour apprendre en s'amusant ! Chaque activité est pensée pour rendre les apprentissages joyeux et stimulants.",
      bgColor: "bg-fondTurquoise",
      shadowColor: "shadow-teal-300",
    },
    {
      id: 2,
      image: fun,
      title: "Fun",
      description:
        "Prêt à t’amuser tout en développant tes super pouvoirs de calcul et de mémoire ? Viens découvrir nos jeux avec Sebi la Gazelle et ses amis !",
      bgColor: "bg-fondRoseFonce",
      shadowColor: "shadow-pink-300",
    },
    {
      id: 3,
      image: concentration,
      title: "Concentration",
      description:
        "Nos jeux t’aideront à améliorer ta concentration tout en relevant des défis excitants ! Sois attentif pour réussir chaque niveau.",
      bgColor: "bg-fondjauneFonce",
      shadowColor: "shadow-yellow-300",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="container mx-auto text-center">
        {/* Grille des blocs */}
        <div
          className="grid gap-8 
          p-7
          mobile:grid-cols-1 
          tablette:grid-cols-2 
          pc:grid-cols-3"
        >
          {explications.map((explication) => (
            <motion.div
              key={explication.id}
              className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:scale-105 ${explication.bgColor} ${explication.shadowColor}`}
              whileHover={{
                scale: 1.1,
                rotate: 2,
              }}
              whileTap={{
                scale: 0.95,
                rotate: -2,
              }}
            >
              {/* Image avec animation */}
              <motion.img
                src={explication.image}
                alt={explication.title}
                className="w-16 h-16 mb-4 tablette:w-16 tablette:h-16"
              />

              {/* Titre */}
              <motion.h3
                className="text-lg font-extrabold text-teal-900 mb-2 tablette:text-xl"
                whileHover={{ scale: 1.05 }}
              >
                {explication.title}
              </motion.h3>

              {/* Description */}
              <p className="text-sm text-gray-700 font-medium text-center tablette:text-base">
                {explication.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explication;
