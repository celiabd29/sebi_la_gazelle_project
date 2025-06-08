const SecuritySettings = () => {
  return (
    <form className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl">
      <div>
        <label>Mot de passe actuel</label>
        <input type="password" className="w-full border rounded p-2 mt-1" />
      </div>
      <div>
        <label>Nouveau mot de passe</label>
        <input type="password" className="w-full border rounded p-2 mt-1" />
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 float-right">
        Sauvegarder
      </button>
    </form>
  );
};

export default SecuritySettings;
