import { useTranslation } from "react-i18next";

const Mentions = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto text-black font-comic">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 font-fredoka">
        {t("mentions.title", "Mentions Légales")}
      </h1>

      <p className="mb-6">
        <strong>{t("mentions.site", "Site")}</strong> : Sebi la gazelle
      </p>

      <p className="mb-6">
        <strong>{t("mentions.editeur", "Éditeur")}</strong> : Sebi Team,
        contact@sebiteam.com
      </p>

      <p className="mb-6">
        <strong>{t("mentions.hebergeur", "Hébergeur")}</strong> : o2switch, 222
        Boulevard Gustave Flaubert, 63000 Clermont-Ferrand
      </p>

      <p className="mb-6">
        {t(
          "mentions.text",
          "Toutes les images, textes et contenus présents sur ce site sont la propriété de Sebi la gazelle. Toute reproduction est interdite sans autorisation écrite."
        )}
      </p>

      <p className="text-sm text-gray-600 mt-10 text-center">
        © {new Date().getFullYear()} Sebi la gazelle —{" "}
        {t("mentions.rights", "Tous droits réservés.")}
      </p>
    </div>
  );
};

export default Mentions;
