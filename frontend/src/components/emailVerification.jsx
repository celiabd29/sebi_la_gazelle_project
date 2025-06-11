import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [message, setMessage] = useState("Vérification en cours...");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    setMessage("Lien invalide.");
    setSuccess(false);
    return;
  }

  const verifyEmail = async () => {
    try {
      const res = await axios.get(
        `https://sebi-la-gazelle-backend.onrender.com/api/utilisateurs/verification?token=${token}`
      );

      setMessage(res.data.message);
      setSuccess(true);

      // 🔐 Enregistre l'utilisateur s'il est renvoyé
      if (res.data.utilisateur) {
        localStorage.setItem("utilisateur", JSON.stringify(res.data.utilisateur));
      }

      // Redirige vers la page d’accueil après 1.5s
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setMessage("Erreur lors de la vérification.");
      setSuccess(false);
    }
  };

  verifyEmail();
}, []);


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className={`p-6 rounded-lg shadow-lg text-center max-w-md ${
          success === null
            ? "bg-gray-200 text-gray-700"
            : success
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        <h2 className="text-xl font-bold mb-2">Vérification de compte</h2>
        <p className="mb-4">
          {success === null ? "⏳" : success ? "✅" : "❌"} {message}
        </p>

        {success !== null && (
          <p className="text-sm text-gray-500">
            {success
              ? "Vous allez être redirigé vers la connexion..."
              : "Si vous avez des questions, contactez notre support."}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-4">
          <a href="/connexion" className="text-blue-500 hover:underline">
            Retour à la connexion
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
