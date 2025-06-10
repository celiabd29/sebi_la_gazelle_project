import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Layout/Footer";

const MentionsLegalesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center font-[Fredoka] mt-20 mb-10">
        {t("legal.title")}
      </h1>

      <div className="bg-yellow-100 rounded-3xl p-6 md:p-10 text-[#333] max-w-4xl mx-auto font-[Fredoka] text-lg space-y-6">
        <section>
          <h2 className="font-bold text-xl mb-1">{t("legal.1.title")}</h2>
          <p>{t("legal.1.desc")}</p>
          <ul className="list-disc list-inside pl-4">
            <li>{t("legal.1.member1")}</li>
            <li>{t("legal.1.member2")}</li>
            <li>{t("legal.1.member3")}</li>
          </ul>
          <p className="mt-2">
            {t("legal.1.contact")}
            <br />
            <a
              href="mailto:contact@sebilagazelle.fr"
              className="text-blue-600 underline"
            >
              contact@sebilagazelle.fr
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-1">{t("legal.2.title")}</h2>
          <p>{t("legal.2.host")}</p>
          <p>
            <strong>o2switch</strong>
            <br />
            SAS au capital de 100 000 €<br />
            RCS Clermont Ferrand – SIRET : 510 909 80700024
            <br />
            222 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand – France
            <br />
            <a
              href="https://www.o2switch.fr"
              className="text-blue-600 underline"
            >
              www.o2switch.fr
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-1">{t("legal.3.title")}</h2>
          <p>{t("legal.3.desc1")}</p>
          <p>{t("legal.3.desc2")}</p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-1">{t("legal.4.title")}</h2>
          <p>
            {t("legal.4.desc1")}{" "}
            <a href="/confidentialite" className="text-blue-600 underline">
              {t("legal.4.link")}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-1">{t("legal.5.title")}</h2>
          <p>{t("legal.5.desc")}</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MentionsLegalesPage;