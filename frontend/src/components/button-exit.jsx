function ExitButton() {
    const handleExit = () => {
      // Affiche un message dans la console
      console.log("Retour à l'accueil !");
    };
  
    return (
      <button
        className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg hover:bg-red-700"
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
        }}
        onClick={handleExit}
        title="Quitter"
      >
        <span className="text-2xl font-bold font-fredoka">X</span>
      </button>
    );
  }
  
  export default ExitButton;
  