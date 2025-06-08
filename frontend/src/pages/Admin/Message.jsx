import { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8008/api/contact/messages"
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des messages :", err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>nom</th>
            <th>prenom</th>
            <th>Email</th>
            <th>Date d'envoi</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td>{m._id}</td>

              <td className="flex items-center gap-2">
                <img
                  src="/avatar.png"
                  className="w-6 h-6 rounded-full"
                  alt=""
                />
                {m.nom}
              </td>
              <td className="">
                {m.prenom}
              </td>
              <td>{m.email}</td>
              <td>{new Date(m.date).toLocaleDateString()}</td>
              <td>{m.message}</td>
              <td>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
