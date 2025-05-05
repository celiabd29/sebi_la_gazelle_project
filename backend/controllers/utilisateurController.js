const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../config/mailer"); // assure-toi d'avoir exporté correctement

exports.inscription = async (req, res) => {
    const { nom, prenom, age, email, motDePasse } = req.body;
  
    try {
      let utilisateur = await Utilisateur.findOne({ email });
      if (utilisateur) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }
  
      const hash = await bcrypt.hash(motDePasse, 10);
      const verificationToken = crypto.randomBytes(32).toString("hex");
  
      utilisateur = new Utilisateur({
        nom,
        prenom,
        age,
        email,
        motDePasse: hash,
        verificationToken,
        estVerifie: false,
      });
  
      await utilisateur.save();
  
      await sendVerificationEmail(email, verificationToken);
  
      res.status(201).json({ message: "Inscription réussie. Vérifiez votre email." });
    } catch (error) {
      console.error("Erreur inscription :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

exports.connexion = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) return res.status(400).json({ message: "Utilisateur non trouvé" });

        const estValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!estValide) return res.status(400).json({ message: "Mot de passe incorrect" });

        if (!utilisateur.isVerified) {
            return res.status(403).json({ message: "Compte non vérifié. Veuillez vérifier votre email." });
        }

        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, utilisateur });
    } catch (error) {
        console.error("Erreur dans la connexion :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.verifierCompte = async (req, res) => {
    const { token } = req.query;
  
    try {
      const utilisateur = await Utilisateur.findOne({ verificationToken: token });
      if (!utilisateur) {
        return res.status(400).json({ message: "Token invalide" });
      }
  
      utilisateur.estVerifie = true;
      utilisateur.verificationToken = undefined;
      await utilisateur.save();
  
      res.status(200).json({ message: "Compte vérifié avec succès" });
    } catch (error) {
      console.error("Erreur de vérification :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  