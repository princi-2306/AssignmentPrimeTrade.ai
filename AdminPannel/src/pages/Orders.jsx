import { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';

const OrderStatusColors = {
  'Order Placed': 'bg-blue-500',
  'Processing': 'bg-yellow-500',
  'Shipped': 'bg-purple-500',
  'Delivered': 'bg-green-500',
  'Cancelled': 'bg-red-500'
};

const OrderStatusOptions = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled'
];

const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/order/allOrder`, { headers: { Authorization: `Bearer ${token}` }  });
      setOrders(response.data.data.allOrder);
      // Initialize selected status for each order
      const statusMap = {};
      response.data.data.allOrder.forEach(order => {
        statusMap[order._id] = order.status;
      });
      setSelectedStatus(statusMap);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdateLoading(orderId);
    try {
      await axios.patch(`${backendUrl}/order/updateStatus`, { orderId: orderId ,status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      setSelectedStatus(prev => ({ ...prev, [orderId]: newStatus }));

      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdateLoading('');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="border-t pt-10 px-4 md:px-8">
      <div className="text-2xl mb-6">
        <h1 className="font-bold">
          <span className="text-gray-400">ALL</span>
          <span className="text-black ml-2">ORDERS</span>
        </h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Order Info */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Order ID:</span>
                  <span className="text-gray-600">{order._id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Date:</span>
                  <span className="text-gray-600">{order.createdAt.slice(0,10)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Payment:</span>
                  <span className="text-gray-600">{order.paymentMethod}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex flex-col space-y-2">
                <div className="font-semibold text-gray-700">
                  {order.address.firstName} {order.address.lastName}
                </div>
                <div className="text-gray-600">{order.address.email}</div>
                <div className="text-gray-600">{order.address.phone}</div>
                <div className="text-gray-600">
                  {order.address.address}, {order.address.city}, {order.address.state}, {order.address.zipCode}
                </div>
              </div>

              {/* Status Update */}
              <div className="flex flex-col space-y-2">
                <div className="relative">
                  <select
                    value={selectedStatus[order._id]}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={updateLoading === order._id}
                  >
                    {OrderStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {updateLoading === order._id && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${OrderStatusColors[selectedStatus[order._id]]}`}></div>
                  <span className="text-sm font-medium text-gray-600">{selectedStatus[order._id]}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6 border-t pt-4">
              <div className="font-semibold text-gray-700 mb-3">Order Items:</div>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium text-gray-700">{item.name}</div>
                      <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                    </div>
                    <div className="text-gray-700">₹{item.price.toLocaleString()}</div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-semibold text-gray-700">Total Amount:</span>
                  <span className="font-semibold text-gray-700">₹{order.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;