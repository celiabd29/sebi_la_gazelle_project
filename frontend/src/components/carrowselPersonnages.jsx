import celiaFond from "../assets/img/fonds/celia-fond.png";
import charlyFond from "../assets/img/fonds/charly-fond.png";
import jamesFond from "../assets/img/fonds/james-fond.png";
import melFond from "../assets/img/fonds/mel-fond.png";
import nourFond from "../assets/img/fonds/nour-fond.png";
import drysFond from "../assets/img/fonds/drys-fond.png";

const CarrowselPersonnages = () => {
  const carrowselPerso = [
    {
      id: 1,
      name: "Célia",
      img: celiaFond,
      description: "Célia est une aventurière curieuse et dynamique.",
      // bgColor: "bg-fondGris",
    },
    {
      id: 2,
      name: "Charly",
      img: charlyFond,
      description: "Charly adore résoudre des énigmes et explorer de nouveaux mondes.",
      // bgColor: "bg-fondVertFonce",
    },
    {
      id: 3,
      name: "James",
      img: jamesFond,
      description: "James est le sage de l'équipe, toujours prêt à partager ses connaissances.",
      // bgColor: "bg-fondjauneFonce",
    },
    {
      id: 4,
      name: "Mél",
      img: melFond,
      description: "Mél est une artiste passionnée, créant de la magie avec ses dessins.",
    },
    {
      id: 5,
      name: "Nour",
      img: nourFond,
      description: "Nour est une grande stratège, prête à relever tous les défis.",
    },
    {
      id: 6,
      name: "Drys",
      img: drysFond,
      description: "Drys est un esprit libre, aimant l'aventure et les jeux.",
    },
  ];

  return (
<section className="py-12 bg-gray-100">
  <div className="bg-fondRose container mx-auto px-4">
    {/* Titre */}
    <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">Nos Personnages</h2>

    {/* Carousel */}
    <div className="relative">
      <div className="flex overflow-x-scroll snap-x">
        {carrowselPerso.map((perso) => (
          <div
            key={perso.id}
            className= {`flex-shrink-0 miniTablette:w-1/2 tablette:w-1/3 snap-center p-4 ${perso.bgColor}`}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={perso.img}
                className="w-full h-64 object-cover"
                alt={perso.name}
              />
              <div className="p-4 bg-gray-800 text-gray-100">
                <h5 className="text-lg font-semibold">{perso.name}</h5>
                <p className="text-sm mt-2">{perso.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contrôles */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        aria-label="Précédent"
      >
        ←
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        aria-label="Suivant"
      >
        →
      </button>
    </div>
  </div>
</section>

  );
};

export default CarrowselPersonnages;
