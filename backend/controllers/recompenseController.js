const Recompense = require("../models/Recompense");


const ajouterRecompense = async (req, res) => {
  const userId = req.utilisateur._id;
  const { imageUrl, jeu, niveau } = req.body;

  console.log("📦 Données reçues :", req.body);

  if (!imageUrl || !jeu || !niveau) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    const nouvelleRecompense = new Recompense({
      utilisateur: userId,
      url: imageUrl,
      jeu,
      niveau,
    });

    await nouvelleRecompense.save();
    res.status(201).json(nouvelleRecompense);
  } catch (err) {
    console.error("❌ Erreur Mongo :", err);
    res.status(500).json({ error: "Erreur sauvegarde récompense" });
  }
};


const getMesRecompenses = async (req, res) => {
  try {
   const recompenses = await Recompense.find({ utilisateur: req.utilisateur._id });
    res.json(recompenses);
  } catch (err) {
    res.status(500).json({ message: "Erreur de récupération", err });
  }
};


module.exports = {
  ajouterRecompense,
  getMesRecompenses,
};
