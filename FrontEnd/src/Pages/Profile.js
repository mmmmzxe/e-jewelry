import React from 'react';
import { FaUserCircle, FaBoxOpen, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../store/slices/profileSlice';
import { fetchMyOrders } from '../store/slices/ordersSlice';
import JewelryLoader from '../Layout/JewelryLoader';

const Profile = () => {
  const dispatch = useDispatch();
  const { data: profile, loading, error } = useSelector(state => state.profile);
  const { data: orders, loading: ordersLoading, error: ordersError } = useSelector(state => state.orders);

  React.useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchProfile());
    dispatch(fetchMyOrders());
  };

  if (loading) return  <JewelryLoader/>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="pt-36 container mx-auto pb-10 ">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <FaUserCircle className="text-pink-900 text-5xl" />
        <div>
          <h2 className="text-2xl font-bold mb-1 text-pink-900">{profile.username}</h2>
          <div className="text-gray-600">{profile.email}</div>
          <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-900 font-semibold">{profile.role}</span>
        </div>
        <button
          onClick={handleRefresh}
          className="ml-auto px-4 py-2 bg-pink-700 text-white rounded hover:bg-pink-800 transition text-sm"
        >
          Refresh
        </button>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2 text-pink-900">
        <FaBoxOpen /> My Orders
      </h3>
      {ordersLoading ? (
         <JewelryLoader/>
      ) : ordersError ? (
        <div className="text-red-500">{ordersError}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendarAlt className="text-pink-700" />
                  <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <span className="font-semibold">${order.total}</span>
                </div>
                <div className="flex items-center gap-2">
                  {order.status === 'Completed' ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-yellow-600" />
                  )}
                  <span className={order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>{order.status}</span>
                </div>
              </div>
              <div className="mt-2">
                <strong className="text-gray-700">Products:</strong>
                <ul className="list-none mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {order.cartItems.map(item => (
                    <li key={item.productId} className="flex items-center gap-3 bg-white rounded p-2 border">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      )}
                      <div>
                        <div className="font-semibold text-pink-900">{item.name}</div>
                        <div className="text-sm text-gray-600">x{item.count} &middot; ${item.price}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile; 