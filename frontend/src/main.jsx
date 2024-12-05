import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; // Importez les styles globaux si nécessaires
import App from "./App";
import Accueil from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Personnages from "./pages/Personnages";
import Contact from "./pages/Contact";

// Définir le routeur dans `main.jsx`
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
        element : <Jeux />
      },
      {
        path: "/personnages",
        element : <Personnages />
      },
      {
        path: "/contact",
        element : <Contact />
      },
  ]  
}, 
]);


// Initialisation de l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
