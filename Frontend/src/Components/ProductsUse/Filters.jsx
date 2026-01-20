import { useState } from 'react';
import { Filter, X, RefreshCw } from 'lucide-react';

const Filters = ({sendFilteredObject}) => {
  const [selectedCategory, setSelectedCategory] = useState('laptops');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [condition, setCondition] = useState({
    firstHand: false,
    secondHand: false,
  });
  const [selectedUsageType, setSelectedUsageType] = useState(''); // New state for usage type

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleUsageTypeChange = (event) => {
    setSelectedUsageType(event.target.value); // New handler for usage type
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  const handleLaptopConditionChange = (condition) => {
    setCondition((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
  };

  const applyFilters = () => {
    const adjustedLaptopCondition = {
      firstHand: condition.firstHand || (!condition.firstHand && !condition.secondHand),
      secondHand: condition.secondHand || (!condition.firstHand && !condition.secondHand),
    };
  
    const filteredObject = {
      selectedCategory,
      selectedBrand,
      priceRange,
      isAvailable,
      condition: adjustedLaptopCondition, // Adjusted laptop condition
      selectedUsageType, // Add usage type to filtered object
    };

    console.log(filteredObject);
    
  
    sendFilteredObject(filteredObject);
    setIsFilterVisible(false);
  };
  

  const resetFilters = () => {
    setSelectedCategory('laptops');
    setSelectedBrand('');
    setPriceRange('');
    setIsAvailable(false);
    setSelectedUsageType(''); // Reset usage type
    setCondition({
      firstHand: false,
      secondHand: false,
    });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="relative md:-translate-x-10 md:w-[20rem] md:h-[38rem] md:shadow-md bg-gray-50">
      {/* Filter Toggle Button - Always Visible */}
      <button
        onClick={toggleFilterVisibility}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isFilterVisible ? <X size={24} /> : <Filter size={24} />}
      </button>

      {/* Filters Container - Responsive */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 ${
          isFilterVisible ? 'block' : 'hidden'
        } md:static md:block md:bg-transparent`}
        onClick={toggleFilterVisibility}
      >
        <div
          className={`w-80 max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:transform-none bg-white md:bg-transparent rounded-lg shadow-lg md:shadow-none p-4`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button for Mobile */}
          <button
            onClick={toggleFilterVisibility}
            className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>

          <div className="flex justify-between items-center mb-4 mr-8 md:mr-0">
            <h2 className="text-xl text-gray-700 font-bold">FILTERS</h2>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <RefreshCw size={16} /> Reset
            </button>
          </div>

          {/* Laptop Usage Type Filter - New Section */}
          <div className="my-4 mx-2 border px-4 py-3 shadow-md bg-slate-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Laptop Usage Type
            </label>
            <select
              value={selectedUsageType}
              onChange={handleUsageTypeChange}
              className="w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
            >
              <option value="">All Usage Types</option>
              <option value="gaming">Gaming</option>
              <option value="office">Office</option>
              <option value="studies">Studies</option>
              <option value="coding">Coding</option>
              <option value="budget">Budget</option>
            </select>
          </div>

          {/* Rest of the existing code remains the same */}
          {/* Laptop Brands Filter */}
          <div className="my-4 mx-2 border px-4 py-3 shadow-md bg-slate-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Laptop Brands
            </label>
            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              className="w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
            >
              <option value="">All Laptop Brands</option>
              <option value="dell">Dell</option>
              <option value="hp">HP</option>
              <option value="lenovo">Lenovo</option>
              <option value="apple">Apple</option>
              <option value="asus">Asus</option>
              <option value="microsoft">Microsoft</option>
              <option value="samsung">Samsung</option>
              <option value="acer">Acer</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="my-4 mx-2 border px-4 py-3 shadow-md bg-slate-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={handlePriceRangeChange}
              className="w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
            >
              <option value="">All Prices</option>
              <option value="150-300">$150 - $300</option>
              <option value="300-500">$300 - $500</option>
              <option value="500-700">$500 - $700</option>
              <option value="700-1000">$700 - $1000</option>
              <option value="1000-99999999">$1000 and above</option>
            </select>
          </div>

          {/* Laptop Condition Filter */}
          <div className="my-4 mx-2 border px-4 py-3 shadow-md bg-slate-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Laptop Condition
            </label>
            <div className="space-y-2 flex-col flex gap-y-1">
              <div className="inline-flex items-center pt-2">
                <input
                  type="checkbox"
                  checked={condition.firstHand}
                  onChange={() => handleLaptopConditionChange('firstHand')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">First-Hand</span>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={condition.secondHand}
                  onChange={() => handleLaptopConditionChange('secondHand')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Second-Hand</span>
              </div>
            </div>
          </div>

          {/* Availability Filter */}
          <div className="my-4 mx-2 border px-3 py-2 shadow-md bg-slate-50 rounded-md">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={toggleAvailability}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700 py-1">In Stock Only</span>
            </label>
          </div>

          {/* Apply Filters Button */}
          <button
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;