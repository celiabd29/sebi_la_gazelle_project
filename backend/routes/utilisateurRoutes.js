const express = require("express");
const { inscription, connexion, verifierCompte } = require("../controllers/utilisateurController");
const router = express.Router();

const verifierToken = require("../middleware/auth");
const verifierAdmin = require("../middleware/auth");

router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.get("/verification", verifierCompte);
router.get("/admin/dashboard", verifierToken, verifierAdmin, (req, res) => {
  res.json({ message: "Bienvenue dans l'espace admin" });
});

module.exports = router;
