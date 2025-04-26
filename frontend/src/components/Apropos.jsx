import { useTranslation } from "react-i18next";

const SectionAPropos = () => {
  const { t } = useTranslation();

  return (
    <section className="relative z-0 py-32 px-6 bg-white overflow-hidden">
      {/* Bulles flottantes */}
      <div className="absolute inset-0 -z-10">
        {/* Bulles mobiles : plus petites et réorganisées */}
        <div className="absolute top-6 left-10 w-20 h-20 bg-blue-100 rounded-full animate-floating-slow opacity-60 md:w-40 md:h-40 md:top-10 md:left-40" />
        <div className="absolute top-28 right-4 w-28 h-28 bg-blue-100 rounded-full animate-floating-fast opacity-40 md:w-56 md:h-56 md:right-20 md:top-40" />
        <div className="absolute bottom-6 left-6 w-16 h-16 bg-blue-100 rounded-full animate-floating-medium opacity-50 md:w-24 md:h-24 md:left-20" />
        <div className="absolute bottom-16 right-6 w-24 h-24 bg-blue-100 rounded-full animate-floating-medium opacity-50 md:w-36 md:h-36 md:right-40" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-floating-slow opacity-30 md:w-48 md:h-48" />
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-black mb-8 font-fredoka">
          {t("aboutTitle")}
        </h2>
        <p className="text-lg text-black font-comic leading-relaxed">
          {t("aboutContent")}
        </p>
      </div>
    </section>
  );
};

export default SectionAPropos;
