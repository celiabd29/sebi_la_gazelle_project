import { createContext, useContext, useState } from "react";

const AuthContexte = createContext();

export const AuthProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);

  const enregistrerUtilisateur = (userData) => {
    setUtilisateur(userData);
  };

  const deconnexion = () => {
    setUtilisateur(null);
  };

  return (
    <AuthContexte.Provider value={{ utilisateur, enregistrerUtilisateur, deconnexion }}>
      {children}
    </AuthContexte.Provider>
  );
};

export const useAuth = () => useContext(AuthContexte);
