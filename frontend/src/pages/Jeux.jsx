import Header from "../components/Layout/Header";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import JamesCard from "../assets/img/fonds/james-fond.png";
import DrysCard from "../assets/img/fonds/drys-fond.webp";
import Background from "../assets/img/accueil/jeux.webp";

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

        <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-24 mt-16 md:mt-28">
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
      </section>
    </div>
  );
};

export default Jeux;
