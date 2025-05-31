// src/contexts/AuthContexte.jsx
import React, { createContext, useContext, useState } from "react";

// 1. Création du contexte
const AuthContext = createContext(null);

// 2. Provider qui englobe toute l'application
export const AuthProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);

  const enregistrerUtilisateur = (user) => {
    setUtilisateur(user);
  };

  return (
    <AuthContext.Provider value={{ utilisateur, enregistrerUtilisateur }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
