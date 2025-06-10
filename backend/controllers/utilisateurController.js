const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose"); // Ajout de cet import important
const { sendVerificationEmail } = require("../config/mailer"); // assure-toi d'avoir exporté correctement


const ADMIN_EMAILS = [
  "eleisawy19@gmail.com",
  "c_abbad@stu-digital-campus.fr",
  "n_dhaou@stu-digital-campus.fr",
  "n_hannachi@stu-digital-campus.fr"
];
exports.inscription = async (req, res) => {
    const { nom, prenom, dateDeNaissance, email, motDePasse, avatar } = req.body;

    try {
      let utilisateur = await Utilisateur.findOne({ email });
      if (utilisateur) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }
  
      const hash = await bcrypt.hash(motDePasse, 10);
      const verificationToken = crypto.randomBytes(32).toString("hex");
  
      const role = ADMIN_EMAILS.includes(email.toLowerCase()) ? "admin" : "utilisateur";
      
      utilisateur = new Utilisateur({
        nom,
        prenom,
        dateDeNaissance,
        avatar,
        email,
        motDePasse: hash,
        verificationToken,
        estVerifie: false,
        role,
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

        if (!utilisateur.estVerifie) {
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

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, avatar, dateDeNaissance } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les champs
    if (nom) utilisateur.nom = nom;
    if (prenom) utilisateur.prenom = prenom;
    if (avatar) utilisateur.avatar = avatar;
    if (dateDeNaissance) utilisateur.dateDeNaissance = dateDeNaissance;

    await utilisateur.save();

    // Retourner l'utilisateur mis à jour sans le mot de passe
    const updatedUser = utilisateur.toObject();
    delete updatedUser.motDePasse;
    delete updatedUser.verificationToken;

    res.json({ message: "Profil mis à jour avec succès", utilisateur: updatedUser });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du profil" });
  }
};

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier le mot de passe actuel
    const isValidPassword = await bcrypt.compare(currentPassword, utilisateur.motDePasse);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Mot de passe actuel incorrect" });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    utilisateur.motDePasse = hashedPassword;

    await utilisateur.save();

    res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du mot de passe" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifier que l'ID est valide
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier que l'administrateur ne supprime pas son propre compte
    if (req.utilisateur && utilisateur._id.toString() === req.utilisateur.id) {
      return res.status(400).json({ 
        message: "Impossible de supprimer votre propre compte administrateur" 
      });
    }

    // Supprimer l'utilisateur
    await Utilisateur.findByIdAndDelete(id);

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur" });
  }
};
