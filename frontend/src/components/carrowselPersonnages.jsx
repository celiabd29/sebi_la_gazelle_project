import { useTranslation } from "react-i18next";
import celiaFond from "../assets/img/fonds/celia-fond.png";
import charlyFond from "../assets/img/fonds/charly-fond.png";
import jamesFond from "../assets/img/fonds/james-fond.png";
import melFond from "../assets/img/fonds/mel-fond.png";
import nourFond from "../assets/img/fonds/nour-fond.png";
import drysFond from "../assets/img/fonds/drys-fond.webp";
import sebiFond from "../assets/img/fonds/sebi-fond.webp";
import noahFond from "../assets/img/fonds/noah-fond.webp";

const CarrowselPersonnages = () => {
  const carrowselPerso = [
    {
      id: 1,
      name: "Célia",
      img: celiaFond,
      description: "Célia est une aventurière curieuse et dynamique.",
      // bgColor: "bg-fondGris",
    },
    {
      id: 2,
      name: "Charly",
      img: charlyFond,
      description: "Charly adore résoudre des énigmes et explorer de nouveaux mondes.",
      // bgColor: "bg-fondVertFonce",
    },
    {
      id: 3,
      name: "James",
      img: jamesFond,
      description: "James est le sage de l'équipe, toujours prêt à partager ses connaissances.",
      // bgColor: "bg-fondjauneFonce",
    },
    {
      id: 4,
      name: "Mél",
      img: melFond,
      description: "Mél est une artiste passionnée, créant de la magie avec ses dessins.",
    },
    {
      id: 5,
      name: "Nour",
      img: nourFond,
      description: "Nour est une grande stratège, prête à relever tous les défis.",
    },
    {
      id: 6,
      name: "Drys",
      img: drysFond,
      description: "Drys est un esprit libre, aimant l'aventure et les jeux.",
    },
  ];

  return (
    <section className="md:mt-24 py-20 px-4 bg-fondRose rounded-t-[7rem]">
      <h2 className="text-center text-3xl md:text-4xl font-semibold font-fredoka text-black mb-10">
        {t("characterSection.title")}
      </h2>

      <div className="flex overflow-x-auto snap-x space-x-6 pb-8 max-w-full">
        {characterSection.map((perso) => (
          <div
            key={perso.id}
            className="snap-center flex-shrink-0 w-[90%] sm:w-[45%] lg:w-[30%] bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={perso.img}
                className="w-full h-64 object-cover"
                alt={perso.name}
              />
              <div className="p-4 bg-gray-800 text-gray-100">
                <h5 className="text-lg font-semibold">{perso.name}</h5>
                <p className="text-sm mt-2">{perso.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarrowselPersonnages;
