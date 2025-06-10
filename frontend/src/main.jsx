import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './utils/ErrorBoundary';

import { AuthProvider } from "./contexts/AuthContexte";
import { ApiProvider } from "./contexts/ApiContext"; // Importer le nouveau provider

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
import SettingsPage from "./pages/Jeu_James/SettingsPage";
import GamePage from "./pages/Jeu_James/GamePage";
import LevelPage from "./pages/Jeu_James/LevelPage";
import Tableau from "./pages/Jeu_James/Tableau";

// Autres sections
import VerificationEmail from "./pages/Verification";
import DashboardAccueil from "./pages/Admin/DashboardHome";
import Profil from "./pages/EspaceParent/Profil";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Analyse from "./pages/Admin/Analyse";
import Utilisateur from "./pages/Admin/Utilisateur";
import Messages from "./pages/Admin/Message";
import Parametre from "./pages/Admin/Parametre";

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
    children: [
      { path: "", element: <DashboardAccueil /> },
      { path: "analyse", element: <Analyse /> },
      { path: "utilisateur", element: <Utilisateur /> },
      { path: "messages", element: <Messages /> },
      { path: "parametres", element: <Parametre /> },
    ],
  },
  {
    path: "/jeuxJames",
    children: [
      { path: "", element: <MainPageJames /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "tableau", element: <Tableau /> },
      { path: "game/:level", element: <GamePage /> },
      { path: "level/:id", element: <LevelPage /> },
    ],
  },
]);

// Composant racine avec SEO
const Root = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <Helmet>
          <title>Sebi La Gazelle - Jeux éducatifs pour enfants</title>
          <meta name="description" content="Jeux éducatifs et amusants pour les enfants avec des personnages attachants comme James ou Drys. Développez la motricité et la réflexion de votre enfant." />
          <meta name="keywords" content="jeux enfants, jeux éducatifs, sebi la gazelle, james, drys, apprentissage, motricité" />
          <meta property="og:title" content="Sebi La Gazelle - Jeux éducatifs pour enfants" />
          <meta property="og:description" content="Jeux éducatifs et amusants pour les enfants avec des personnages attachants comme James ou Drys." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://sebilagazelle.fr" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://sebilagazelle.fr" />
        </Helmet>
        <ApiProvider>
          <AuthProvider>
            <RouterProvider router={router} fallbackElement={<p>Chargement...</p>} />
          </AuthProvider>
        </ApiProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
