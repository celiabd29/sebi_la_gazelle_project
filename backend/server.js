const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();

// Charger les variables d'environnement
dotenv.config();

// Importer les configurations et middlewares
const connecterDB = require("./config/database");
const analyticsRoutes = require("./routes/analyse");
const logger = require('./config/winston');
const { errorHandler } = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const securityMiddleware = require('./middleware/securityMiddleware');
const errorRoutes = require('./routes/errorRoutes');

// Importer notre middleware de débogage
const debugMiddleware = require('./middleware/debugMiddleware');

// Connexion à la base de données
logger.info('Démarrage du serveur et connexion aux bases de données...');
connecterDB(); // Connexion à la base de données MongoDB

// ✅ Connexion Mongoose (utilisateurs)
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info("✅ Mongoose connecté (utilisateurs)"))
  .catch((err) => {
    logger.error("❌ Erreur Mongoose :", err);
    process.exit(1);
  });

// ✅ CORS configuré pour permettre les requêtes frontend
app.use(cors({
  origin: '*', // Permet toutes les origines en développement
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Middleware pour les en-têtes CORS explicites
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Parsing du body
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));

// ✅ Logger de requêtes
app.use(requestLogger);

// Ajouter le middleware de débogage pour le développement
app.use(debugMiddleware);

// ✅ Connexion MongoClient pour les scores
MongoClient.connect(process.env.MONGO_URI)
  .then((client) => {
    const db = client.db();
    
    // ✅ Middlewares de sécurité (avec gestion d'erreur si modules manquants)
    try {
      app.use(securityMiddleware.helmet());
      app.use(securityMiddleware.xss());
      app.use(securityMiddleware.hpp());
      app.use('/api/utilisateurs/connexion', securityMiddleware.bruteForceProtection);
      app.use(securityMiddleware.noSqlInjectionDetection);
    } catch (err) {
      logger.error("Erreur lors de l'initialisation des middlewares de sécurité:", err);
    }

    // ✅ Routes utilisant MongoClient
    const scoreRoutes = require("./routes/scoreRoutes");
    app.use("/api/scores", (req, res, next) => {
      req.db = db;
      next();
    }, scoreRoutes); 

    // ✅ Routes utilisant Mongoose
    app.use("/api/utilisateurs", require("./routes/utilisateurRoutes"));
    app.use("/api/contact", require("./routes/contactRoutes"));
    app.use("/api/analytics", analyticsRoutes);
    app.use("/api/errors", errorRoutes);
    
    // ✅ Route pour vérifier que le serveur est en ligne
    app.get('/api/status', (req, res) => {
      res.status(200).json({ status: 'ok', message: 'Le serveur fonctionne correctement' });
    }); 
    
    // ✅ Middleware de gestion des erreurs
    app.use(errorHandler);

    // ✅ Lancement du serveur
    const PORT = process.env.PORT || 8008;
    app.listen(PORT, () => {
      logger.info(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });

  })
  .catch((err) => {
    logger.error("❌ Erreur MongoClient (scores) :", err);
    console.error("❌ Erreur MongoClient (scores) :", err);
    process.exit(1);
  });

// Gestion des erreurs globales non attrapées
process.on('unhandledRejection', (err) => {
  logger.error('ERREUR NON GÉRÉE! Arrêt du serveur...');
  logger.error(err.name, err.message, err.stack);
  console.error('ERREUR NON GÉRÉE!', err);
  process.exit(1);
});
