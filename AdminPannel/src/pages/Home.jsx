import React, { useState, useEffect } from 'react';
import { Activity, Users, DollarSign, LineChart } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white rounded-lg shadow-md transform transition-all duration-500 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
            </p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomCard = ({ title, children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white rounded-lg shadow-md transform transition-all duration-500 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    } ${className}`}>
      <div className="border-b border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

const AdminHome = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, title: 'Total Users', value: 'Available Soon', trend: 12.5, delay: 100 },
    { icon: Activity, title: 'Active Sessions', value: 'Available Soon', trend: 8.2, delay: 200 },
    { icon: DollarSign, title: 'Revenue', value: 'Available Soon', trend: -2.4, delay: 300 },
    { icon: LineChart, title: 'Conversion Rate', value: 'Available Soon', trend: 4.1, delay: 400 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className={`transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your platform today.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <CustomCard title="Recent Activity" delay={500}>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user registration</p>
                    <p className="text-xs text-gray-500">Available Soon</p>
                  </div>
                </div>
              ))}
            </div>
          </CustomCard>

          <CustomCard title="System Status" delay={600}>
            <div className="space-y-4">
              {[
                { name: 'API Server', status: 'Operational', color: 'bg-green-500' },
                { name: 'Database', status: 'Operational', color: 'bg-green-500' },
                { name: 'Storage', status: 'Degraded', color: 'bg-yellow-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-500">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;