import CarrowselPersonnages from "../components/carrowselPersonnages";
import HeroSectionPerso from "../components/heroSectionPerso";
import Footer from "../components/Layout/footer";
import { useLocation } from "react-router-dom";

const Personnages = () => {
  return (
    <div>
      <HeroSectionPerso />
      <CarrowselPersonnages />
      <Footer />
    </div>
  );
};

export default Personnages;
