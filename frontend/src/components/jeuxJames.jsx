import { Routes, Route } from "react-router-dom";
import Home from "./pages/Jeu_James/Home";
import SettingsPage from "./pages/Jeu_James/SettingsPage.jsx";
import GamePage from "./pages/Jeu_James/GamePage.jsx";
import LevelPage from "./pages/Jeu_James/LevelPage";
import Tableau from "./pages/Jeu_James/Tableau";

function App() {
  return (
    <Routes>
      {/* Route pour la page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Route pour la page des paramètres */}
      <Route path="/settings" element={<SettingsPage />} />

      {/* Route pour la liste des niveaux */}
      <Route path="/tableau" element={<Tableau />} />

      {/* Route pour une page spécifique d'un jeu (par ID) */}
      <Route path="/game/:level" element={<GamePage />} />

      {/* Route pour une page de niveau spécifique */}
      <Route path="/level/:id" element={<LevelPage />} />
    </Routes>
  );
}

export default App;
