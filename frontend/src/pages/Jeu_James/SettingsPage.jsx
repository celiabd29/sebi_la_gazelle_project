import React from "react";
import ReturnButton from "../../components/compo_jeux/ReturnButton";
import BlocSonLang from "../../components/compo_jeux/BlocSonLang";

const SettingPage = () => {
  return (
    <div>
      <ReturnButton />
      <h2 className="text-6xl mt-20 font-bold text-center text-black font-[Fredoka]">
        Paramètres
      </h2>
      <div className="flex justify-center items-center mt-40">
        <BlocSonLang />
      </div>
    </div>
  );
};

export default SettingPage;
