import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <header>
        <h1>Mon Application</h1>
        <nav>
          <a href="/">Accueil</a>
          <a href="/presentation">Présentation</a>
          <a href="/realisation">Réalisation</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 Mon Application</p>
      </footer>
    </div>
  );
};

export default App;