import React, { useEffect, useState } from 'react';
import StandardTable from '../../components/common/StandardTable';
import { FaEye } from 'react-icons/fa';

const STATUS_OPTIONS = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export default function DashboardOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrder = () => { fetch('http://localhost:5000/api/orders')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updatedOrder = await res.json();
      setOrders(orders => orders.map(o => o._id === orderId ? { ...o, status: updatedOrder.status } : o));
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
      fetchOrder();
    }
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <StandardTable
        columns={[
          { label: 'Order ID', key: '_id' },
          { label: 'User ID', key: 'userId' },
          { label: 'Created At', key: 'createdAt', render: o => o.createdAt ? new Date(o.createdAt).toLocaleString() : '-' },
          { label: 'Status', key: 'status', render: order => (
            <select
              value={order.status || 'Pending'}
              onChange={e => handleStatusChange(order._id, e.target.value)}
              className="border rounded px-2 py-1"
              disabled={updatingId === order._id}
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) },
        ]}
        data={orders}
        actions={order => (
          <button
            onClick={() => openDetails(order)}
            className="p-2 rounded hover:text-blue-700 flex items-center justify-center"
            title="Show Details"
          >
            <FaEye size={16} />
          </button>
        )}
        renderCard={order => (
          <div key={order._id} className="bg-white rounded shadow border border-gray-200 p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">Order: {order._id}</span>
              <button
                onClick={() => openDetails(order)}
                className="p-2 rounded hover:text-blue-700 flex items-center justify-center"
                title="Show Details"
              >
                <FaEye size={16} />
              </button>
            </div>
            <div className="text-gray-700"><span className="font-semibold">User ID:</span> {order.userId || '-'}</div>
            <div className="text-gray-700"><span className="font-semibold">Created At:</span> {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</div>
            <div className="text-gray-700 flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <select
                value={order.status || 'Pending'}
                onChange={e => handleStatusChange(order._id, e.target.value)}
                className="border rounded px-2 py-1"
                disabled={updatingId === order._id}
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      />
      {/* Modal for order details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={closeModal} className="text-2xl text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Order ID:</span> {selectedOrder._id}
              </div>
              <div>
                <span className="font-semibold">User ID:</span> {selectedOrder.userId || '-'}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {selectedOrder.status || '-'}
              </div>
              <div>
                <span className="font-semibold">Created At:</span> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : '-'}
              </div>
              <div>
                <span className="font-semibold">Total:</span> {selectedOrder.total}
              </div>
              <div>
                <span className="font-semibold">Delivery Method:</span> {selectedOrder.deliveryMethod}
              </div>
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mt-4 mb-1">Customer Info</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <dt>Name:</dt><dd>{selectedOrder.formData?.name || '-'}</dd>
                  <dt>Email:</dt><dd>{selectedOrder.formData?.email || '-'}</dd>
                  <dt>Phone:</dt><dd>{selectedOrder.formData?.phone || '-'}</dd>
                  <dt>Address:</dt><dd>{selectedOrder.formData?.address || '-'}</dd>
                  <dt>City:</dt><dd>{selectedOrder.formData?.city || '-'}</dd>
                  <dt>State:</dt><dd>{selectedOrder.formData?.state || '-'}</dd>
                  <dt>Zip Code:</dt><dd>{selectedOrder.formData?.zipCode || '-'}</dd>
                </dl>
              </div>
              {/* Custom Location */}
              <div>
                <h3 className="font-semibold mt-4 mb-1">Custom Location</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <dt>Name:</dt><dd>{selectedOrder.customLocation?.name || '-'}</dd>
                  <dt>Address:</dt><dd>{selectedOrder.customLocation?.address || '-'}</dd>
                  <dt>City:</dt><dd>{selectedOrder.customLocation?.city || '-'}</dd>
                  <dt>Zip Code:</dt><dd>{selectedOrder.customLocation?.zipCode || '-'}</dd>
                  <dt>Hours:</dt><dd>{selectedOrder.customLocation?.hours || '-'}</dd>
                </dl>
              </div>
              {/* Shipping Details */}
              <div>
                <h3 className="font-semibold mt-4 mb-1">Shipping Details</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <dt>Address:</dt><dd>{selectedOrder.shippingDetails?.address || '-'}</dd>
                  <dt>City:</dt><dd>{selectedOrder.shippingDetails?.city || '-'}</dd>
                  <dt>State:</dt><dd>{selectedOrder.shippingDetails?.state || '-'}</dd>
                  <dt>Zip Code:</dt><dd>{selectedOrder.shippingDetails?.zipCode || '-'}</dd>
                </dl>
              </div>
              {/* Billing Info */}
              <div>
                <h3 className="font-semibold mt-4 mb-1">Billing Info</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <dt>Card Name:</dt><dd>{selectedOrder.billingInfo?.cardName || '-'}</dd>
                  <dt>Card Number:</dt><dd>{selectedOrder.billingInfo?.cardNumber || '-'}</dd>
                  <dt>Expiration Date:</dt><dd>{selectedOrder.billingInfo?.expirationDate || '-'}</dd>
                  <dt>CVV:</dt><dd>{selectedOrder.billingInfo?.cvv || '-'}</dd>
                  <dt>Zip Code:</dt><dd>{selectedOrder.billingInfo?.zipCode || '-'}</dd>
                  <dt>Address:</dt><dd>{selectedOrder.billingInfo?.address || '-'}</dd>
                </dl>
              </div>
              {/* Cart Items */}
              <div>
                <h3 className="font-semibold mt-4 mb-1">Cart Items</h3>
                {selectedOrder.cartItems && selectedOrder.cartItems.length > 0 ? (
                  <table className="min-w-full text-sm border">
        <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Product ID</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Count</th>
          </tr>
        </thead>
        <tbody>
                      {selectedOrder.cartItems.map((item, idx) => (
                        <tr key={item._id || idx}>
                          <td className="p-2 border">
                            {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />}
                          </td>
                          <td className="p-2 border">{item.name}</td>
                          <td className="p-2 border">{item.productId}</td>
                          <td className="p-2 border">{item.price}</td>
                          <td className="p-2 border">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
                ) : <div className="text-gray-400">No items</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 