import Header from "../components/Layout/Header";
import HeroSection from "../components/HeroSection";
import Avis from "../components/Avis";
import SectionJeux from "../components/SectionJeux";
import APropos from "../components/APropos";
import Footer from "../components/Layout/Footer";
import SEOHead from "../components/SEO/SEOHead";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import footerVert from "../assets/img/footer/footer_vert.png";
import footerRose from "../assets/img/footer/footer_rose.png";

const Accueil = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // Détermine l’image de fond du footer
  let backgroundImage = footerVert;
  if (location.pathname === "/jeux" || location.pathname === "/personnages") {
    backgroundImage = footerRose;
  }

  return (
    <div>
      <SEOHead
        title="Accueil"
        description="Découvrez Sebi la Gazelle et ses amis dans des aventures éducatives amusantes. Jeux de calcul avec James le hibou et jeux de mémoire avec Drys l'écureuil pour enfants de 4 à 8 ans."
        keywords="jeux éducatifs, enfants, apprentissage, calcul mental, mémoire, Sebi la gazelle, James le hibou, Drys l'écureuil"
        image="/og-accueil.png"
      />
      <Header />
      <HeroSection />
      <SectionJeux />
      <APropos />
      <Avis />
      <Footer />
    </div>
  );
};

export default Accueil;
