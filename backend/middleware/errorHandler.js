const logger = require("../config/winston");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Une erreur interne est survenue";

  const logDetails = {
    method: req.method,
    path: req.path,
    ip: req.ip,
    body: req.method !== "GET" ? req.body : {},
    params: req.params,
    query: req.query,
    stack: err.stack,
  };

  // 🔎 Gestion erreurs MongoDB
  if (err.name === "ValidationError") {
    message = Object.values(err.errors).map(val => val.message).join(", ");
    statusCode = 400;
  }

  if (err.code === 11000) {
    message = `Valeur en doublon détectée: ${Object.keys(err.keyValue).join(", ")}`;
    statusCode = 400;
  }

  if (err.name === "CastError") {
    message = `Format invalide pour ${err.path}`;
    statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    message = "Token invalide. Veuillez vous reconnecter.";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Votre session a expiré. Veuillez vous reconnecter.";
    statusCode = 401;
  }

  // 🔥 Log selon gravité
  if (statusCode >= 500) {
    logger.error(message, logDetails);
    res.status(statusCode).json({
      success: false,
      message: "Une erreur interne est survenue",
    });
  } else {
    logger.warn(message, logDetails);
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

module.exports = errorHandler;
