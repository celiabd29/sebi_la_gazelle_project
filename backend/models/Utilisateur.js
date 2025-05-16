const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    avatar: { type: String, default: "default-avatar.png", required: false },
    dateDeNaissance: { type: Date, required: false },
    estVerifie: { type: Boolean, default: false },
    verificationToken: { type: String },
    role: {
        type: String,
        enum: ["utilisateur", "admin"],
        default: "utilisateur",
    },
}, { timestamps: true });

module.exports = mongoose.model("Utilisateur", utilisateurSchema);