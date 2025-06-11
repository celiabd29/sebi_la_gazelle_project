import { Outlet } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar";
import DashboardNavbar from "../DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
        <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
