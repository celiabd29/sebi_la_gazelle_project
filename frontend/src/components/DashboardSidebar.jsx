import { NavLink, useNavigate } from "react-router-dom";
import { BarChart, MessageCircle, Users, Settings, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContexte";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { deconnecterUtilisateur } = useAuth();

  const links = [
    { name: "Dashboard", icon: <BarChart />, path: "/dashboard" },
    { name: "Analyse", icon: <BarChart />, path: "/dashboard/analyse" },
    { name: "Messages", icon: <MessageCircle />, path: "/dashboard/message" },
    { name: "Utilisateur", icon: <Users />, path: "/dashboard/utilisateur" },
    { name: "Paramètres", icon: <Settings />, path: "/dashboard/parametre" },
    { name: "Profil", icon: <Settings />, path: "/dashboard/profil" },
  ];

  const handleSignOut = () => {
    // Supprimer les données de session
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");

    // Déconnecter via le contexte si la fonction existe
    if (deconnecterUtilisateur) {
      deconnecterUtilisateur();
    }

    // Rediriger vers la page de connexion
    navigate("/connexion");
  };

  return (
    <aside className="w-64 bg-white border-r h-full p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
                isActive ? "text-blue-500 font-bold" : "text-gray-700"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 mt-auto rounded transition-colors"
        >
          <LogOut />
          Sign Out
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
