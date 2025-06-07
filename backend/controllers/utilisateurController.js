const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../config/mailer"); // assure-toi d'avoir exporté correctement

const ADMIN_EMAILS = [
  "eleisawy19@gmail.com",
  "c_abbad@stu-digital-campus.fr",
  "n_dhaou@stu-digital-campus.fr",
  "n_hannachi@stu-digital-campus.fr",
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

    const role = ADMIN_EMAILS.includes(email.toLowerCase())
      ? "admin"
      : "utilisateur";

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

    res
      .status(201)
      .json({ message: "Inscription réussie. Vérifiez votre email." });
  } catch (error) {
    console.error("Erreur inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.connexion = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    const estValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!estValide)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    if (!utilisateur.estVerifie) {
      return res.status(403).json({
        message: "Compte non vérifié. Veuillez vérifier votre email.",
      });
    }

    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

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

exports.getMonProfil = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.utilisateur.id).select(
      "-motDePasse -verificationToken"
    );

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(utilisateur);
  } catch (error) {
    console.error("Erreur getMonProfil :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 📄 GET mon profil
exports.getMonProfil = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.utilisateur.id).select(
      "-motDePasse -verificationToken"
    );
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(utilisateur);
  } catch (error) {
    console.error("Erreur récupération profil :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✏️ PUT mise à jour profil
exports.mettreAJourProfil = async (req, res) => {
  try {
    const champsAutorisés = [
      "nom",
      "prenom",
      "email",
      "avatar",
      "dateDeNaissance",
    ];
    const miseAJour = {};

    champsAutorisés.forEach((champ) => {
      if (req.body[champ]) {
        miseAJour[champ] = req.body[champ];
      }
    });

    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.utilisateur.id,
      miseAJour,
      { new: true }
    ).select("-motDePasse -verificationToken");

    res.json(utilisateur);
  } catch (error) {
    console.error("Erreur mise à jour profil :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
