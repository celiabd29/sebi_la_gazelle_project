import { useTranslation } from "react-i18next";
import celiaFond from "../assets/img/fonds/celia-fond.png";
import charlyFond from "../assets/img/fonds/charly-fond.png";
import jamesFond from "../assets/img/fonds/james-fond.png";
import melFond from "../assets/img/fonds/mel-fond.png";
import nourFond from "../assets/img/fonds/nour-fond.png";
import drysFond from "../assets/img/fonds/drys-fond.webp";
import sebiFond from "../assets/img/fonds/sebi-fond.webp";
import noahFond from "../assets/img/fonds/noah-fond.webp";

const CarrouselPersonnages = () => {
  const { t } = useTranslation();

  const characterSection = [
    { id: 1, name: "Sebi la gazelle", key: "sebi", img: sebiFond },
    { id: 2, name: "Célia le perroquet", key: "celia", img: celiaFond },
    { id: 3, name: "Charly le caméléon", key: "charly", img: charlyFond },
    { id: 4, name: "James le hibou", key: "james", img: jamesFond },
    { id: 5, name: "Mel la marmotte", key: "mel", img: melFond },
    { id: 6, name: "Nour le Rossignol", key: "nour", img: nourFond },
    { id: 7, name: "Drys l'écureuil", key: "drys", img: drysFond },
    { id: 8, name: "Noah le renard", key: "noah", img: noahFond },
  ];

  return (
    <section className="md:mt-24 py-20 px-4 md:rounded-[7rem] mt-24 bg-fondRose rounded-[4rem]">
      <h2 className="text-center text-3xl md:text-4xl font-semibold font-fredoka text-black mb-10">
        {t("characterSection.title")}
      </h2>

      <div className="flex overflow-x-auto snap-x space-x-6 pb-8 max-w-full">
        {characterSection.map((perso) => (
          <div
            key={perso.id}
            className="snap-center flex-shrink-0 w-[90%] sm:w-[45%] lg:w-[30%] flex flex-col items-center"
          >
            <img
              src={perso.img}
              alt={perso.name}
              className="rounded-3xl object-cover w-full h-auto max-h-[25rem] shadow-md"
            />
            <div className="rounded-3xl mt-4 p-4 w-full">
              <h3 className="text-2xl text-center text-black mb-2">
                {t(`characterSection.${perso.key}.name`)}
              </h3>
              <p className="text-xl text-center text-black">
                {t(`characterSection.${perso.key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarrouselPersonnages;
