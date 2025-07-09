import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sales, setSales] = useState([]);
  const [salesLoading, setSalesLoading] = useState(true);
  const [salesError, setSalesError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/sales/monthly')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch sales');
        return res.json();
      })
      .then(data => {
        setSales(data);
        setSalesLoading(false);
      })
      .catch(err => {
        setSalesError(err.message);
        setSalesLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className=" border-pink-600 border rounded-lg p-6 flex flex-col items-center">
          <span className="text-3xl  font-bold">{stats.productsCount}</span>
          <span className="mt-2 ">Products</span>
        </div>
        <div className=" border-pink-600 border rounded-lg p-6 flex flex-col items-center">
          <span className="text-3xl  font-bold">{stats.ordersCount}</span>
          <span className="mt-2 ">Orders</span>
        </div>
        <div className="border-pink-600 border rounded-lg p-6 flex flex-col items-center">
          <span className="text-3xl  font-bold">{stats.usersCount}</span>
          <span className="mt-2 ">Users</span>
        </div>
        <div className="border-pink-600 border  rounded-lg p-6 flex flex-col items-center">
          <span className="text-3xl  font-bold">{stats.categoriesCount}</span>
          <span className="mt-2 ">Categories</span>
        </div>
      </div>
   
      {/* Sales Line Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4">Sales (Monthly)</h2>
        {salesLoading ? (
          <div>Loading sales chart...</div>
        ) : salesError ? (
          <div className="text-red-600">Error: {salesError}</div>
        ) : sales.length === 0 ? (
          <div>No sales data available.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSales" fill="#be185d" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
} 