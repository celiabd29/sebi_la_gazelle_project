import CarrowselPersonnages from "../components/carrowselPersonnages";
import HeroSectionPerso from "../components/heroSectionPerso";
import Footer from "../components/Layout/Footer";
import SEOHead from "../components/SEO/SEOHead";
import { useTranslation } from "react-i18next";

const Personnages = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SEOHead
        title={t("characters") || "Personnages"}
        description="Rencontrez Sebi la gazelle, James le hibou, Drys l'écureuil et tous leurs amis ! Découvrez les personnages attachants de nos jeux éducatifs."
        keywords="personnages, Sebi gazelle, James hibou, Drys écureuil, caractères jeux enfants"
        image="/og-personnages.png"
      />
      <HeroSectionPerso />
      <CarrowselPersonnages />
      <Footer />
    </div>
  );
};

export default Personnages;
