// src/contexts/AuthContexte.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Création du contexte
const AuthContext = createContext(null);

// 2. Provider qui englobe toute l'application
export const AuthProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);

  // ⚡ Chargement depuis localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("utilisateur");
    if (storedUser) {
      try {
        setUtilisateur(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erreur parsing utilisateur localStorage :", error);
      }
    }
  }, []);

  // 📦 Enregistrement dans le contexte + localStorage
  const enregistrerUtilisateur = (user) => {
    setUtilisateur(user);
    localStorage.setItem("utilisateur", JSON.stringify(user));
  };

  // 🔓 Déconnexion
  const deconnexion = () => {
    setUtilisateur(null);
    localStorage.removeItem("utilisateur");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        utilisateur,
        setUtilisateur, // ✅ ajouté ici
        enregistrerUtilisateur,
        deconnexion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
