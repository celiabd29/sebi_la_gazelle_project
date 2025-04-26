import React from "react";

function LevelCase() {
  const rows = [
    { color: "#94E7FC", values: [1, 2, 3, 4, 5] }, // Ligne 1
    { color: "#F9C474", values: [6, 7, 8, 9, 10] }, // Ligne 2
    { color: "#FF6D83", values: [11, 12, 13, 14, 15] }, // Ligne 3
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      {/* Étoiles au-dessus */}
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
        {/* Étoile centrale (plus grande et plus haute) */}
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
      {/* Case */}
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
}

export default LevelCase;
