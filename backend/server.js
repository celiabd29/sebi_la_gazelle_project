const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const connecterDB = require("./config/database");
const analyticsRoutes = require("./routes/analyse");

// Charger les variables d'environnement
dotenv.config();
connecterDB(); // Connexion à la base de données MongoDB
// ✅ Connexion Mongoose (utilisateurs)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongoose connecté (utilisateurs)"))
  .catch((err) => {
    console.error("❌ Erreur Mongoose :", err);
    process.exit(1);
  });

// ✅ Connexion MongoClient pour les scores
MongoClient.connect(process.env.MONGO_URI)
  .then((client) => {
    const db = client.db();

    // ✅ Créer une instance d'Express
    const app = express();

    // ✅ Middlewares
    // ✅ Configuration CORS précise (à placer avant les routes)
    const corsOptions = {
      origin: [
        "http://sebilagazelle.fr", // URL de production
        "http://localhost:3000",   // URL de développement
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true // Si vous utilisez des cookies/sessions
    };

    app.use(cors(corsOptions)); // Remplacez l'actuel app.use(cors())

    app.use(bodyParser.json());
    app.use(express.json({ limit: "10mb" })); // Augmentez la limite si nécessaire

    // ✅ Routes utilisant MongoClient
    const scoreRoutes = require("./routes/scoreRoutes");
    app.use("/api/scores", (req, res, next) => {
      req.db = db;
      next();
    }, scoreRoutes);

    // ✅ Routes utilisant Mongoose
    app.use("/api/utilisateurs", require("./routes/utilisateurRoutes"));
    app.use("/api/contact", require("./routes/contactRoutes"));
    app.use("/api/verification", require("./routes/utilisateurRoutes"));
    app.use("/api/tous", require("./routes/utilisateurRoutes"));
    app.use("/api/analytics", analyticsRoutes);

    // ✅ Production (serveur React)
    const frontendPath = path.join(__dirname, "../frontend/build");
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });

    // ✅ Lancement du serveur
    const PORT = process.env.PORT || 8008;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });

  })
  .catch((err) => {
    console.error("❌ Erreur MongoClient (scores) :", err);
    process.exit(1);
  });
