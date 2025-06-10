import { Routes, Route } from "react-router-dom";
import LayoutPrincipal from "./components/Layout/LayoutPrincipal";
import LayoutMinimal from "./components/Layout/LayoutMinimal";

import Accueil from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Personnage from "./pages/Personnages";
import Contact from "./pages/Contact";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import MentionsLegales from "./pages/Mentions";
import PolitiqueConfidentialite from "./pages/ConfidentialitePage";
import Profil from "./pages/Admin/Profil";

// Pages jeu de James
import HomeJames from "./pages/Jeu_James/Home";
import SettingsPage from "./pages/Jeu_James/SettingsPage";
import GamePageJames from "./pages/Jeu_James/GamePage";
import LevelPage from "./pages/Jeu_James/LevelPage";
import Tableau from "./pages/Jeu_James/Tableau";
import FinLevelPage from "./pages/Jeu_James/FinLevelPage";

// Pages jeu de Drys
import MainPageDrys from "./pages/jeux-drys/MainPageDrys";
import GamePageDrys from "./pages/jeux-drys/GamePage";
import LevelPageDrys from "./pages/jeux-drys/LevelPageDrys";
import PalierPageDrys from "./pages/jeux-drys/PalierPageDrys";
import ScorePageDrys from "./pages/jeux-drys/ScorePage";
import LayoutDrys from "./pages/jeux-drys/LayoutDrys";

const App = () => {
  return (
    <Routes>
      {/* Layout principal pour les pages générales */}
      <Route element={<LayoutPrincipal />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/jeux" element={<Jeux />} />
        <Route path="/personnages" element={<Personnage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route
          path="/politique-confidentialite"
          element={<PolitiqueConfidentialite />}
        />
        <Route path="/profil" element={<Profil />} />
      </Route>

      {/* Pages connexions/inscriptions */}
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />

      {/* Layout minimal pour les jeux */}
      <Route element={<LayoutMinimal />}>
        {/* Pages jeu de James */}
        <Route path="/jeuJames/home" element={<HomeJames />} />
        <Route path="/jeuJames/settings" element={<SettingsPage />} />
        <Route path="/jeuJames/game" element={<GamePageJames />} />
        <Route path="/jeuJames/level" element={<LevelPage />} />
        <Route path="/jeuJames/tableau" element={<Tableau />} />
        <Route path="/jeuJames/fin" element={<FinLevelPage />} />

        {/* Pages jeu de Drys */}
        <Route path="/jeu-drys/main" element={<MainPageDrys />} />
        <Route path="/jeu-drys/game" element={<GamePageDrys />} />
        <Route path="/jeu-drys/palier" element={<PalierPageDrys />} />
        <Route path="/jeuxDrys/level/:level" element={<LevelPageDrys />} />
        <Route path="/jeuxDrys/game/:level" element={<GamePageDrys />} />
        <Route path="/jeu-drys/score" element={<ScorePageDrys />} />
        <Route path="/jeu-drys/layout" element={<LayoutDrys />} />
      </Route>
    </Routes>
  );
};

export default App;
