import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";

import { AuthProvider } from "./contexts/AuthContexte";
import { SoundProvider } from "./contexts/SoundProvider"; // ✅ Import du SoundProvider

// Pages générales
import App from "./App";
import Accueil from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Personnages from "./pages/Personnages";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Mentions from "./pages/Mentions";
import Page404 from "./pages/Page404";
import Page501 from "./pages/Page501.jsx";
import ConfidentialitePage from "./pages/ConfidentialitePage.jsx";

// Jeu Drys
import MainPageDrys from "./pages/jeux-drys/MainPageDrys";
import PalierPageDrys from "./pages/jeux-drys/PalierPageDrys";
import GamePageDrys from "./pages/jeux-drys/GamePage";
import ScorePage from "./pages/jeux-drys/ScorePage";
import SettingPage from "./pages/jeux-drys/SettingsPage";
import { ConditionalProviders } from "./ConditionalProviders";

// Jeu James
import MainPageJames from "./pages/Jeu_James/Home";
import Tableau from "./pages/Jeu_James/Tableau";
import SettingsPage from "./pages/Jeu_James/SettingsPage";
import GamePage from "./pages/Jeu_James/GamePage";
import LevelPage from "./pages/Jeu_James/LevelPage";
import FinLevelPage from "./pages/Jeu_James/FinLevelPage";
import LayoutJames from "./layouts/LayoutJames"; // ajoute ce import en haut

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
      { path: "/confidentialite", element: <ConfidentialitePage /> },
      { path: "/verification", element: <VerificationEmail /> },
      { path: "/profil", element: <Profil /> },
      { path: "*", element: <Page404 /> },
      { path: "/501", element: <Page501 /> },
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
      { path: "SettingPage", element: <SettingPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: "", element: <DashboardAccueil /> }],
  },
 {
  path: "/jeuxJames",
  element: (
    <ConditionalProviders>
      <LayoutJames />
    </ConditionalProviders>
  ),
  children: [
    { path: "", element: <MainPageJames /> },
    { path: "settings", element: <SettingsPage /> },
    { path: "tableau", element: <Tableau /> },
    { path: "game/:level", element: <GamePage /> },
    { path: "level/:id", element: <LevelPage /> },
    { path: "fin/:level", element: <FinLevelPage /> },
  ],
},

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SoundProvider>
        {" "}
        {/* ✅ Ajout ici */}
        <RouterProvider
          router={router}
          fallbackElement={<p>Chargement...</p>}
        />
      </SoundProvider>
    </AuthProvider>
  </React.StrictMode>
);
