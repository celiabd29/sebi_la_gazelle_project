const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const connecterDB = require("./config/database");
const analyticsRoutes = require("./routes/analyse");

// Charger les variables d'environnement
dotenv.config();
// ✅ Connexion Mongoose (utilisateurs)
connecterDB();
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
    // app.use(cors({
    //   origin: "*", // Autorise toutes les origines
    //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ajoute OPTIONS
    //   allowedHeaders: ["Content-Type", "Authorization"],
    //   credentials: false // Désactivé car incompatible avec origin: "*"
    // }));

    app.use(cors({
      origin: [
        'http://sebilagazelle.fr',
        'https://sebilagazelle.fr',
        'http://www.sebilagazelle.fr',
        'https://www.sebilagazelle.fr'
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      credentials: true
    }));

    app.use(cors(corsOptions));

    // Pour les requêtes OPTIONS (pré-vol)
    app.options('*', cors(corsOptions));

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json({ limit: "10mb" }));

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