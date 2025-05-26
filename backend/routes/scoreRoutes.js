const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

// Ajouter ou mettre à jour un score
router.post("/", scoreController.addOrUpdateScore);

// Récupérer les scores d’un utilisateur pour un jeu
router.get("/:userId", scoreController.getScoresByUser);

module.exports = router;
