import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { SoundProvider } from "./contexts/SoundProvider";

export const ConditionalProviders = () => {
  const location = useLocation();

  const isDrys = location.pathname.startsWith("/jeuxDrys");

  return isDrys ? (
    <SoundProvider>
      <Outlet />
    </SoundProvider>
  ) : (
    <Outlet />
  );
};
