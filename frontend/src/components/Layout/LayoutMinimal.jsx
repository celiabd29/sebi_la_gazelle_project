import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/img/logo-sebi.webp";
import React from "react";
import { SoundProvider } from "../../contexts/SoundProvider";
import SoundLogic from "../../contexts/SoundLogic";

const LayoutMinimal = () => {
  return (
    <SoundProvider>
      <SoundLogic />
      <div className="w-full min-h-screen bg-transparent">
        <header className="w-full flex justify-center py-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
          </Link>
        </header>
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </SoundProvider>
  );
};

export default LayoutMinimal;
