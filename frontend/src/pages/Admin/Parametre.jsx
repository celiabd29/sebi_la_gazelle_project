import { useState } from "react";
import EditProfile from "../../components/admin/EditProfile";
import SecuritySettings from "../../components/admin/SecuritySettings";

const Parametre = () => {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Paramètre</h2>
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "edit" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Modifier
        </button>
        <button
          className={`px-4 py-2 font-medium ml-4 ${
            activeTab === "security" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Sécurité
        </button>
      </div>

      {activeTab === "edit" ? <EditProfile /> : <SecuritySettings />}
    </div>
  );
};

export default Parametre;
