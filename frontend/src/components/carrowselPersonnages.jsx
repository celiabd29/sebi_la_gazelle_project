import celiaFond from "../img/fonds/celia-fond.png";
import charlyFond from "../img/fonds/charly-fond.png";
import jamesFond from "../img/fonds/james-fond.png";
import melFond from "../img/fonds/mel-fond.png";
import nourFond from "../img/fonds/nour-fond.png";
import drysFond from "../img/fonds/drys-fond.png";

const CarrowselPersonnages = () => {
  const carrowselPerso = [
    {
      id: 1,
      name: "Célia",
      img: celiaFond,
      description: "Célia est une aventurière curieuse et dynamique.",
    },
    {
      id: 2,
      name: "Charly",
      img: charlyFond,
      description: "Charly adore résoudre des énigmes et explorer de nouveaux mondes.",
    },
    {
      id: 3,
      name: "James",
      img: jamesFond,
      description: "James est le sage de l'équipe, toujours prêt à partager ses connaissances.",
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
    <section className="py-12 bg-light">
      <div className="container">
        {/* Titre */}
        <h2 className="text-center mb-4 text-primary">Nos Personnages</h2>

        {/* Carousel Bootstrap */}
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {carrowselPerso.map((perso, index) => (
              <div
                key={perso.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={perso.img}
                  className="d-block w-100 rounded"
                  alt={perso.name}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-light">{perso.name}</h5>
                  <p className="text-light">{perso.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contrôles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Précédent</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Suivant</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarrowselPersonnages;
