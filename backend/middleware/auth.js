const jwt = require("jsonwebtoken");

const verifierToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // amélioration : supporte "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Accès refusé" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token invalide" });
  }
};

const verifierAdmin = (req, res, next) => {
  if (req.utilisateur?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Accès réservé aux administrateurs" });
  }
  next();
};

module.exports = {
  verifierToken,
  verifierAdmin,
};
