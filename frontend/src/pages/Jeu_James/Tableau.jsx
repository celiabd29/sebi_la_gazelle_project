import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../components/compo_jeux/ReturnButton";

function Tableau() {
  const navigate = useNavigate();

  // Configuration des couleurs des lignes
  const rows = [
    { color: "#94E7FC" }, // Première ligne : bleu clair
    { color: "#F9C474" }, // Deuxième ligne : orange clair
    { color: "#FF6D83" }, // Troisième ligne : rose
  ];

  // Fonction pour rediriger vers le niveau sélectionné
  const handleButtonClick = (cellNumber) => {
    navigate(`/level/${cellNumber}`); // Redirection vers la page du niveau
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <ReturnButton />
      <div className="flex justify-center items-center">
        {/* Conteneur principal du tableau */}
        <div
          className="bg-[#27812A] border-[1.3rem] border-[#CE7F42] flex justify-center items-center"
          style={{
            width: "50rem",
            height: "35rem",
            boxSizing: "border-box",
          }}
        >
          {/* Grille des cases */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)", // 3 lignes
              gridTemplateColumns: "repeat(5, 1fr)", // 5 colonnes
              gap: "1.5rem", // Espace entre les cases
            }}
          >
            {/* Génération des cases */}
            {rows.map((row, rowIndex) =>
              Array.from({ length: 5 }).map((_, colIndex) => {
                const cellNumber = rowIndex * 5 + colIndex + 1; // Calcul du numéro de la case
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="relative flex flex-col items-center cursor-pointer" // Ajout du curseur pointer
                    onClick={() => handleButtonClick(cellNumber)} // Redirection au clic
                    style={{
                      width: "6rem", // Largeur de chaque case
                    }}
                  >
                    {/* Étoiles au-dessus de chaque case */}
                    <div
                      className="flex items-center relative"
                      style={{ marginBottom: "-1.5rem" }} // Étoiles collées à la case
                    >
                      {/* Étoile gauche */}
                      <img
                        src="./img/star_small.svg"
                        alt="Étoile"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          marginRight: "-0.2rem",
                        }}
                      />
                      {/* Étoile centrale */}
                      <img
                        src="./img/star_big.svg"
                        alt="Étoile"
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          position: "relative",
                          top: "-1rem", // Plus proche de la case
                        }}
                      />
                      {/* Étoile droite */}
                      <img
                        src="./img/star_small.svg"
                        alt="Étoile"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          marginLeft: "-0.2rem",
                        }}
                      />
                    </div>

                    {/* Case cliquable */}
                    <div
                      className="rounded-2xl text-black font-regular text-2xl flex justify-center items-center font-[Fredoka]"
                      style={{
                        backgroundColor: row.color,
                        width: "6rem",
                        height: "6rem",
                      }}
                    >
                      {cellNumber} {/* Contenu de la case */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tableau;
