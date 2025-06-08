import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Background from "../assets/img/accueil/personnage.webp";
const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="
        w-full h-[50vh] md:h-[100vh] mt-20 md:mt-0
        bg-cover bg-bottom bg-no-repeat
        flex flex-col items-center justify-center text-center
        relative
      "
      style={{ backgroundImage: `url(${Background})` }}
    ></section>
  );
};

export default HeroSection;
