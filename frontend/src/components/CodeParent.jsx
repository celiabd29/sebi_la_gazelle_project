import React, { useState } from "react";
import axios from "axios";

const CodeParent = ({ onSuccess }) => {
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState("");
  const [autorise, setAutorise] = useState(false);

  const utilisateur = JSON.parse(localStorage.getItem("utilisateur")); // ✅ Récupère l'ID utilisateur

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur(""); // Reset erreur avant chaque tentative

    try {
      const res = await axios.post(
        "http://localhost:8008/api/controle/verifier-code",
        {
          code,
          userId: utilisateur?._id,
        }
      );

      console.log("🎯 Résultat backend:", res.data); // 🪵 Log de debug

      if (res.data.success && res.data.autorisé) {
        setAutorise(true);
        onSuccess();
      } else {
        setErreur(res.data.message || "Code incorrect");
      }
    } catch (err) {
      console.error("❌ Erreur backend:", err);
      setErreur(err?.response?.data?.message || "Erreur serveur");
    }
  };

  if (autorise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Contrôle Parental 🔐
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Entrer le code parent"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Déverrouiller
          </button>
          {erreur && <p className="text-red-500 mt-2">{erreur}</p>}
        </form>
      </div>
    </div>
  );
};

export default CodeParent;