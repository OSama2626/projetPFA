import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Users, AlertTriangle, CheckCircle, Clock, TrendingUp, Train, MapPin, Settings, Bell, Search, Filter } from 'lucide-react';
import Sidebar from '../../components/AdminEtablissement/Sidebar'; 
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Données de démonstration
  const controlsData = [
    { name: 'À priori', value: 85, color: '#10B981' },
    { name: 'Sur le vif', value: 65, color: '#F59E0B' },
    { name: 'À posteriori', value: 92, color: '#3B82F6' }
  ];

  const monthlyData = [
    { month: 'Jan', controls: 120, incidents: 5, efficiency: 95 },
    { month: 'Fév', controls: 135, incidents: 3, efficiency: 97 },
    { month: 'Mar', controls: 148, incidents: 7, efficiency: 93 },
    { month: 'Avr', controls: 162, incidents: 4, efficiency: 96 },
    { month: 'Mai', controls: 158, incidents: 2, efficiency: 98 },
    { month: 'Jun', controls: 175, incidents: 6, efficiency: 94 }
  ];

  const structureData = [
    { name: 'Établissements', total: 12, active: 12, alerts: 0 },
    { name: 'Centres', total: 45, active: 43, alerts: 2 },
    { name: 'Antennes', total: 28, active: 26, alerts: 2 },
    { name: 'Départements', total: 156, active: 150, alerts: 6 },
    { name: 'Services', total: 324, active: 318, alerts: 6 }
  ];

  const materielData = [
    { name: 'Responsable KN1', total: 89, operational: 84, maintenance: 5 },
    { name: 'Responsable KN2', total: 15, operational: 14, maintenance: 1 },
    { name: 'Responsable KN3', total: 67, operational: 65, maintenance: 2 },
    { name: 'Collaborateur', total: 23, operational: 21, maintenance: 2 }
  ];

  const recentAlerts = [
    { id: 1, type: 'Maintenance', description: 'Engin moteur M-245 nécessite une révision', priority: 'high', time: '2h' },
    { id: 2, type: 'Contrôle', description: 'Inspection programmée - Gare Centrale', priority: 'medium', time: '4h' },
    { id: 3, type: 'Incident', description: 'Retard signalé sur ligne L-12', priority: 'low', time: '6h' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}% ce mois
          </p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => (
    <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-400 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              alert.priority === 'high' ? 'bg-red-100 text-red-800' :
              alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {alert.type}
            </span>
            <span className="text-xs text-gray-500">il y a {alert.time}</span>
          </div>
          <p className="text-sm text-gray-700">{alert.description}</p>
        </div>
        <Bell className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar page={"Tableau de Bord"}/>
        <main className="p-6 flex-grow overflow-auto">


          

          

          {/* Types de contrôles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Contrôles</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={controlsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {controlsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {controlsData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Matériel</h3>
              <div className="space-y-4">
                {materielData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-900">{item.total} total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
