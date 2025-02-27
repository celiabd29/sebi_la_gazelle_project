const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.inscription = async (req, res) => {
    const { nom, prenom, age, email, motDePasse } = req.body;

    try {
        let utilisateur = await Utilisateur.findOne({ email });
        if (utilisateur) return res.status(400).json({ message: "Email déjà utilisé" });

        const sel = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(motDePasse, sel);

        utilisateur = new Utilisateur({ nom, prenom, age, email, motDePasse: hash });
        await utilisateur.save();

        res.status(201).json({ message: "Inscription réussie" });
    } catch (error) {
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

        const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, utilisateur });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
