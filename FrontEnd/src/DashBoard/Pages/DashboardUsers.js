import React, { useEffect, useState } from 'react';
import StandardTable from '../../components/common/StandardTable';

export default function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <StandardTable
        columns={[
          { label: 'Username', key: 'username' },
          { label: 'Email', key: 'email' },
          { label: 'Role', key: 'role' },
        ]}
        data={users}
        renderCard={user => (
          <div key={user._id} className="bg-white rounded shadow border border-gray-200 p-4 flex flex-col gap-2">
            <div className="font-bold text-lg mb-1">{user.username}</div>
            <div className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</div>
            <div className="text-gray-700"><span className="font-semibold">Role:</span> {user.role}</div>
          </div>
        )}
      />
    </div>
  );
} 