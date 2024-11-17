import { useState } from "react";
import JamesFond from "../img/james-fond.png";
import DrysFond from "../img/drys-fond.png";

const SectionJeux = () => {
  const jeux = [
    {
      id: 1,
      title: "Jeu 1",
      image: JamesFond,
      description: "Un jeu éducatif pour les enfants.",
    },
    {
      id: 2,
      title: "Jeu 2",
      image: DrysFond,
      description: "Un autre jeu amusant et interactif.",
    },
  ];

  // Utilisation de useState pour gérer les jeux
  const [LesJeux] = useState(jeux);

  return (
      <section id="jeux" className="mb-16">
        <h2 className=" text-3xl font-bold text-center mb-8">LES JEUX</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {LesJeux.map((jeu) => (
            <div
              key={jeu.id}
              className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex flex-col justify-between p-4 shadow-lg"
            >
              <img
                src={jeu.image}
                alt={jeu.title}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold">{jeu.title}</h3>
                <p className="text-gray-600">{jeu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
};

export default SectionJeux;
