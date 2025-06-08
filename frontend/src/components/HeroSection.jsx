import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import titre from "../assets/img/titre.png";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="
        w-full h-[50vh] md:h-[100vh] mt-20 md:mt-0
        bg-[url('/src/assets/img/accueil/page-accueil-440.png')]
        tablette:bg-[url('/src/assets/img/accueil/page-accueil-930.png')]
        pc:bg-[url('/src/assets/img/accueil/page-accueil-1440.jpg')]
        fixe:bg-[url('/src/assets/img/accueil/page-accueil-1920.jpg')]
        bg-cover bg-bottom bg-no-repeat
        flex flex-col items-center justify-center text-center
        relative
      "
    >
      <img
        src={titre}
        alt="titre du site"
        className="hidden md:block absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-[40%]"
      />
      <Link
        to="/jeux"
        className="
          absolute bottom-10
          bg-yellow-500 text-pink-700 text-lg font-semibold 
          px-6 py-3 rounded-full shadow 
          hover:bg-yellow-600 transition animate-bounce
        "
      >
        {t("play")}
      </Link>
    </section>
  );
};

export default HeroSection;
