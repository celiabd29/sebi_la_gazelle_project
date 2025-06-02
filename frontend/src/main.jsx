import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";

import { AuthProvider } from "./contexts/AuthContexte";

// Pages générales
import App from "./App";
import Accueil from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Personnages from "./pages/Personnages";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Mentions from "./pages/Mentions";

// Jeu Drys
import MainPageDrys from "./pages/jeux-drys/MainPageDrys";
import PalierPageDrys from "./pages/jeux-drys/PalierPageDrys";
import GamePageDrys from "./pages/jeux-drys/GamePage";
import ScorePage from "./pages/jeux-drys/ScorePage";
import { ConditionalProviders } from "./ConditionalProviders";

// Jeu James
import MainPageJames from "./pages/Jeu_James/Home";
import Tableau from "./pages/Jeu_James/Tableau";
import SettingsPage from "./pages/Jeu_James/SettingsPage";
import GamePage from "./pages/Jeu_James/GamePage";
import LevelPage from "./pages/Jeu_James/LevelPage";
import FinLevelPage from "./pages/Jeu_James/FinLevelPage";

// Autres sections
import VerificationEmail from "./pages/Verification";
import DashboardAccueil from "./pages/Admin/DashboardHome";
import Profil from "./pages/EspaceParent/Profil";
import DashboardLayout from "./components/Layout/DashboardLayout";

// Définir le routeur
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
      { path: "/verification", element: <VerificationEmail /> },
      { path: "/profil", element: <Profil /> },
    ],
  },
  {
    path: "/jeuxDrys",
    element: <ConditionalProviders />,
    children: [
      { path: "", element: <MainPageDrys /> },
      { path: "PalierPage", element: <PalierPageDrys /> },
      { path: "GamePage", element: <GamePageDrys /> },
      { path: "ScorePage", element: <ScorePage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: "", element: <DashboardAccueil /> }],
  },
  { path: "/jeuxJames", element: <MainPageJames /> },
  { path: "/jeuxJames/settings", element: <SettingsPage /> },
  { path: "/jeuxJames/tableau", element: <Tableau /> },
  { path: "/jeuxJames/game/:level", element: <GamePage /> },
  { path: "/jeuxJames/level/:id", element: <LevelPage /> },
  { path: "/jeuxJames/fin/:level", element: <FinLevelPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* ✅ Ajout du Provider ici */}
      <RouterProvider router={router} fallbackElement={<p>Chargement...</p>} />
    </AuthProvider>
  </React.StrictMode>
);
