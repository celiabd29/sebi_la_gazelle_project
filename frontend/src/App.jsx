import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LayoutPrincipal from "./components/Layout/LayoutPrincipal";
import LayoutMinimal from "./components/Layout/LayoutMinimal";

// Tu peux ajouter ici les routes qui doivent avoir le LayoutMinimal
const minimalRoutes = [
  "/jeuxDrys/GamePage",
  "/jeuxDrys/PalierPage",
  "/jeuxDrys/ScorePage",
  "/jeuxDrys/SettingPage",
  "/jeuxJames/game/",
  "/jeuxJames/settings",
  "/jeuxJames/tableau",
  "/jeuxJames/level/",
  "/jeuxJames/fin/",
];

const App = () => {
  const location = useLocation();
  const isMinimal = minimalRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return isMinimal ? (
    <LayoutMinimal>
      <Outlet />
    </LayoutMinimal>
  ) : (
    <LayoutPrincipal>
      <Outlet />
    </LayoutPrincipal>
  );
};

export default App;
