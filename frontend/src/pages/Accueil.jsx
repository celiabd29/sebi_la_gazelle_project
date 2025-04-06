import Header from "../components/Layout/Header";
import HeroSection from "../components/HeroSection";
import Avis from "../components/Avis";
import SectionJeux from "../components/SectionJeux";
import APropos from "../components/APropos";
import Footer from "../components/Layout/Footer";
import { useLocation } from "react-router-dom";

import footerVert from "../assets/img/footer/footer_vert.png";
import footerRose from "../assets/img/footer/footer_rose.png";

const Accueil = () => {
  const location = useLocation();

  // Détermine l’image de fond du footer
  let backgroundImage = footerVert;
  if (location.pathname === "/jeux" || location.pathname === "/personnages") {
    backgroundImage = footerRose;
  }

  return (
    <div>
      <Header />
      <HeroSection />
      <SectionJeux />
      <APropos />
      <Avis />
      <Footer backgroundImage={backgroundImage} />
    </div>
  );
};

export default Accueil;
