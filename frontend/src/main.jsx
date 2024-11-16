import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; // Importez les styles globaux si nécessaires
import App from "./App";
import Accueil from "./pages/Accueil";

// Définir le routeur dans `main.jsx`
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.jsx gère les enfants
    errorElement: <h1>Erreur 404 : Page non trouvée</h1>,
    children: [
      {
        path: "/",
        element: <Accueil />,
      }
      
  ]  
}]);


// Initialisation de l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
