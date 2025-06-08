import React from "react";
import ReturnButton from "../../components/button-return";
import BlocSonLang from "../../components/compo_jeux/BlocSonLang";
import { useTranslation } from "react-i18next";

const SettingPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ReturnButton />
      <h2 className="text-6xl mt-24 font-bold text-center text-black font-[Fredoka]">
        {t("settings.title")}
      </h2>
      <div className="flex justify-center items-center mt-40">
        <BlocSonLang />
      </div>
    </div>
  );
};

export default SettingPage;
