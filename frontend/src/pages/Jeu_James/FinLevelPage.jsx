import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReturnButton from "../../components/button-return";
import SettingsButton from "../../components/button-settings";
import StarFull from "../../assets/img/icons/star_big.svg";
import StarEmpty from "../../assets/img/icons/star_small.svg";
import JamesBravo from "../../assets/img/james_le_hibou-heureux.webp";
import JamesFail from "../../assets/img/james_le_hibou_pleure.webp";
import EtoileLumiere from "../../assets/img/etoile-lumiere.webp";
import Classement from "../../assets/img/classement-mobile.webp";
import ClassementMobile from "../../assets/img/classement.webp";

const FinLevelPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [topScores, setTopScores] = useState([]);

  const isFail = searchParams.get("fail") === "true";
  const score = parseInt(searchParams.get("score")) || 0;
  const stars = parseInt(searchParams.get("stars")) || 0;

  useEffect(() => {
    fetch(`/api/scores/level/${id}`)
      .then((res) => res.json())
      .then((data) => setTopScores(data.slice(0, 3)))
      .catch((err) => console.error("Erreur chargement classement:", err));
  }, [id]);

  const renderStars = () =>
    Array.from({ length: 3 }).map((_, i) => (
      <img
        key={i}
        src={i < stars ? StarFull : StarEmpty}
        alt="star"
        className={`w-8 h-8 mx-1 ${i === 1 ? "-mt-4" : "mt-0"}`}
      />
    ));

  return (
    <div
      className={`min-h-screen relative flex items-center justify-center px-4 pt-10 pb-6 ${
        isFail ? "bg-red-200" : "bg-green-200"
      }`}
    >
      <ReturnButton />
      <SettingsButton />

      {/* Classement desktop */}
      <div
        className="absolute flex items-center left-10 hidden lg:block w-[17.4rem] h-[35.2rem] p-3 bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${Classement})` }}
      >
        <div className="text-center text-white font-medium mb-2 mt-4 text-xl font-fredoka">
          🏆 TOP 3
        </div>
        {topScores.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded-md px-2 py-1 mb-2 shadow-sm"
          >
            <span className="text-sm font-bold text-gray-800">
              {index + 1}.
            </span>
            <span className="text-sm text-gray-600 truncate w-[70px]">
              {entry.username}
            </span>
            <span className="text-sm font-bold text-yellow-600">
              {entry.score}
            </span>
          </div>
        ))}
      </div>

      {/* Partie centrale */}
      <div className="flex flex-col items-center text-center mt-24 md:mt-0">
        <div className="flex gap-1 mb-3">{renderStars()}</div>

        <h2 className="text-lg text-white mb-2 font-fredoka">
          {t("level")} {id}
        </h2>
        <h1 className="text-6xl font-bold text-white mb-4 font-fredoka">
          {isFail ? t("fail") : t("congrats")}
        </h1>

        <div className="relative w-[16rem] md:w-[26rem] h-[16rem] md:h-[22rem] mb-2 flex items-center justify-center">
          <img
            src={EtoileLumiere}
            alt="Lumière"
            className="absolute w-full h-full animate-pulse"
          />
          <img
            src={isFail ? JamesFail : JamesBravo}
            alt="James"
            className="relative z-10 w-[10rem] md:w-[14rem] h-[10rem] md:h-[14rem] rounded-full"
          />
        </div>

        <p className="text-white font-bold text-xl mb-4">{t("score")}</p>
        <div className="mb-6 px-14 py-2 bg-black bg-opacity-10 rounded-xl shadow text-2xl font-bold text-pink-500">
          {score}
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => navigate(`/jeuxJames/game/${id}`)}
            className="bg-yellow-300 hover:bg-yellow-400 rounded-full w-14 h-14 text-2xl font-bold shadow"
          >
            ↻
          </button>
          <button
            onClick={() => navigate(`/jeuxJames/tableau`)}
            className="bg-blue-300 hover:bg-blue-400 rounded-full w-14 h-14 text-2xl font-bold shadow"
          >
            ⌂
          </button>
          {!isFail && parseInt(id) < 5 && stars >= 2 && (
            <button
              onClick={() => navigate(`/jeuxJames/level/${parseInt(id) + 1}`)}
              className="bg-green-300 hover:bg-green-400 rounded-full w-14 h-14 text-2xl font-bold shadow"
              title={t("next_level")}
            >
              ➜
            </button>
          )}
        </div>

        {/* Classement mobile */}
        <div
          className="block lg:hidden mt-10 w-[20rem] h-[24vh] bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${ClassementMobile})` }}
        />
      </div>
    </div>
  );
};

export default FinLevelPage;
