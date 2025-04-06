import CarrowselPersonnages from "../components/carrowselPersonnages";
import HeroSectionPerso from "../components/heroSectionPerso";
import Footer from "../components/Layout/footer";
import { useLocation } from "react-router-dom";

import footerVert from "../assets/img/footer/footer_vert.png";
import footerRose from "../assets/img/footer/footer_rose.png";

const Personnages = () => {
  const location = useLocation();

  let backgroundImage = footerRose;
  if (location.pathname === "/jeux" || location.pathname === "/personnages") {
    backgroundImage = footerRose;
  }

  return (
    <div>
      <HeroSectionPerso />
      <CarrowselPersonnages />

      {/* ✅ applique directement les styles au composant Footer */}
      <Footer
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="relative bg-cover bg-no-repeat text-white pt-28 bg-right tablette:bg-top-right"
      />
    </div>
  );
};

export default Personnages;
