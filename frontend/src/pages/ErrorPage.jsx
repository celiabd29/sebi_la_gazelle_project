import React from "react";
import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  
  // Déterminer le type d'erreur
  let title = "Une erreur est survenue";
  let message = "Nous sommes désolés pour ce problème. Notre équipe technique a été informée.";
  let status = null;
  
  if (isRouteErrorResponse(error)) {
    status = error.status;
    
    if (error.status === 404) {
      title = "Page non trouvée";
      message = "Désolé, la page que vous cherchez n'existe pas.";
    } else if (error.status === 401) {
      title = "Non autorisé";
      message = "Vous devez vous connecter pour accéder à cette page.";
    } else if (error.status === 403) {
      title = "Accès interdit";
      message = "Vous n'avez pas les droits nécessaires pour accéder à cette page.";
    } else if (error.status === 503) {
      title = "Service indisponible";
      message = "Le service est actuellement indisponible. Veuillez réessayer plus tard.";
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        {status && (
          <div className="text-9xl font-bold text-gray-200 mb-4">{status}</div>
        )}
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        
        <p className="text-gray-600 mb-8">{message}</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition-colors"
          >
            Retour à l'accueil
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded transition-colors"
          >
            Page précédente
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded transition-colors"
          >
            Actualiser
          </button>
        </div>
        
        {process.env.NODE_ENV !== "production" && error && (
          <div className="mt-8 p-4 bg-gray-100 rounded text-left overflow-auto">
            <p className="font-bold text-red-600 mb-2">Détails de l'erreur (visible uniquement en développement):</p>
            <pre className="text-xs text-gray-700">
              {error.message || JSON.stringify(error, null, 2)}
              {error.stack && "\n" + error.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
