const express = require("express");
const router = express.Router();
const utilisateur = require("../models/Utilisateur");
const {
  inscription,
  connexion,
  verifierCompte,
  mettreAJourProfil,
  getMonProfil,
  changerMotDePasse, // ✅ ajout ici
} = require("../controllers/utilisateurController");

const { verifierToken, verifierAdmin } = require("../middleware/auth");

// 📩 Authentification
router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.get("/verification", verifierCompte);

// 🔁 Liste de tous les utilisateurs (admin ou debug)
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

// 🔐 Obtenir les infos du profil connecté (version API REST standard)
router.get("/profil", verifierToken, getMonProfil);

// 🔐 Obtenir les infos du profil connecté (version enrichie, avec avatar complet)
router.get("/me", verifierToken, async (req, res) => {
  try {
    const user = await utilisateur.findById(req.utilisateur.id).lean();

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Si avatar est relatif, on le complète avec le domaine
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

// 🔐 Mise à jour du profil connecté
router.put("/me", verifierToken, mettreAJourProfil);

// 🔐 Changement de mot de passe
router.put("/me/password", verifierToken, changerMotDePasse);

// 👑 Espace admin
router.get("/admin/dashboard", verifierToken, verifierAdmin, (req, res) => {
  res.json({
    message: "Bienvenue dans l'espace admin",
    utilisateur: req.utilisateur,
  });
});

module.exports = router;
