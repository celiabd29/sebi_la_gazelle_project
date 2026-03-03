const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const errorHandler = require("./middleware/errorHandler");
const controleRoutes = require("./routes/controleParentalRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/controle", controleRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongoose connecté (utilisateurs)"))
  .catch((err) => {
    console.error("❌ Erreur Mongoose :", err);
    process.exit(1);
  });

MongoClient.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000, // évite de bloquer trop longtemps
})
  .then((client) => {
    const db = client.db();

    const scoreRoutes = require("./routes/scoreRoutes");
    app.use(
      "/api/scores",
      (req, res, next) => {
        req.db = db;
        next();
      },
      scoreRoutes
    );

    const utilisateurRoutes = require("./routes/utilisateurRoutes");
    app.use("/api/utilisateurs", utilisateurRoutes);
    app.use("/api/verification", utilisateurRoutes);
    app.use("/api/tous", utilisateurRoutes);

    app.use("/api/contact", require("./routes/contactRoutes"));
    app.use("/api/avatars", require("./routes/avatarRoutes"));

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/dist")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
      });
    }

    app.use(errorHandler);

    const PORT = process.env.PORT || 8008;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur MongoClient (scores) :", err);
    process.exit(1);
  });
