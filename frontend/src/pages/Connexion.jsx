import ConnexionForm from "../components/ConnexionForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexte";
import { Helmet } from "react-helmet-async";

const Connexion = () => {
  const navigate = useNavigate();
  const { utilisateur } = useAuth();

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    // Vérifier d'abord via le contexte
    if (utilisateur) {
      // Rediriger les admins vers le dashboard
      if (utilisateur.role === "admin") {
        navigate("/dashboard");
      } else {
        // Rediriger les utilisateurs normaux vers l'accueil
        navigate("/");
      }
      return;
    }

    // Si pas dans le contexte, vérifier dans localStorage
    const storedUser = localStorage.getItem("utilisateur");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Rediriger selon le rôle
        if (parsedUser.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (e) {
        // Erreur de parsing - ne rien faire
      }
    }
  }, [utilisateur, navigate]);

  return (
    <>
      <Helmet>
        <title>Connexion - Sebi La Gazelle</title>
        <meta name="description" content="Connectez-vous à votre compte Sebi La Gazelle pour accéder à nos jeux éducatifs pour enfants" />
      </Helmet>
      <ConnexionForm />
    </>
  );
};

export default Connexion;
