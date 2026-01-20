import { useState, useContext } from 'react';
import Title from '../Components/MultiUse/Title';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../Components/MultiUse/CartTotal';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: 'Uttarakhand',
    zipCode: '',
    country: 'India',
    phone: '+91',
  });

  const { 
    navigate, 
    cartItem,
    LaptopProducts,
    ComputerParts,
    ComputerAccessories,
    PrintersAndCCTVs,
    services,
    getTotalAmount,
    userId, 
    token,
    backendUrl,
    setCartItem
  } = useContext(ShopContext);

  const cityOptions = [
    'Haldwani',
    'Pantnagar',
    'Nainital',
    'Bhimtal',
    'Kathgodam',
    'Rudrapur',
    'Ramnagar',
    'Bhowali',
    'Kaladungi'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('+91')) {
      value = '+91' + value.replace(/^\+91/, '');
    }
    value = value.replace(/[^\d+]/g, '');
    if (value.length <= 13) {
      setFormData(prev => ({
        ...prev,
        phone: value
      }));
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, address, city, zipCode, phone } = formData;
    if (!firstName || !lastName || !email || !address || !city || !zipCode || phone.length !== 13) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };


  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id, // Make sure this is included
      name: "Order Payment",
      description: "Payment for your order",
      prefill: {
        email: formData.email,
        contact: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`
      },
      handler: async (response) => {
        try {
          // Make sure all these fields are present in the response
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          console.log("Verification Data:", verificationData);
          
  
          const res = await axios.post(
            `${backendUrl}/order/verifyRazorpay`,
            verificationData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("Razorpay Response:", res);
          console.log("history",res);
          
  
          // if (data.success) {
          //   navigate("/orders");
          //   setCartItem({});
          //   toast.success('Payment successful!');
          // }
        } catch (error) {
          console.error("Verification Error:", error);
          toast.error("Payment verification failed");
        }
      },
      modal: {
        ondismiss: function() {
          toast.error("Payment cancelled");
        }
      }
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
      const orderItems = Object.entries(cartItem)
        .filter(([_, quantity]) => quantity > 0)
        .map(([id, quantity]) => {
          const item = 
            LaptopProducts.find(e => e._id === id) ||
            ComputerParts.find(e => e._id === id) ||
            ComputerAccessories.find(e => e._id === id) ||
            PrintersAndCCTVs.find(e => e._id === id) ||
            services.find(e => e._id === id);

          if (!item) return null;

          return {
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: quantity,
          };
        })
        .filter(Boolean);

      if (orderItems.length === 0) {
        toast.error('Your cart is empty');
        return;
      }

      let orderData = {
        userId: userId,
        address: formData,
        items: orderItems,
        amount: getTotalAmount(),
        paymentMethod: paymentMethod,
      }

      switch (paymentMethod) {
        case "cod":
          {
            const response = await axios.post(
              `${backendUrl}/order/placeOrder`, 
              orderData, 
              {
                headers: { Authorization: `Bearer ${token}` } 
              });
              
            if (response.data.success) {
              setCartItem({});
              toast.success('Order placed successfully');
              navigate("/orders");
            } else {
              toast.error('Failed to place order');
            }
          }
          break;
        case "razorpay":
          {
            const response = await axios.post(
              `${backendUrl}/order/placeOrderRazorpay`, 
              orderData, 
              {
                headers: { Authorization: `Bearer ${token}` } 
              });
              
            if (response.data.success) {
              initPay(response.data.data.order);
            } else {
              toast.error('Failed to place order');
            }
          }
          break;
            
        default:
          toast.error('Invalid payment method');
          break;
      }

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Delivery Information */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <Title title1="DELIVERY" title2="INFORMATION" />
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                required
              />
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
                required
              />
            </div>
            
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
              required
            />
            
            <input 
              type="text" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
              required
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                required
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
              >
                <option value="">Select City</option>
                {cityOptions.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                required
                name="state"
                value={formData.state}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
              >
                <option value="Uttarakhand">Uttarakhand</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                required
                type="text" 
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="ZIP Code"
                pattern="[0-9]{6}"
                maxLength="6"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
              />
              <select
                required
                name="country"
                value={formData.country}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
              >
                <option value="India">India</option>
              </select>
            </div>
            
            <input 
              required
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Right Side - Payment Information */}
        <div className="w-full lg:w-96 space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CartTotal />
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <Title title1="PAYMENT" title2="METHOD" />
            </div>

            <div className="space-y-3">
              

              {/* Razorpay */}
              {/* <div 
                onClick={() => setPaymentMethod("razorpay")}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-gray-400 ${
                  paymentMethod === "razorpay" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mr-4 transition-colors ${
                  paymentMethod === "razorpay" ? "border-green-500 bg-green-500" : "border-gray-400"
                }`} />
                <img src={assets.razorpay} alt="Razorpay" className="h-6" />
              </div> */}

              {/* Cash on Delivery */}
              <div 
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-gray-400 ${
                  paymentMethod === "cod" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mr-4 transition-colors ${
                  paymentMethod === "cod" ? "border-green-500 bg-green-500" : "border-gray-400"
                }`} />
                <span className="font-medium">Cash on Delivery</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-black hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;