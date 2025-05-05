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
// import MainPage from "./pages/MainPage";
// import Game from "./pages/GamePage";
import VerificationEmail from "./pages/Verification";

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
      // {
      //   path: "/level/:number",
      //   element: <LevelPage />,
      // },
      // {
      //   path: "/tableau",
      //   element: <Tableau />,
      // },
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
      // {
      //   path: "/mentions",
      //   element: <Mentions />,
      // },
    ],
  },
  // {
  //   path: "/jeuxDrys",
  //   element: <MainPage />,
  //   errorElement: <h1>Erreur 404 : Page non trouvée</h1>,
  //   children: [
  //     {
  //       path: "/jeuxDrys/GamePage",
  //       element: <Game />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
