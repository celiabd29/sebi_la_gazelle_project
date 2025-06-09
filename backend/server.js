const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
const connecterDB = require("./config/database");
// Charger les variables d'environnement
dotenv.config();
console.log("✅ Variables d'environnement chargées");
console.log("✅ MONGO_URI :", process.env.MONGO_URI);
console.log("✅ DB_NAME :", process.env.DB_NAME);
console.log("✅ FRONTEND_URL :", process.env.FRONTEND_URL);
console.log("✅ FRONTEND_URL_ALT :", process.env.FRONTEND_URL_ALT);
console.log("✅ FRONTEND_URL_SECURE :", process.env.FRONTEND_URL_SECURE);
console.log("✅ FRONTEND_URL_SECURE_ALT :", process.env.FRONTEND_URL_SECURE_ALT);
// Définir corsOptions AVANT les connexions DB
const corsOptions = {
  origin: [
    "https://sebilagazelle.com", // Remplacez par votre domaine o2switch
    "http://sebilagazelle.com",
    "https://www.sebilagazelle.com",
    "http://www.sebilagazelle.com",
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_ALT,
    process.env.FRONTEND_URL_SECURE,
    process.env.FRONTEND_URL_SECURE_ALT
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true  // Avant de définir les routes

};
connecterDB(); // Connexion à la base de données MongoDB
// ✅ Connexion Mongoose
mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME
})
  .then(() => console.log("✅ Mongoose connecté (utilisateurs)"))
  .catch((err) => {
    console.error("❌ Erreur Mongoose :", err);
    process.exit(1);
  });

// ✅ Connexion MongoClient
MongoClient.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME
})
  .then((client) => {
    const db = client.db();

    const app = express();

    // Middlewares
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(express.json({ limit: "10mb" }));

    // Routes
    const scoreRoutes = require("./routes/scoreRoutes");
    app.use("/api/scores", (req, res, next) => {
      req.db = db;
      next();
    }, scoreRoutes);

    app.use((req, res, next) => {
      console.log(`Requête reçue: ${req.method} ${req.url}`);
      console.log(`Origin: ${req.headers.origin}`);
      next();
    });
    // ✅ Routes utilisant Mongoose
    app.use("/api/utilisateurs", require("./routes/utilisateurRoutes"));
    app.use("/api/contact", require("./routes/contactRoutes"));
    app.use("/api/verification", require("./routes/utilisateurRoutes"));
    app.use("/api/tous", require("./routes/utilisateurRoutes"));
    // app.use("/api/analytics", analyticsRoutes);

    const PORT = process.env.PORT || 8008;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur MongoClient (scores) :", err);
    process.exit(1);
  });