// Middleware simple pour déboguer les requêtes API
const debugMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  // Si la requête contient un corps (pour POST, PUT)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  // Si la requête contient des paramètres
  if (Object.keys(req.params).length > 0) {
    console.log('Params:', req.params);
  }
  
  // Si la requête contient des query params
  if (Object.keys(req.query).length > 0) {
    console.log('Query:', req.query);
  }

  // Si la requête contient un header d'autorisation
  const authHeader = req.headers.authorization;
  if (authHeader) {
    console.log('Auth:', authHeader.startsWith('Bearer ') ? 'Bearer Token présent' : authHeader);
  }

  // Capturer et logger également la réponse
  const originalSend = res.send;
  res.send = function(body) {
    // Éviter de logger des données sensibles ou des réponses trop grandes
    if (body && typeof body === 'string' && body.length < 1000) {
      try {
        const data = JSON.parse(body);
        if (Array.isArray(data)) {
          console.log(`Réponse: Array[${data.length}]`);
        } else {
          console.log('Réponse:', body.substring(0, 200) + (body.length > 200 ? '...' : ''));
        }
      } catch (e) {
        console.log('Réponse non-JSON:', body.substring(0, 50) + (body.length > 50 ? '...' : ''));
      }
    }
    originalSend.call(this, body);
  };
  
  next();
};

module.exports = debugMiddleware;
