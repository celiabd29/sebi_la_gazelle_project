import { Link,NavLink,Outlet } from "react-router-dom";
import LogoSite from "./img/logo-sebi.webp";
const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative bg-[#40E0D0] min-h-[1100px] px-4 py-8 bg-[url('./img/accueil.png')] bg-cover w-100 bg-no-repeat w-screen">
        <nav className="max-w-6xl mx-auto flex justify-between items-center mb-8">
          <Link to="#" className="text-white font-bold text-xl">
              <img src={LogoSite} alt="logo-sebi" className="w-36" />
          </Link>
          <div className="flex gap-4">
            <NavLink to="#jeux" className="text-white hover:text-white/80">
              Jeux 
            </NavLink>
            <NavLink to="#apropos" className="text-white hover:text-white/80">
              À propos
            </NavLink>
            <NavLink to="#contact" className="text-white hover:text-white/80">
              Contact
            </NavLink>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto relative">
          <img
            src=""
            alt="Cute animals playing in a tree scene"
            className="w-full object-cover rounded-lg"
          />
        </div>
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
