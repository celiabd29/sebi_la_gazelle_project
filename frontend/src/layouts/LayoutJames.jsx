import React from "react";
import { Outlet } from "react-router-dom";
import BackgroundSoundJames from "../components/compo_jeux/BackgroundSoundJames";

const LayoutJames = () => {
  return (
    <>
      <BackgroundSoundJames />
      <Outlet />
    </>
  );
};

export default LayoutJames;
