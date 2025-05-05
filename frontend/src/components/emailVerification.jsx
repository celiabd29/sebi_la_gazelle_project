import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Vérification en cours...");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      axios
        .get(`http://localhost:8008/api/utilisateurs/verification?token=${token}`)
        .then((res) => {
          setMessage(res.data.message);
          setSuccess(true);
        })
        .catch((err) => {
          setMessage(
            err.response?.data?.message || "Erreur lors de la vérification"
          );
          setSuccess(false);
        });
    } else {
      setMessage("Token manquant dans l'URL");
      setSuccess(false);
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className={`p-6 rounded-lg shadow-lg text-center ${
          success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        <h2 className="text-xl font-bold mb-2">Vérification de compte</h2>
        <p className="mb-4">
          {success ? "✅" : "❌"} {message}
        </p>
        {success && (
          <p className="text-sm text-gray-500">
            Vous pouvez maintenant vous connecter à votre compte.
          </p>
        )}
        {!success && (
          <p className="text-sm text-gray-500">
            Si vous avez des questions, contactez notre support.
          </p>
        )}
        <p className="text-sm text-gray-500 mt-4">
          <a href="/connexion" className="text-blue-500 hover:underline">
            Retour à la connexion
          </a>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default EmailVerification;
