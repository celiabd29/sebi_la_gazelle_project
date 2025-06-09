import Header from "../components/Layout/Header";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import JamesCard from "../assets/img/fonds/james-fond.png";
import DrysCard from "../assets/img/fonds/drys-fond.webp";
import Background from "../assets/img/accueil/jeux.webp";
import sebi from "../assets/img/fonds/sebi.png";
import drys from "../assets/img/fonds/drys_debout.png";
import james from "../assets/img/fonds/james-debout.png";

const Jeux = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <section
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat pt-28 px-4 md:px-10"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm z-0" />

        <div className="relative z-10 flex flex-col items-center gap-12 md:gap-24 mt-16 md:mt-28">
          {/* Cartes de jeux */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
            {/* James */}
            <Link
              to="/jeuxJames"
              className="flex flex-col items-center group gap-y-4"
            >
              <img
                src={JamesCard}
                alt="James le hibou"
                className="w-[18rem] h-[14rem] md:w-[30rem] md:h-[23rem] rounded-[2.5rem] shadow-md hover:scale-105 transition duration-300 object-cover"
              />
              <p className="text-black text-xl md:text-2xl text-center">
                {t("game_james")}
              </p>
            </Link>

            {/* Drys */}
            <Link
              to="/jeuxDrys"
              className="flex flex-col items-center group gap-y-4"
            >
              <img
                src={DrysCard}
                alt="Drys l'écureuil"
                className="w-[18rem] h-[14rem] md:w-[30rem] md:h-[23rem] rounded-[2.5rem] shadow-md hover:scale-105 transition duration-300 object-cover"
              />
              <p className="text-black text-xl md:text-2xl text-center">
                {t("game_drys")}
              </p>
            </Link>
          </div>

          {/* 🔐 Lien vers contrôle parental */}
          <div className="mt-4 md:mt-0 text-center">
            <Link
              to="/controle-parental"
              className="text-sm text-blue-700 underline hover:text-blue-900 transition"
            >
              {t("parental_access") || "Accéder au contrôle parental"}
            </Link>
          </div>

          {/* Personnages sur les côtés */}
          <div className="relative w-full mt-6 md:mt-[-7rem]">
            <img
              src={drys}
              alt="Drys personnage"
              className="absolute left-0 bottom-0 w-24 sm:w-32 md:w-40 lg:w-[29rem] object-contain"
            />
            <img
              src={sebi}
              alt="Sebi personnage"
              className="mx-auto w-28 sm:w-36 md:w-44 lg:w-[20rem] object-contain"
            />
            <img
              src={james}
              alt="James personnage"
              className="absolute right-0 bottom-0 w-24 sm:w-32 md:w-40 lg:w-[29rem] object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jeux;
