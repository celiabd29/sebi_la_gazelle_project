const errorHandler = (err, req, res, next) => {
    console.error(`[❌ ERREUR] ${err.message}`); // Log de l'erreur côté console

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Une erreur interne est survenue",
    });
};

module.exports = errorHandler;