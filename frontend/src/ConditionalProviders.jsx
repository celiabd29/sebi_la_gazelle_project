import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { SoundProvider } from "./contexts/SoundProvider";

export const ConditionalProviders = () => {
  const location = useLocation();

  const isJeu =
    location.pathname.startsWith("/jeuxDrys") ||
    location.pathname.startsWith("/jeuxJames");

  return isJeu ? (
    <SoundProvider>
      <Outlet />
    </SoundProvider>
  ) : (
    <Outlet />
  );
};
