import { motion } from "framer-motion";
import FilterParts from "../Components/ProductsUse/FIlterParts";
import Title from "../Components/MultiUse/Title";
import ProductItemParts from "../Components/MultiUse/ProductItemParts";
import Footer from "../Components/MultiUse/Footer";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProductsParts = () => {
  const { ComputerParts } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortOption, setSortOption] = useState("suggested");
  // const [recivedFilteredObject, setRecivedFilteredObject] = useState();

  const handleFilteredObject = (filteredObject) => {
    let filteredProducts = [...ComputerParts];
  
    // Apply filters dynamically from filteredObject
    if (filteredObject.selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === filteredObject.selectedBrand
      );
    }
  
    if (filteredObject.condition) {
      const { firstHand, secondHand } = filteredObject.condition;
      filteredProducts = filteredProducts.filter(
        (product) =>
          (firstHand && product.firstHand) ||
          (secondHand && product.secondHand)
      );
    }
    
  
    if (filteredObject.priceRange) {
      const stringRange = filteredObject.priceRange;
      const firstVal = stringRange.split("-")[0];
      const secondVal = stringRange.split("-")[1];
      filteredProducts = filteredProducts.filter(
        (product) =>
          parseFloat(product.price) >= firstVal && parseFloat(product.price) <= secondVal
      );
    }
  
    if (filteredObject.type && filteredObject.type.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filteredObject.type.some((type) => product.type.includes(type))
      );
    }
  
    if (filteredObject.isAvailable) {
      filteredProducts = filteredProducts.filter(
        (product) => product.isAvailable === filteredObject.isAvailable
      );
    }
  
    // New filter for laptopType
    if (filteredObject.selectedUsageType) {
      filteredProducts = filteredProducts.filter((product) =>
        // console.log("the type is : "+product.type.includes(filteredObject.selectedUsageType))
        product.type.includes(filteredObject.selectedUsageType)
      );
    }
    setFilterProducts(filteredProducts);
  };

  // Effect to initially set products and handle sorting
  useEffect(() => {
    let sortedProducts = [...ComputerParts];

    switch (sortOption) {
      case "low-to-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "suggested":
      default:
        // Keep original order or implement a suggested sorting logic if needed
        break;
    }

    setFilterProducts(sortedProducts);
  }, [ComputerParts, sortOption]);


  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <div className="mt-4 flex flex-col md:flex-row my-8">
        {/* Filters Section */}
        <FilterParts sendFilteredObject={handleFilteredObject} />
        {/* Title and Sort By Section */}
        <div>
          <div className="text-3xl w-full h-10 flex flex-col md:flex-row md:justify-between my-2 mb-4 md:mt-0">
            <Title title1="Available" title2="Laptops" />
            <div className="py-1 px-2 rounded-md flex justify-end items-center space-x-2 mt-2 md:mt-0 md:justify-normal">
              <p className="text-base md:text-base">Sort by:</p>
              <select 
                value={sortOption}
                onChange={handleSortChange}
                className="text-base w-[6.5rem] rounded bg-slate-100 focus:ring-2 focus:ring-slate-100 focus:outline-none md:w-28 lg:w-32"
              >
                <option className="text-sm px-2 text-center" value="suggested">Suggested</option>
                <option className="text-sm px-2 text-center" value="low-to-high">Low to High</option>
                <option className="text-sm px-2 text-center" value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 gap-y-6 mt-16 md:mt-0">
            {filterProducts.map((e, i) => (
              <ProductItemParts
                key={i}
                id={e._id}
                name={e.name}
                price={e.price}
                image={e.image}
              />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={animationVariants}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default ProductsParts;
