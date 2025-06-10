import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar";
import { useAuth } from "../../contexts/AuthContexte";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const DashboardLayout = () => {
  const { utilisateur } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Vérification de l'authentification une seule fois au chargement
    const checkAuthentication = () => {
      // Vérifier si l'utilisateur est dans le contexte
      if (utilisateur) {
        setUserInfo(utilisateur);
        setIsAuthenticated(utilisateur.role === "admin");
        setIsLoading(false);
        return;
      }

      // Si non, vérifier dans le localStorage
      const storedUser = localStorage.getItem("utilisateur");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserInfo(parsedUser);
          setIsAuthenticated(parsedUser.role === "admin");
        } catch (error) {
          console.error("Erreur lors du parsing de l'utilisateur:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuthentication();
  }, [utilisateur]);

  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  // Rediriger vers la page de connexion si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard Admin</h1>
          
          <div className="flex items-center gap-6">
            {/* Sélecteur de langue */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-2 py-1 rounded ${i18n.language === 'fr' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                EN
              </button>
            </div>
            
            {/* Information utilisateur */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium text-sm">{userInfo.prenom} {userInfo.nom}</p>
                <p className="text-xs text-gray-500">{userInfo.email}</p>
              </div>
              {userInfo.avatar && (
                <img
                  src={userInfo.avatar}
                  alt={`Avatar de ${userInfo.prenom}`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
