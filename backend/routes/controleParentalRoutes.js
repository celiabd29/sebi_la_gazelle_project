const express = require("express");
const router = express.Router();
const {
  getTempsRestant,
  ajouterTemps,
} = require("../controllers/controleParentalController");

// 🔍 Temps restant aujourd'hui pour un utilisateur
router.get("/temps", getTempsRestant);

// ➕ Ajouter du temps (ex: après un jeu ou une activité)
router.post("/ajouter", ajouterTemps);

module.exports = router;
