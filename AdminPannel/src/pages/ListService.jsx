import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import Title from '../Components/MultiUse/Title';
import { RemoveConfirmModal } from '../Components/MultiUse/Modals/ConfirmModal';
import { Loader2 } from 'lucide-react';

const ITEM_TYPES = ['Service'];

const ENDPOINTS = {
    Service: 'service/listService',
};
const REMOVE_ENDPOINTS = {
    Service: 'service/removeService',
};


const ListService = ({ token }) => {
  const [itemType, setItemType] = useState("Service");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchList = useCallback(async () => {
    if (!itemType || !ENDPOINTS[itemType]) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/${ENDPOINTS[itemType]}`);
      
      if (response.data.success) {
        setList(response.data.data);
      } else {
        setList([]);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching Services:', error);
      setList([]);
      toast.error(error.response?.data?.message || 'Error fetching Services');
    } finally {
      setLoading(false);
    }
    
  }, [itemType]);

  const removeServices = async (_id) => {
    if (!_id || !REMOVE_ENDPOINTS[itemType]) return;
    
    try {
      const response = await axios.delete(`${backendUrl}/${REMOVE_ENDPOINTS[itemType]}`, {
        data: { _id },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        await fetchList();
        toast.success(`${itemType} Service removed successfully`);
        setRemoveModalOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing Service:', error);
      toast.error(error.response?.data?.message || 'Error removing Service');
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Title title1="LIST Service" title2="ITEMS" />
            <p className="text-gray-600 text-lg">Select Type of Item</p>
          </div>

          {/* Type Selection */}
          <div className="flex flex-wrap justify-center gap-3">
            {ITEM_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setItemType(type)}
                className={`
                  px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                  ${itemType === type 
                    ? 'bg-green-500 text-white shadow-lg scale-105' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Service ListService */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-6 bg-gray-100 p-4 text-sm font-semibold text-gray-700">
              <div>S. No.</div>
              <div>Image</div>
              <div>Name</div>
              <div>Brand</div>
              <div>Price</div>
              <div className="text-center">Action</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-green-500" />
              </div>
            )}

            {/* Empty State */}
            {!loading && list.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No Services found
              </div>
            )}

            {/* Service Items */}
            {!loading && list.map((item, index) => (
              <div 
                key={item._id} 
                className={`
                  grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  hover:bg-gray-100 transition-colors duration-150
                `}
              >
                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                  <img 
                    className="w-full h-48 object-cover rounded-lg" 
                    src={item.image[0]} 
                    alt={item.name}
                  />
                  <div className="space-y-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.brand}</p>
                    <p className="text-lg font-semibold text-green-600">
                      {currency}{item.price}
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedProduct(item);
                        setRemoveModalOpen(true);
                      }}
                      className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">{index + 1}</div>
                <div className="hidden md:block">
                  <img 
                    className="w-28 h-20 object-cover rounded-lg" 
                    src={item.image[0]} 
                    alt={item.name}
                  />
                </div>
                <div className="hidden md:block font-medium">{item.name}</div>
                <div className="hidden md:block text-gray-600">{item.brand}</div>
                <div className="hidden md:block text-green-600 font-medium">
                  {currency}{item.price}
                </div>
                <div className="hidden md:flex justify-center">
                  <button 
                    onClick={() => {
                      setSelectedProduct(item);
                      setRemoveModalOpen(true);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RemoveConfirmModal 
        open={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onConfirm={() => removeServices(selectedProduct?._id)}
        product={selectedProduct}
      />
    </div>
  );
};

export default ListService;