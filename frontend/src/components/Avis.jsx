import { useState } from "react";
import { motion } from "framer-motion";

const HomePages = () => {
  const [avisActif, setAvisActif] = useState(0);
  // avisActif contient l'index de l'avis actuellement affiché.
  // avisActif vaut 0, ce qui signifie que le premier avis du tableau avis sera affiché au chargement.
  // setAvisActif permet de changer cet index lorsque l'utilisateur clique sur un bouton.

  const avis = [
    {
      id: 1,
      message: "“Mon fils a vraiment adoré le jeu de James ! C'est super de voir un jeu qui stimule son esprit stratégique tout en le divertissant. Je recommande ce jeu aux parents qui cherchent une expérience amusante et éducative pour leurs enfants”",
      auteur: "Khames",
      note: 5,
    },
    {
      id: 2,
      message: "So fun and educational!",
      auteur: "OH LE SITE DE MALADEEEEEEEE",
      note: 5,
    },
    {
      id: 3,
      message: "Best children's game site!",
      auteur: "JE VEUX MANGER QUIK",
      note: 5,
    },
  ];

  return (
    <div>
      {/* Games Section */}

      

      {/* Reviews Section */}
      <section
        id="reviews"
        className="py-16 px-4 bg-gradient-to-br from-amber-100 via-yellow-200 to-lime-100"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-comic font-bold text-center mb-12 text-yellow-700">
            Ils nous ont fait confiance !
          </h2>
          <div className="relative bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
            <motion.div
              key={avisActif}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <p className="text-2xl font-comic text-gray-700 mb-4">
                {avis[avisActif].message}
              </p>{" "}
              {/* texte de l'avis actuellement sélectionné. */}
              <p className="font-comic font-semibold text-xl text-yellow-700">
                {avis[avisActif].auteur}
              </p>
              {/* auteur de l'avis actuellement sélectionné. */}
              <i className=""> </i>
            </motion.div>
            <div className="flex justify-center mt-6 gap-3">
              {avis.map((_, index) => (
                // i 'index de l'élément dans le tableau. 
                // _ est utilisé pour ignorer l'élément lui-même, car nous n'en avons pas besoin ici.
                <button
                  key={index} // key est nécessaire pour React pour identifier chaque élément de la liste.
                  onClick={() => setAvisActif(index)} // Lorsque l'utilisateur clique sur un bouton, setAvisActif(i) est appelé pour changer l'avis actif.
                  className={`w-4 h-4 rounded-full ${
                    index === avisActif ? "bg-yellow-500 scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePages;
