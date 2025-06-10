import { NavLink, useNavigate } from "react-router-dom";
import { BarChart, MessageCircle, Users, Settings, LogOut, HomeIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContexte";
import { toast } from 'react-toastify';

const DashboardSidebar = () => {
  const { deconnecterUtilisateur } = useAuth();
  const navigate = useNavigate();
  
  const links = [
    { name: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
    { name: "Analyse", icon: <BarChart />, path: "/dashboard/analyse" },
    { name: "Messages", icon: <MessageCircle />, path: "/dashboard/messages" },
    { name: "Utilisateur", icon: <Users />, path: "/dashboard/utilisateur" },
    { name: "Paramètres", icon: <Settings />, path: "/dashboard/parametres" },
  ];

  const handleLogout = () => {
    // Supprimer les infos de l'utilisateur du localStorage
    localStorage.removeItem("utilisateur");
    localStorage.removeItem("authToken");
    
    // Utiliser la fonction du contexte si disponible
    if (deconnecterUtilisateur) {
      deconnecterUtilisateur();
    }
    
    // Notifier l'utilisateur
    toast.success("Vous êtes déconnecté");
    
    // Rediriger vers la page d'accueil
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white border-r h-full p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4 flex-grow">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
                isActive ? "text-blue-500 font-bold bg-blue-50" : "text-gray-700"
              }`
            }
            end={link.path === "/dashboard"}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
      
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 mt-auto rounded transition-colors"
        aria-label="Se déconnecter"
      >
        <LogOut size={18} />
        Déconnexion
      </button>
    </aside>
  );
};

export default DashboardSidebar;
