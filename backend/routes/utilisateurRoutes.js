const express = require("express");
const router = express.Router();
const utilisateur = require("../models/Utilisateur");
const {
  inscription,
  connexion,
  verifierCompte,
  mettreAJourProfil,
} = require("../controllers/utilisateurController");
const { verifierToken, verifierAdmin } = require("../middleware/auth");

// 🔁 Liste de tous les utilisateurs (ex : pour l'admin)
router.get("/tous", async (req, res) => {
  try {
    const utilisateurs = await utilisateur.find().sort({ createdAt: -1 });
    res.json(utilisateurs);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des utilisateurs.",
    });
  }
});

// 📩 Authentification
router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.get("/verification", verifierCompte);

// 🔐 Route sécurisée - profil utilisateur connecté
router.get("/me", verifierToken, async (req, res) => {
  try {
    const user = await utilisateur.findById(req.utilisateurId).lean();

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // ✅ Reconstruire l’URL complète de l’avatar si nécessaire
    if (user.avatar && !user.avatar.startsWith("http")) {
      user.avatar = `${req.protocol}://${req.get("host")}/uploads/${
        user.avatar
      }`;
    }

    res.json(user);
  } catch (err) {
    console.error("Erreur /me :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔐 Mise à jour profil
router.put("/me", verifierToken, mettreAJourProfil);

// 👑 Admin access
router.get("/admin/dashboard", verifierToken, verifierAdmin, (req, res) => {
  res.json({
    message: "Bienvenue dans l'espace admin",
    utilisateur: req.utilisateur,
  });
});

module.exports = router;
