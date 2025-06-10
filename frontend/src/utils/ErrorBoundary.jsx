import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Journalise l'erreur vers la console
    console.error("Erreur capturée:", error, errorInfo);
    
    // Si vous avez un endpoint pour enregistrer les erreurs, utilisez-le ici
    try {
      fetch("/api/errors/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: error.toString(), errorInfo: errorInfo.componentStack })
      }).catch(() => console.log("Impossible d'envoyer l'erreur au serveur"));
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'erreur au serveur:", err);
    }

    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Oups, quelque chose s'est mal passé</h2>
            <p className="text-gray-600 text-center mb-6">
              Nous sommes désolés pour ce désagrément. L'erreur a été signalée à notre équipe.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition-colors"
              >
                Actualiser la page
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors"
              >
                Retour
              </button>
            </div>
            
            {/* Afficher les détails de l'erreur pour le développement */}
            {this.state.error && (
              <div className="mt-6 p-4 bg-gray-100 rounded overflow-auto text-xs">
                <p className="font-bold text-red-600">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <pre className="mt-2 text-gray-700">{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
