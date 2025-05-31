import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const HeroSectionGame = () => {
  const { t } = useTranslation();

  return (
    <section
      className="
        w-full h-[50vh] md:h-[100vh] mt-20 md:mt-0
        bg-[url('/src/assets/img/accueil/jeux.webp')]
        tablette:bg-[url('/src/assets/img/accueil/jeux.webp')]
        pc:bg-[url('/src/assets/img/accueil/jeux.webp')]
        fixe:bg-[url('/src/assets/img/accueil/jeux.webp')]
        bg-cover bg-center bg-no-repeat
        flex flex-col items-center justify-center text-center
        relative
      "
    ></section>
  );
};

export default HeroSectionGame;
