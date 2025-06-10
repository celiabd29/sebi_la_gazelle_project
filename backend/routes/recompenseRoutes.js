const express = require("express");
const router = express.Router();
const recompenseController = require("../controllers/recompenseController");
const { verifierToken } = require("../middleware/auth"); // ✅

router.post("/", verifierToken, recompenseController.ajouterRecompense); // ✅
router.get("/", verifierToken, recompenseController.getMesRecompenses); // ✅

module.exports = router;
