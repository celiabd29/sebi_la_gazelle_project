import { Outlet } from "react-router-dom";
import Header from "./Header";
import { SoundProvider } from "../../contexts/SoundProvider";
import SoundLogic from "../../contexts/SoundLogic"; // crée ce composant si pas encore fait

const LayoutPrincipal = () => {
  return (
    <SoundProvider>
      <SoundLogic />
      <Header />
      <Outlet />
    </SoundProvider>
  );
};

export default LayoutPrincipal;
