const express = require("express");
const { inscription, connexion, verifierCompte } = require("../controllers/utilisateurController");
const router = express.Router();
const utilisateur = require("../models/Utilisateur");
const verifierToken = require("../middleware/auth");
const verifierAdmin = require("../middleware/auth");


router.get("/tous", async (req, res) => {
  try {
    const utilisateurs = await utilisateur.find().sort({ createdAt: -1 });
    res.json(utilisateurs);
  } catch (err) {
    console.error(err); // 👈 très important
    res.status(500).json({ message: "Erreur serveur lors de la récupération des utilisateurs." });
  }
});
// Routes pour l'inscription et la connexion
router.post("/inscription", inscription);
router.post("/connexion", connexion);
// Vérification de l'email
router.get("/verification", verifierCompte);
// verification du rôle
router.get("/admin/dashboard", verifierToken, verifierAdmin, (req, res) => { 
  res.json({ message: "Bienvenue dans l'espace admin", utilisateur: req.utilisateur });
});

module.exports = router;
