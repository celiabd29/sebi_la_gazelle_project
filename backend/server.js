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
    // Configuration CORS pour autoriser toutes les origines
    app.use(cors({
      origin: "*", // Autorise toutes les origines
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ajoute OPTIONS
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false // Désactivé car incompatible avec origin: "*"
    }));

    // Alternative si vous voulez garder les credentials
    // app.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    //   res.header("Access-Control-Allow-Credentials", "true");
    //   next();
    // });

    app.use(bodyParser.json());
    app.use(express.json({ limit: "10mb" }));

    // Gestion des requêtes OPTIONS (pré-vol)
    app.options("*", cors()); // Enable pre-flight for all routes

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