import Header from "./components/Layout/Header";
import { useEffect } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { initGA, trackPageView } from "./analyse";
import { Suspense } from "react";
import { useAuth } from "./contexts/AuthContexte";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { utilisateur } = useAuth();
  
  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  // Vérification si l'URL est /dashboard et redirection si nécessaire
  useEffect(() => {
    // Vérifier si on est sur la page dashboard
    if (window.location.pathname === '/dashboard') {
      // Vérifier d'abord via le contexte
      if (utilisateur) {
        if (utilisateur.role !== "admin") {
          // Rediriger les non-admins vers l'accueil
          navigate("/");
        }
        return;
      }

      // Si pas dans le contexte, vérifier dans localStorage
      const storedUser = localStorage.getItem("utilisateur");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.role !== "admin") {
            navigate("/");
          }
        } catch (e) {
          // En cas d'erreur de parsing, rediriger vers la connexion
          navigate("/connexion");
        }
      } else {
        // Pas d'utilisateur, rediriger vers la connexion
        navigate("/connexion");
      }
    }
  }, [utilisateur, navigate]);
  
  return (
    <>
      <Header />
      <Suspense fallback={<div>Chargement...</div>}>
        <Outlet />
      </Suspense>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default App;
