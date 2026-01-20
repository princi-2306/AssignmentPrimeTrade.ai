import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../Components/MultiUse/Title';
import { Package, Truck, Clock, MapPin, ShoppingBag } from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-green-100 text-green-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium text-center ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const Orders = () => {
  const { currency, backendUrl, token, userId } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const loadData = async () => {
    try {
      if (!userId || !token) {
        throw new Error('Authentication required');
      }

      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/order/userOrder`,
        { userId },
        { 
          headers: { 
            Authorization: `Bearer ${token}`
          } 
        }
      );
      
      if (response.data) {
        setOrders(response.data.data.userOrder);
      } else {
        throw new Error('No data received from server');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch orders';
      console.error('Error details:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId, token, backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Title title1="MY" title2="ORDERS" />
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">No orders found</h2>
          <p className="mt-2 text-sm text-gray-500">Start shopping to see your orders here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                {/* Items Section */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-center mb-3">
                    <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm font-medium text-gray-900">Order Items</p>
                  </div>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item._id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {currency}{item.price}
                            </p>
                            <p className="text-xs text-gray-500">
                              Per Unit
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                          <p className="text-sm text-gray-500">
                            {order.address.firstName} {order.address.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{order.address.address}</p>
                          <p className="text-sm text-gray-500">{order.address.city}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Payment Method</p>
                          <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                          <p className="text-sm font-medium text-gray-900 mt-2">Total Amount</p>
                          <p className="text-sm text-gray-500">
                            {currency}{order.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-500">
                      Last updated: {formatDate(order.updatedAt)}
                    </p>
                  </div>
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;