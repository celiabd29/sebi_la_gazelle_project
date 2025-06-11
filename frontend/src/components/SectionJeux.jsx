import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import imageDrys from "../assets/img/background.png";
import imageJames from "../assets/img/fonds/accueil-james.webp"; // Assuming this is the correct image for James


const SectionJeux = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#E4FFE7] py-16 px-4 md:rounded-[7rem] rounded-[4rem] mt-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl text-black mb-16">
          {t("gamesTitle")}
        </h2>

        {/* Grille des vidéos */}
        <div className="grid md:grid-cols-2 gap-24 mb-16">
          {/* Vidéo James */}
          <div>
            <img
              src={imageJames}
              controls
              className="w-full rounded-3xl shadow-md max-w-xl mx-auto"
            />
            <p className="mt-6 mx-4 text-black text-lg leading-relaxed">
              {t("sectionJeux.james")}
            </p>
          </div>

          {/* Vidéo Drys */}
          <div>
             <img
              src={imageDrys}
              controls
              className="w-full rounded-3xl shadow-md max-w-xl mx-auto"
            />
            <p className="mt-6 mx-4 text-black text-lg leading-relaxed">
              {t("sectionJeux.drys")}
            </p>
          </div>
        </div>

        {/* Bouton vert centré */}
        <Link to="/jeux">
          <button className="bg-[#BDFEC4] hover:bg-[#a9eeb1] text-black px-10 py-3 rounded-full text-lg transition">
            {t("play")}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SectionJeux;
