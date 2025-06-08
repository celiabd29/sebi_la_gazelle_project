const EditProfile = () => {
  return (
    <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex gap-4 items-center">
        <img src="/profile.jpg" className="w-16 h-16 rounded-full" />
        <button className="text-blue-500 underline">Changer</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full border rounded p-2 mt-1"
            defaultValue={{}}
          />
        </div>
        <div>
          <label>Votre nom</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label>Date de naissance</label>
          <input
            type="date"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label>Password</label>
          <input type="password" className="w-full border rounded p-2 mt-1" />
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 float-right">
        Sauvegarder
      </button>
    </form>
  );
};

export default EditProfile;
