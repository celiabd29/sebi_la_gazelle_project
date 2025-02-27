const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connecterDB = require("./config/database");

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connecterDB();

// Créer une instance d'Express
const app = express();

// Middleware CORS et parsing JSON
app.use(cors());
app.use(bodyParser.json());

// Serveur API
app.use("/api/utilisateurs", require("./routes/utilisateurRoutes"));

// Servir les fichiers statiques du build React
if (process.env.NODE_ENV === "production") {
  // Serve les fichiers du dossier 'build' généré par React
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Redirige toutes les requêtes vers 'index.html' (pour gérer la navigation côté client)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// Démarrer le serveur
app.listen(5000, () => console.log("Serveur démarré sur le port 5000"));
