const Contact = require("../models/Contact");
exports.contact = async (req, res) => {
    const { prenom, nom, email, message } = req.body;
  
    console.log("Requête reçue :", req.body); // 👈 ajoute ceci
  
    try {
      let contact = new Contact({ prenom, nom, email, message });
      await contact.save();
      res.status(201).json({ message: "Formulaire de contact envoyé" });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error); // 👈 déjà présent
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  

  