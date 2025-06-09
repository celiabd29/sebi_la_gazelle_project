import React, { useEffect, useState } from "react";
import axios from "axios";

const ControleParental = () => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8008/api/controle")
      .then((res) => {
        setActive(res.data.active);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setLoading(false);
      });
  }, []);

  const toggleControle = () => {
    axios
      .post("http://localhost:8008/api/controle", { active: !active })
      .then((res) => setActive(res.data.active))
      .catch((err) => console.error("Erreur activation :", err));
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6 text-center font-fredoka">
      <h2 className="text-2xl mb-4">Contrôle Parental</h2>
      <p className="mb-4">
        Statut :{" "}
        <span className={active ? "text-green-600" : "text-red-600"}>
          {active ? "Activé" : "Désactivé"}
        </span>
      </p>
      <button
        onClick={toggleControle}
        className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 transition"
      >
        {active ? "Désactiver" : "Activer"}
      </button>
    </div>
  );
};

export default ControleParental;
