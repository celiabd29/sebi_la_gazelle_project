import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import titre from "../assets/img/titre.png";
import sebi from "../assets/img/fonds/sebi.png";
import drys from "../assets/img/fonds/drys_debout.png";
import james from "../assets/img/fonds/james-debout.png";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="
        w-full h-[80vh] md:h-[50vh] tablette:h-[100vh] tablette:mt-0
        bg-[url('/src/assets/img/accueil/background_accueil.png')]
        bg-cover bg-bottom bg-no-repeat
        flex flex-col items-center justify-center text-center
        relative
      "
    >
      {/* Titre visible seulement en tablette/pc */}
      <img
        src={titre}
        alt="titre du site"
        className="hidden tablette:block absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 tablette:w-[40%] font-fredoka"
      />

      {/* Titre mobile */}
      <img
        src={titre}
        alt="titre mobile"
        className="block tablette:hidden w-[90%] mt-[-20rem] mb-3"
      />

      {/* Personnages version responsive */}
      <div className="absolute bottom-32 w-full flex flex-col items-center justify-center tablette:hidden">
        <div className="flex justify-center">
          {/* James */}
          <Link
            to="/jeuxJames"
            className="hover:scale-105 transition-transform duration-300"
          >
            <motion.img
              src={james}
              alt="James"
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.1,
              }}
              className="h-[14rem] "
            />
          </Link>

          {/* Drys */}
          <Link
            to="/jeuxDrys"
            className="hover:scale-105 transition-transform duration-300"
          >
            <motion.img
              src={drys}
              alt="Drys"
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.2,
              }}
              className="h-[14rem]"
            />
          </Link>
        </div>

        {/* Sebi centré dessous */}
        <motion.img
          src={sebi}
          alt="Sebi"
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            delay: 0.3,
          }}
          className="h-[13rem] mt-[-6rem]"
        />
      </div>

      {/* Personnages tablette/pc */}
      <div className="hidden tablette:flex absolute bottom-32 items-end justify-center gap-4 md:gap-8">
        {/* Drys */}
        <Link
          to="/jeuxDrys"
          className="hover:scale-105 transition-transform duration-300"
        >
          <motion.img
            src={drys}
            alt="Drys"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: 0.1,
            }}
            className="h-40 md:h-60 tablette:h-[34rem]"
          />
        </Link>

        {/* Sebi */}
        <motion.img
          src={sebi}
          alt="Sebi"
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            delay: 0.3,
          }}
          className="h-40 md:h-60 tablette:h-[30rem]"
        />

        {/* James */}
        <Link
          to="/jeuxJames"
          className="hover:scale-105 transition-transform duration-300"
        >
          <motion.img
            src={james}
            alt="James"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: 0.5,
            }}
            className="h-40 md:h-60 tablette:h-[34rem]"
          />
        </Link>
      </div>

      {/* Bouton Jouer */}
      <Link
        to="/jeux"
        className="
          absolute bottom-6
          bg-[#BDFEC4] text-[#1B3C2E] font-fredoka text-lg tablette:text-xl
          px-8 py-2 tablette:py-4 rounded-full shadow-md
          transition-transform duration-300 hover:scale-110
        "
      >
        {t("play")}
      </Link>
    </section>
  );
};

export default HeroSection;
