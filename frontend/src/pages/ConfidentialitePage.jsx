import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Layout/Footer";
import { useLocation } from "react-router-dom";

import footerVert from "../assets/img/footer/footer_vert.png";
import footerJaune from "../assets/img/footer/footer_jaune.png";

const ConfidentialitePage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  let backgroundImage = footerVert;
  if (location.pathname === "/jeux" || location.pathname === "/personnages") {
    backgroundImage = footerJaune;
  }

  return (
    <div className="bg-white min-h-screen ">
      <h1 className="text-4xl md:text-5xl font-bold text-center font-[Fredoka] mt-20 mb-10">
        {t("privacy.title")}
      </h1>

      <div className="bg-green-100 rounded-3xl p-6 md:p-10 text-[#333] max-w-4xl mx-auto font-[Fredoka] text-lg space-y-6">
        <p>{t("privacy.intro")}</p>

        <div>
          <h2 className="font-bold text-xl mb-1">{t("privacy.1.title")}</h2>
          <p>{t("privacy.1.desc")}</p>
          <ul className="list-disc list-inside pl-4">
            <li>{t("privacy.1.item1")}</li>
            <li>{t("privacy.1.item2")}</li>
            <li>{t("privacy.1.item3")}</li>
          </ul>
          <p className="mt-2">{t("privacy.1.note")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-1">{t("privacy.2.title")}</h2>
          <p>{t("privacy.2.desc")}</p>
          <ul className="list-disc list-inside pl-4">
            <li>{t("privacy.2.item1")}</li>
            <li>{t("privacy.2.item2")}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-1">{t("privacy.3.title")}</h2>
          <p>{t("privacy.3.desc")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-1">{t("privacy.4.title")}</h2>
          <p>{t("privacy.4.desc")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-1">{t("privacy.5.title")}</h2>
          <p>{t("privacy.5.desc")}</p>
          <ul className="list-disc list-inside pl-4">
            <li>{t("privacy.5.item1")}</li>
            <li>{t("privacy.5.item2")}</li>
          </ul>
          <p className="mt-2">
            {t("privacy.5.note")}
            <br />
            <a
              href="https://www.sebilagazelle.fr/contact"
              className="text-blue-600 underline"
            >
              www.sebilagazelle.fr/contact
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-1">{t("privacy.6.title")}</h2>
          <p>{t("privacy.6.desc")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-1">{t("privacy.7.title")}</h2>
          <p>{t("privacy.7.desc")}</p>
          <ul className="list-disc list-inside pl-4">
            <li>{t("privacy.7.item1")}</li>
            <li>{t("privacy.7.item2")}</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfidentialitePage;
