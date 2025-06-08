const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
<<<<<<< Updated upstream
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
=======
const connecterDB = require("./config/database");
const analyticsRoutes = require("./routes/analyse");
>>>>>>> Stashed changes

dotenv.config();

<<<<<<< Updated upstream
// ✅ Connexion Mongoose (utilisateurs, authentification)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongoose connecté (utilisateurs)"))
  .catch((err) => {
    console.error("❌ Erreur Mongoose :", err);
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connexion MongoClient pour les scores
MongoClient.connect(process.env.MONGO_URI)
  .then((client) => {
    const db = client.db();

    // ✅ Injecte db dans les routes scores
    const scoreRoutes = require("./routes/scoreRoutes");
    app.use("/api/scores", (req, res, next) => {
      req.db = db;
      next();
    }, scoreRoutes);

    // ✅ Autres routes (Mongoose)
    app.use("/api/utilisateurs", require("./routes/utilisateurRoutes"));
    app.use("/api/contact", require("./routes/contactRoutes"));
    app.use("/api/verification", require("./routes/utilisateurRoutes"));
    app.use("/api/tous", require("./routes/utilisateurRoutes"));

    // ✅ Production (React build)
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/build")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
      });
    }

    // ✅ Lancement serveur
    const PORT = process.env.PORT || 8008;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré : http://localhost:${PORT}`);
    });

  })
  .catch((err) => {
    console.error("❌ Erreur MongoClient (scores) :", err);
    process.exit(1);
  });
=======
// Connecter à la base de données
connecterDB();
// Créer une instance d'Express
const app = express();
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// Middleware CORS et parsing JSON
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// build le frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Serveur API
app.use("/api/analytics", analyticsRoutes);
app.use("/api/utilisateurs", require("./routes/utilisateurRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/verification", require("./routes/utilisateurRoutes"));
app.use("/api/tous", require("./routes/utilisateurRoutes"));

// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
>>>>>>> Stashed changes
