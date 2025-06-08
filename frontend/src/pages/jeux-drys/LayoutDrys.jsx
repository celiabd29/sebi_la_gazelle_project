// src/pages/jeux-drys/LayoutDrys.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { SoundProvider } from "../../contexts/SoundProvider";

const LayoutDrys = () => {
  return (
    <SoundProvider>
      <Outlet />
    </SoundProvider>
  );
};

export default LayoutDrys;
