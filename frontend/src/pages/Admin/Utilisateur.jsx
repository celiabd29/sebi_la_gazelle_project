import { useEffect, useState } from "react";
import axios from "axios";

const Utilisateur = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8008/api/utilisateurs/tous"
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Utilisateurs inscrit</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Email</th>
            <th>Date d'inscription</th>
            <th>Date de naissance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td>{u._id.slice(0, 4)}</td>
              <td className="flex items-center gap-2">
                <img
                  src="/avatar.png"
                  className="w-6 h-6 rounded-full"
                  alt=""
                />
                {u.name}
              </td>
              <td>{u.email}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>{new Date(u.dateDeNaissance).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Utilisateur;