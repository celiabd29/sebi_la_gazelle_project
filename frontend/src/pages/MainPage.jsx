// src/pages/MainPage.jsx
import ExitButton from "../components/button-exit"; // Assure-toi que ce chemin est correct
import LanguageButton from "../components/button-language"; // Vérifie aussi ce chemin
import ActionButtons from "../components/button-play"; // Vérifie aussi ce chemin

const MainPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: "url('src/assets/img/fonds/background.png')", // Vérifie que l'image est bien dans le dossier public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <ExitButton />
        <LanguageButton />
      </div>

      <div className="flex justify-center items-end pb-8">
        <ActionButtons />
      </div>
    </div>
  );
}

export default MainPage;
