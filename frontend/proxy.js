const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS pour toutes les routes
app.use(cors());

// Configurer le proxy vers l'API backend
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8008',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api', // pas de réécriture nécessaire
  },
  onProxyReq: (proxyReq, req, res) => {
    // Log des requêtes
    console.log(`Proxying: ${req.method} ${req.url} -> http://localhost:8008${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy Error');
  }
}));

// Servir les fichiers statiques
app.use(express.static('dist'));

// Port pour le proxy
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
