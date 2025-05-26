import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";

import App from "./App";
import Accueil from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Personnages from "./pages/Personnages";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Mentions from "./pages/Mentions";

import MainPageDrys from "./pages/jeux-drys/MainPageDrys";
import PalierPageDrys from "./pages/jeux-drys/PalierPageDrys";
import GamePageDrys from "./pages/jeux-drys/GamePage";
import { ConditionalProviders } from "./ConditionalProviders";
import ScorePage from "./pages/jeux-drys/ScorePage";


import MainPageJames from "./pages/Jeu_James/Home";
import SettingsPage from "./pages/Jeu_James/SettingsPage";
import GamePage from "./pages/Jeu_James/GamePage";
import LevelPage from "./pages/Jeu_James/LevelPage";
import Tableau from "./pages/Jeu_James/Tableau";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Erreur 404</h1>,
    children: [
      { path: "/", element: <Accueil /> },
      { path: "/jeux", element: <Jeux /> },
      { path: "/personnages", element: <Personnages /> },
      { path: "/contact", element: <Contact /> },
      { path: "/inscription", element: <Inscription /> },
      { path: "/connexion", element: <Connexion /> },
      { path: "/mentions", element: <Mentions /> },
    ],
  },
  {
    path: "/jeuxDrys",
    element: <ConditionalProviders />,
    children: [
      { path: "", element: <MainPageDrys /> },
      { path: "PalierPage", element: <PalierPageDrys /> },
      { path: "GamePage", element: <GamePageDrys /> },
      // 👇 AJOUTE CECI
      { path: "ScorePage", element: <ScorePage /> },
    ],
  },
  
  { path: "/jeuxJames", element: <MainPageJames /> },
  { path: "/jeuxJames/settings", element: <SettingsPage /> },
  { path: "/jeuxJames/tableau", element: <Tableau /> },
  { path: "/jeuxJames/game/:level", element: <GamePage /> },
  { path: "/jeuxJames/level/:id", element: <LevelPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<p>Chargement...</p>} />
  </React.StrictMode>
);
