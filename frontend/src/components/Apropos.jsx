import { useTranslation } from "react-i18next";

const SectionAPropos = () => {
  const { t } = useTranslation();

  return (
    <section className="relative z-0 py-24 px-4 bg-white overflow-hidden">
      {/* Bulles flottantes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-6 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-60 md:w-40 md:h-40 md:top-10 md:left-32" />
        <div className="absolute top-24 right-6 w-24 h-24 bg-blue-100 rounded-full opacity-40 md:w-48 md:h-48 md:right-20 md:top-32" />
        <div className="absolute bottom-8 left-6 w-16 h-16 bg-blue-100 rounded-full opacity-40 md:w-24 md:h-24 md:left-16" />
        <div className="absolute bottom-16 right-10 w-24 h-24 bg-blue-100 rounded-full opacity-40 md:w-36 md:h-36 md:right-32" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20 md:w-40 md:h-40" />
      </div>

      {/* Contenu */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl text-black mb-10 tracking-tight">
          {t("aboutTitle")}
        </h2>
        <p className="text-base md:text-3xl text-black leading-relaxed">
          {t("aboutContent")}
        </p>
      </div>
    </section>
  );
};

export default SectionAPropos;
