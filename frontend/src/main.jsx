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
import VerificationEmail from "./pages/Verification";
import DashboardAccueil from "./pages/Admin/DashboardHome";
import Profil from "./pages/EspaceParent/Profil";
import DashboardLayout from "./components/Layout/DashboardLayout";

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
      {
        path: "/verification",
        element: <VerificationEmail />,
      },
      {
        path:"/profil",
        element: <Profil />,
      }
    ],
  },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <DashboardAccueil /> },
        // { path: "utilisateurs", element: <Utilisateurs /> },
        // { path: "analyse", element: <Analyse /> },
        // { path: "parametres", element: <Parametres /> },
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
