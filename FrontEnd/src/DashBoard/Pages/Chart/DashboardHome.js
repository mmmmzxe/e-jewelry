import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchStats } from '../../../store/slices/statsSlice';
import { fetchMonthlySales } from '../../../store/slices/salesSlice';
import { fetchAllFeedback } from '../../../store/slices/feedbackSlice';

export default function DashboardHome() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(state => state.stats);
  const { sales, loading: salesLoading, error: salesError } = useSelector(state => state.sales);
  const { allFeedbacks, loading: feedbackLoading, error: feedbackError } = useSelector(state => state.feedback);

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchMonthlySales());
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  // Prepare feedback chart data
  let feedbackChartData = [];
  if (allFeedbacks && allFeedbacks.length > 0) {
    const userStats = {};
    allFeedbacks.forEach(fb => {
      const name = fb.userId?.name || 'Unknown';
      if (!userStats[name]) userStats[name] = { count: 0, totalRating: 0 };
      userStats[name].count += 1;
      userStats[name].totalRating += fb.rating;
    });
    feedbackChartData = Object.entries(userStats).map(([name, stats]) => ({
      name,
      feedbackCount: stats.count,
      avgRating: Number((stats.totalRating / stats.count).toFixed(2)),
    }));
  }

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  if (!stats) return null;

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
      <div className="bg-white rounded-lg shadow p-6 mb-8">
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
      {/* Feedback Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4">User Feedback Overview</h2>
        {feedbackLoading ? (
          <div>Loading feedback chart...</div>
        ) : feedbackError ? (
          <div className="text-red-600">Error: {feedbackError}</div>
        ) : feedbackChartData.length === 0 ? (
          <div>No feedback data available.</div>
        ) : (
          <>
            {feedbackChartData.length > 0 && (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border">
                  <thead>
                    <tr>
                    
                      <th className="px-2 py-1 border-b">Feedback Count</th>
                      <th className="px-2 py-1 border-b">Avg Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackChartData.map(row => (
                      <tr key={row.name}>
                       
                        <td className="px-2 py-1 border-b">{row.feedbackCount}</td>
                        <td className="px-2 py-1 border-b">{row.avgRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feedbackChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="feedbackCount" fill="#be185d" name="Feedback Count" />
                <Bar yAxisId="right" dataKey="avgRating" fill="#8884d8" name="Avg Rating" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
} 