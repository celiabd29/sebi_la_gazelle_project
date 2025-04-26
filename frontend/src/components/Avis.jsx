import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import avatar1 from "../assets/img/logo-sebi.webp";
import avatar2 from "../assets/img/logo-sebi.webp";
import avatar3 from "../assets/img/logo-sebi.webp";

const AvisSection = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      id: 1,
      author: "Khames",
      date: t("avis.daysAgo", { count: 2 }),
      message: t("avis.1.message"),
      note: 4,
      avatar: avatar1,
      bgColor: "bg-fondRose",
    },
    {
      id: 2,
      author: "Drys",
      date: t("avis.daysAgo", { count: 5 }),
      message: t("avis.2.message"),
      note: 3,
      avatar: avatar2,
      bgColor: "bg-fondjaune",
    },
    {
      id: 3,
      author: "Melinda",
      date: t("avis.daysAgo", { count: 2 }),
      message: t("avis.3.message"),
      note: 1,
      avatar: avatar3,
      bgColor: "bg-fondBleu",
    },
  ];

  return (
    <section
      id="reviews"
      className="mb-4 py-16 px-4 bg-gradient-to-br from-amber-100 via-yellow-200 to-lime-100 fond:fondVert"
    >
      <h2 className="text-center text-4xl md:text-5xl font-fredoka font-semibold text-yellow-700 mb-12">
        {t("avis.title")}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((avis) => (
          <div
            key={avis.id}
            className={`rounded-3xl p-8 text-black shadow-xl flex flex-col justify-between ${avis.bgColor}`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={avis.avatar}
                    alt={avis.author}
                    className="w-14 h-14 object-contain"
                  />
                  <h3 className="text-2xl font-fredoka font-semibold">
                    {avis.author}
                  </h3>
                </div>
                <span className="text-sm text-black font-light">
                  {avis.date}
                </span>
              </div>

              <p className="text-black text-md font-comic leading-relaxed mb-6">
                {avis.message}
              </p>
            </div>

            <div className="flex gap-2 text-yellow-400 text-2xl mt-4">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  fill={i < avis.note ? "#FFD700" : "white"}
                  stroke="black"
                  className="w-6 h-6"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvisSection;
