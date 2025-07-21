import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StandardTable from '../../../components/common/StandardTable';
import { fetchUsers } from '../../../store/slices/usersSlice';
import JewelryLoader from '../../../Layout/JewelryLoader';

export default function DashboardUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return  <JewelryLoader/>;
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