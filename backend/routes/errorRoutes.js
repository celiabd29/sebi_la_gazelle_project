const express = require('express');
const router = express.Router();
const logger = require('../config/winston');

// Route pour enregistrer les erreurs frontend
router.post('/log', (req, res) => {
  const { error, errorInfo } = req.body;
  
  logger.error('Erreur frontend :', { 
    message: error, 
    stack: errorInfo,
    userAgent: req.headers['user-agent'],
    ip: req.ip
  });
  
  res.status(200).json({ message: 'Erreur enregistrée' });
});

module.exports = router;
