import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { GlobeIcon, LaptopIcon, SmartphoneIcon, TabletIcon } from 'lucide-react';

export default function AnalyseDashboard() {
  const [deviceData, setDeviceData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [browserData, setBrowserData] = useState([]);
  const [newClients, setNewClients] = useState(0);

  useEffect(() => {
    // fetch('https://sebi-la-gazelle-backend.onrender.com/api/analytics/devices')
    fetch('http://localhost:8008/api/analytics/devices')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(device => {
          let icon, color;
          switch (device.name.toLowerCase()) {
            case 'desktop':
            case 'computer':
              icon = <LaptopIcon />;
              color = '#4F46E5';
              break;
            case 'mobile':
              icon = <SmartphoneIcon />;
              color = '#10B981';
              break;
            case 'tablet':
              icon = <TabletIcon />;
              color = '#F59E0B';
              break;
            default:
              icon = <GlobeIcon />;
              color = '#6B7280';
          }

          return { ...device, icon, color };
        });
        setDeviceData(formatted);
      });

    // fetch('https://sebi-la-gazelle-backend.onrender.com/api/analytics/pages')
    fetch('http://localhost:8008/api/analytics/pages')
      .then(res => res.json())
      .then(setPageData);

    // fetch('https://sebi-la-gazelle-backend.onrender.com/api/analytics/browsers')
    fetch('http://localhost:8008/api/analytics/browsers')
      .then(res => res.json())
      .then(setBrowserData);

    // fetch('https://sebi-la-gazelle-backend.onrender.com/api/analytics/newClients')
    fetch('http://localhost:8008/api/analytics/newClients')
      .then(res => res.json())
      .then(data => setNewClients(data.total));
  }, []);

  const DevicesCard = (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Présentation des appareils</h2>
      {deviceData.map((device) => (
        <div key={device.name} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {device.icon}
            <span>{device.name}</span>
          </div>
          <p className="font-semibold text-sm">{device.value.toLocaleString()} utilisateurs</p>
        </div>
      ))}
    </div>
  );

  const PagesPieChart = (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Pages les plus visitées</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pageData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {pageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const BrowserStats = (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Navigateurs</h2>
      {browserData.map((browser) => (
        <div key={browser.name} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: browser.color }}
            />
            <span>{browser.name}</span>
          </div>
          <p className="font-semibold text-sm">{browser.value}%</p>
        </div>
      ))}
    </div>
  );

  const NewClients = (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Nouveaux clients</h2>
      <div className="text-center mt-4">
        <p className="text-4xl font-bold">{newClients}</p>
        <p className="text-sm text-gray-500">+0.3% par rapport à hier</p>
      </div>
    </div>
  );

  const WorldMapCard = (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Carte mondiale</h2>
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <GlobeIcon className="w-16 h-16 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-4">
      {DevicesCard}
      {PagesPieChart}
      {BrowserStats}
      {NewClients}
      {WorldMapCard}
    </div>
  );
}
