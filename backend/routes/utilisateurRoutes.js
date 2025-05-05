const express = require("express");
const { inscription, connexion, verifierCompte } = require("../controllers/utilisateurController");

const router = express.Router();

router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.get("/verification", verifierCompte);

module.exports = router;
