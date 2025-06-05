import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import titre from "../assets/img/titre.png";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="
        w-full h-[50vh] tablette:h-[100vh] tablette:mt-0
        bg-[url('/src/assets/img/accueil/page-accueil-440.png')]
        miniTablette:bg-[url('/src/assets/img/accueil/page-accueil-930.png')]
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
        className="hidden tablette:block absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 tablette:w-[40%] font-fredoka"
      />
      <Link
        to="/jeux"
        className="
    absolute bottom-10
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
