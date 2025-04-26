import Explication from "../components/explication";
import SectionJeux from "../components/SectionJeux";
import HeroSectionGame from "../components/heroSectionGame";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/footer";
import { useLocation } from "react-router-dom";
import footerVert from "../assets/img/footer/footer_vert.png";
import footerMarron from "../assets/img/footer/footer_marron.png";
const Jeux = () => {
  const location = useLocation();

  let backgroundImage = footerMarron;
  if (location.pathname === "/jeux" || location.pathname === "/personnages") {
    backgroundImage = footerMarron;
  }

  return (
    <div>
      <Header />
      <HeroSectionGame />
      <SectionJeux afficherDesc={false} />
      <Explication />
      <Footer
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="relative bg-cover bg-no-repeat text-white pt-28 bg-right tablette:bg-top-right"
      />
    </div>
  );
};

export default Jeux;
