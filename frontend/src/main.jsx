import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContexte";
import "./index.css";
import App from "./App";
import "./i18n";

// Pages principales
import Accueil from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Personnages from "./pages/Personnages";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Mentions from "./pages/Mentions";

// Jeux JAMES

import MainPageJames from "./pages/Jeu_James/Home";
import SettingsPage from "./pages/Jeu_James/SettingsPage";
import GamePage from "./pages/Jeu_James/GamePage";
import LevelPage from "./pages/Jeu_James/LevelPage";
import Tableau from "./pages/Jeu_James/Tableau";

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
        path: "/level/:number",
        element: <LevelPage />,
      },
      {
        path: "/tableau",
        element: <Tableau />,
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
      {
        path: "/mentions",
        element: <Mentions />,
      },
    ],
  },
  {
    path: "/jeuxJames",
    element: <MainPageJames />,
  },
  {
    path: "/jeuxJames/settings",
    element: <SettingsPage />,
  },
  {
    path: "/jeuxJames/tableau",
    element: <Tableau />,
  },
  {
    path: "/jeuxJames/game/:level",
    element: <GamePage />,
  },
  {
    path: "/jeuxJames/level/:id",
    element: <LevelPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
