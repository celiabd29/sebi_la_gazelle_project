import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReturnButton from "../../components/button-return";
import SettingsButton from "../../components/button-settings";
import Roll from "../../assets/img/Roll.webp";
import RollMobile from "../../assets/img/RollMobile.webp";
import Banderole from "../../assets/img/Banderole.webp";
import TheTask from "../../assets/img/The_task.webp";
import Classement from "../../assets/img/classement.webp";

function LevelPageDrys() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const levelNumber = id ? parseInt(id, 10) : null;

  // 🔒 Protection si niveau invalide
  useEffect(() => {
    if (!levelNumber || levelNumber < 1 || levelNumber > 5) {
      navigate("/jeuxDrys/PalierPage");
    }
  }, [levelNumber, navigate]);

  const getLevelContent = (level) => {
    switch (level) {
      case 1:
        return t("drys_level_1_text");
      case 2:
        return t("drys_level_2_text");
      case 3:
        return t("drys_level_3_text");
      case 4:
        return t("drys_level_4_text");
      case 5:
        return t("drys_level_5_text");
      default:
        return t("drys_level_default_text");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      <ReturnButton />
      <SettingsButton />

      {/* Mobile */}
      <div
        className="relative z-8 w-[95%] max-w-[36rem] md:hidden h-[90vh] bg-no-repeat bg-contain bg-center mt-10"
        style={{ backgroundImage: `url(${RollMobile})` }}
      >
        <Content
          levelNumber={levelNumber}
          getLevelContent={getLevelContent}
          navigate={navigate}
          t={t}
        />
      </div>

      {/* Desktop */}
      <div
        className="relative z-8 hidden md:block w-[50rem] lg:w-[61.3rem] h-[80vh] bg-no-repeat bg-contain bg-center mt-14"
        style={{ backgroundImage: `url(${Roll})` }}
      >
        <Content
          levelNumber={levelNumber}
          getLevelContent={getLevelContent}
          navigate={navigate}
          t={t}
        />
      </div>
    </div>
  );
}

function Content({ levelNumber, getLevelContent, navigate, t }) {
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center"
      style={{ fontFamily: "Fredoka" }}
    >
      <div
        className="w-[14rem] h-[10.2vh] flex items-center justify-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${Banderole})` }}
      >
        <h1 className="text-2xl text-white font-medium mb-6">
          {t("level")} {levelNumber}
        </h1>
      </div>

      <div
        className="mt-8 w-[18rem] h-[20.7vh] flex items-end justify-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${TheTask})` }}
      >
        <p className="text-base text-[#DF514E] text-center mb-5 px-6">
          {getLevelContent(levelNumber)}
        </p>
      </div>

      <div
        className="mt-12 w-[20rem] h-[24vh] bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${Classement})` }}
      />

      <button
        onClick={() => navigate(`/jeuxDrys/game/${levelNumber}`)}
        className="bg-[#BDFEC4] font-bold text-black text-2xl mt-5 px-9 py-2 rounded-lg shadow-md hover:bg-[#FF6D83] transition-all"
      >
        {t("start")}
      </button>
    </div>
  );
}

export default LevelPageDrys;
