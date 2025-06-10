const express = require("express");
const router = express.Router();
const utilisateur = require("../models/Utilisateur");
const {
  inscription,
  connexion,
  verifierCompte,
  mettreAJourProfil,
  getMonProfil,
  changerMotDePasse,
  modifierCodeParental,
  ajouterRecompense,      // <-- ajoute ici
  getRecompenses,         // <-- ajoute ici
} = require("../controllers/utilisateurController");

const { verifierToken, verifierAdmin } = require("../middleware/auth");

// 📩 Authentification
router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.get("/verification", verifierCompte);

// 🔁 Liste de tous les utilisateurs
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

// 🔐 Obtenir les infos du profil connecté
router.get("/profil", verifierToken, getMonProfil);

// 🔐 Obtenir les infos avec avatar complet
router.get("/me", verifierToken, async (req, res) => {
  try {
    const user = await utilisateur.findById(req.utilisateur.id).lean();

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

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

// 🔐 Mise à jour du profil
router.put("/me", verifierToken, mettreAJourProfil);

// 🔐 Changement de mot de passe
router.put("/me/password", verifierToken, changerMotDePasse);

// 🔐 ✅ Modification du code parental
router.put("/me/code-parent", verifierToken, modifierCodeParental);

// 🔐 Ajout d'une récompense (protégé par token)
router.post("/recompenses", verifierToken, ajouterRecompense);

// 🔐 Récupérer les récompenses d'un utilisateur (protégé par token)
router.get("/recompenses/:userId", verifierToken, getRecompenses);

// 👑 Espace admin
router.get("/admin/dashboard", verifierToken, verifierAdmin, (req, res) => {
  res.json({
    message: "Bienvenue dans l'espace admin",
    utilisateur: req.utilisateur,
  });
});

module.exports = router;
