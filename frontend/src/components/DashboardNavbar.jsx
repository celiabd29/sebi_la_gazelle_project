const DashboardNavbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold">Principal</h1>
      <div className="flex items-center gap-4">
        {/* Langue, Notification, Avatar */}
        <div>🇫🇷</div>
        <img src="/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
        <div className="text-sm">
          <p className="font-semibold">MOMO</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
