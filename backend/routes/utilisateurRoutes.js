const express = require("express");
const { inscription, connexion, verifierCompte, updateProfile, updatePassword, deleteUser } = require("../controllers/utilisateurController");
const router = express.Router();
const Utilisateur = require("../models/Utilisateur"); // Correction: importation du modèle Utilisateur
const { verifierToken, verifierAdmin } = require("../middleware/auth");

// Route pour récupérer tous les utilisateurs (correction)
router.get("/tous", async (req, res) => {
  try {
    console.log("Route /tous appelée - récupération des utilisateurs");
    const users = await Utilisateur.find().select('-motDePasse -verificationToken'); 
    console.log(`${users.length} utilisateurs trouvés`);
    
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur dans la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Routes pour l'inscription et la connexion
router.post("/inscription", inscription);
router.post("/connexion", connexion);

// Vérification de l'email
router.get("/verification", verifierCompte);

// Mise à jour du profil
router.put("/:id", updateProfile);
router.put("/:id/password", updatePassword);

// verification du rôle
router.get("/admin/dashboard", verifierToken, verifierAdmin, (req, res) => { 
  res.json({ message: "Bienvenue dans l'espace admin", utilisateur: req.utilisateur });
});

// Route pour supprimer un utilisateur (admin uniquement)
router.delete("/:id", verifierToken, verifierAdmin, deleteUser);

module.exports = router;
