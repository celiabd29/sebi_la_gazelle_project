import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContexte"; // Ton AuthProvider
import "./index.css"; // Importer les styles globaux si nécessaires
import App from "./App";
import Accueil from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Personnages from "./pages/Personnages";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";

// Définir le routeur
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    errorElement: <h1>Erreur 404 : Page non trouvée</h1>,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/jeux",
        element: <Jeux />,
      },
      {
        path: "/personnages",
        element: <Personnages />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
    ],
  },
]);

// Initialisation de l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
