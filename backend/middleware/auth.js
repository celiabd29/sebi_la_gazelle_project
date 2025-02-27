const jwt = require("jsonwebtoken");

const verifierToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Accès refusé" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.utilisateur = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token invalide" });
    }
};

module.exports = verifierToken;
