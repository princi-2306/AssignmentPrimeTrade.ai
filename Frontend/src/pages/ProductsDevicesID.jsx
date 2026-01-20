import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Footer from "../Components/MultiUse/Footer";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { Circle } from "rc-progress";
import RatingLineBar from "../Components/MultiUse/RatingLineBar";
import { DialogSizes } from "../Components/MultiUse/Modals/InputModal";
import { DialogSizesConfirm } from "../Components/MultiUse/Modals/ConfirmModal";
import Title from "../Components/MultiUse/Title";
import ProductItemDevices from "../Components/MultiUse/ProductItemDevices";


const ProductsDevicesID = () => {
  const { ProductsDevicesID } = useParams();
  const { ComputerAccessories, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState("");
  const [defaultImage, setDefaultImage] = useState("");
  const [openModal, setOpenModal] = useState("");
  const [openConfirmingModal, setOpenConfirmingModal] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([])
  // rating data
  const [performanceRating, setPerformanceRating] = useState();
  const [durationRating, setDurationRating] = useState();
  const [designRating, setDesignRating] = useState();
  const [valueRating, setValueRating] = useState();
  const roundedValue = (performanceRating + durationRating + designRating + valueRating) / 4;

  const [specifications, setSpecifications] = useState({});

  useEffect(() => {
    const fetchProductData = async () => {
      const selectedProduct = ComputerAccessories.find((e) => e._id === ProductsDevicesID);
      
      const filterSpecifications = (selectedProduct) => {
        // Initialize an empty object to store valid specifications
        const validSpecifications = {};
      
        // Define mapping of product properties to specification keys
        const specificationMapping = {
          switchType: "switchtype",
          layout: "Layout",
          backlight: "Backlight",
          pollingRate: "PollingRate",
          weight: "Weight",
          buttons: "Buttons",
          connectivity: "Connectivity",
          sensor: "sensor",
          battery: "battery",
          driverSize: "driverSize",
          noiseCancellation: "noiseCancellation",
          resolution: "resolution",
          refreshRate: "refreshRate",
          panelType: "panelType",
          power: "power",
          frequencyRange: "frequencyRange",
          dataTransfer: "dataTransfer"
        };
      
        // Iterate through the mapping and add only valid values to specifications
        Object.entries(specificationMapping).forEach(([productKey, specKey]) => {
          const value = selectedProduct[productKey];
          
          // Check if the value is valid (not undefined, null, empty string, or NaN)
          if (value !== undefined && value !== "undefined" && value !== null && value !== '' && !(typeof value === 'number' && isNaN(value))) {
            validSpecifications[specKey] = value;
          }
        });
      
        return validSpecifications;
      };
      
      // Usage example:
      const handleSpecifications = (selectedProduct) => {
        const filteredSpecs = filterSpecifications(selectedProduct);
        setSpecifications(filteredSpecs);
        console.log(filteredSpecs);
        
      };
      handleSpecifications(selectedProduct);

      // Fetch reviews for the selected product
      if (selectedProduct) {
        setProductData(selectedProduct);
        setDefaultImage(selectedProduct.image[0]);
    
        // Find related products with the same type
        const related = ComputerAccessories.filter((product) => 
          // Exclude the current product and match at least one type
          product._id !== ProductsDevicesID && product.type.some((type) => selectedProduct.type.includes(type))
        );

        const shuffledRelated = related.sort(() => Math.random() - 0.5).slice(0, 10);
        setRelatedProducts(shuffledRelated);
      }
    };

    setPerformanceRating(4.5);
    setDurationRating(4.2);
    setDesignRating(4.0);
    setValueRating(4.6);
    fetchProductData();
  }, [ComputerAccessories, ProductsDevicesID]);

  const handleModalOpen = (value) => {
    setOpenModal(value);
  };
  const handleConfirmingModalOpen = (value) => {
    setOpenConfirmingModal(value);
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleReviewData = (value) => {
    setReviewData(value);
  };

  // const calculateTimeAgo = (reviewDate) => {
  //   const currentDate = new Date();
  //   const pastDate = new Date(reviewDate);

  //   let years = currentDate.getFullYear() - pastDate.getFullYear();
  //   let months = currentDate.getMonth() - pastDate.getMonth();
  //   let days = currentDate.getDate() - pastDate.getDate();

  //   // Adjust for negative days (borrow from the previous month)
  //   if (days < 0) {
  //     const previousMonth = new Date(
  //       currentDate.getFullYear(),
  //       currentDate.getMonth(),
  //       0
  //     ).getDate(); // Days in the previous month
  //     days += previousMonth;
  //     months -= 1;
  //   }
  //   // Adjust for negative months (borrow from the previous year)
  //   if (months < 0) {
  //     months += 12;
  //     years -= 1;
  //   }
  //   return { years, months, days };
  // };

  // const formatTimeAgo = (timeAgo) => {
  //   const { years, months, days } = timeAgo;

  //   let result = "";
  //   if (years > 0) result += `${years} year${years > 1 ? "s" : ""} `;
  //   if (months > 0) result += `${months} month${months > 1 ? "s" : ""} `;
  //   if (days > 0) result += `${days} day${days > 1 ? "s" : ""} `;

  //   return result.trim() || "Today";
  // };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-none justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((e, i) => (
              <img
                onClick={() => {
                  setDefaultImage(e);
                }}
                src={e}
                key={i}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="Default"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={defaultImage} alt="" />
            <div className="w-full gap-3 mt-6 flex">
              <button onClick={() => handleConfirmingModalOpen("md")} className="w-1/2 py-3 ml-4 rounded-sm text-center bg-black text-white hover:bg-green-700">
                ADD TO CART
              </button>
              <button className="w-1/2 py-3 mr-4 rounded-sm text-center bg-black text-white hover:bg-green-700">
                BUY NOW
              </button>
            </div>
            
            <div className="">
              <DialogSizesConfirm size={openConfirmingModal} handleOpen={handleConfirmingModalOpen} buttonText={"Confirm"} />
            </div>
            
            <div>
              <p className="w-full h-[1.5px] my-6 bg-gray-300"></p>
              <div className="text-gray-700 ml-2">
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    SuperFast delivery under listed areas like Haldwani,
                    Pantnagar, etc.
                  </p>
                </div>
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    Cash on delivery is available on this product.
                  </p>
                </div>
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    Discount on Servies like repairs and updates.
                  </p>
                </div>
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    Easy return and Exchange Policy within 7 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 text-gray-800">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.StarsFilled} alt="" className="w-3" />
            <img src={assets.StarsFilled} alt="" className="w-3" />
            <img src={assets.StarsFilled} alt="" className="w-3" />
            <img src={assets.StarsFilled} alt="" className="w-3" />
            <img src={assets.StarsEmpty} alt="" className="w-3" />
            <p className="pl-1">(122)</p>
          </div>
          <p className="mt-3 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-3 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Specifications Section */}
          <div className="flex flex-col gap-4 my-6">
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 font-medium">
                    Specification
                  </th>
                  <th className="border border-gray-300 px-4 py-2 font-medium">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(specifications).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td className="border border-gray-300 px-4 py-2 capitalize">
                        {key}
                      </td>
                      <td className="border border-gray-300 px-4 text-gray-700 py-2">
                        {value}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="">
        <p className="w-full h-[2px] my-6 bg-gray-300"></p>

        {/* Rating and Review Section */}
        <div className="w-full flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mx-2 px-4 lg:border-r-2 border-gray-300 h-auto">
            <p className="font-medium text-2xl mt-2 text-gray-800">RATINGS</p>
            <div className="flex justify-center flex-col sm:flex-row">
              <div className="relative my-10 sm:my-20 flex justify-center sm:justify-start">
                <div className="absolute top-[3rem] sm:top-[7.2rem] left-[8.2rem] sm:left-[4.2rem]">
                  <div className="flex items-center gap-2">
                    <p className="text-4xl font-bold text-gray-800">{roundedValue.toFixed(1)}</p>
                    <img
                      className="w-6 h-6"
                      src={assets.StarsFilled}
                      alt="Rating Star"
                    />
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg mt-1 text-center">
                    Overall
                  </p>
                </div>
                <Circle
                  className="w-40 sm:w-52 rotate-45"
                  percent={roundedValue.toFixed(1) * 2 * 10}
                  strokeWidth={4}
                  strokeColor="#65a765"
                />
              </div>
              <div className="flex flex-col sm:ml-8 mt-8 sm:mt-0">
                <div className="my-4">
                  <RatingLineBar
                    name="Performance"
                    rating={performanceRating}
                    percentage={performanceRating * 2 * 10}
                  />
                </div>
                <div className="my-4">
                  <RatingLineBar
                    name="Durability"
                    rating={durationRating}
                    percentage={durationRating * 2 * 10}
                  />
                </div>
                <div className="my-4">
                  <RatingLineBar
                    name="Design"
                    rating={designRating}
                    percentage={designRating * 2 * 10}
                  />
                </div>
                <div className="my-4">
                  <RatingLineBar
                    name="Value for Money"
                    rating={valueRating}
                    percentage={valueRating * 2 * 10}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:w-[44vw] mx-6 sm:h-[70vh] overflow-y-auto overflow-x-hidden my-6 sm:my-0 ${reviewData.length > 0 ? "h-[70vh]" : "h-auto"}`}>
            <p className="font-medium text-2xl mt-2 text-gray-800">REVIEWS</p>
            {/* Placeholder for Reviews Section */}
            <div className="mt-4 mb-2 -mx-1">
              <button
                onClick={() => handleModalOpen("md")}
                className="border px-4 py-2 rounded bg-green-500 text-white"
              >
                Add Review
              </button>
            </div>
            {/* Modal */}
            <DialogSizes size={openModal} handleOpen={handleModalOpen} handleReviewData={handleReviewData} />

            <div className="text-gray-600 mt-4">
              {reviewData.length > 0 ? (
                <div>
                  {reviewData.map((e, i) => (
                    <div key={i} className="border px-4 py-2 shadow-md rounded-md my-2">
                      <div className="flex">
                        <div>
                          <img className="w-10 h-10" src={assets.UserProfile} alt="" />
                        </div>
                        <div className="mx-2 my-1 font-semibold">
                          <p className="-my-1">UserID</p>
                          {/* <p>{formatTimeAgo(calculateTimeAgo(e.date))}</p> Replace `e.date` with the actual review date */}
                        </div>
                      </div>
                      <div>
                        <div className="relative w-24 h-24">
                          <img
                            className="w-full h-full object-cover rounded"
                            src={e.images}
                            alt="Review Image"
                          />
                        </div>
                        <p>{e.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>
                  No reviews available yet. Be the first to review this product!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="my-6 w-full border-t-4 border-gray-300">
          <div className="mt-6">

            <p className="text-3xl text-center">
              <Title title1="Similar" title2="Products" />
            </p>

            <div>
              {relatedProducts.length > 0 ? (
                  <div  className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 my-2'>
                    {
                      relatedProducts.map((e, i) => (
                        <ProductItemDevices
                          key={i}
                          id={e._id}
                          image={e.image}
                          name={e.name}
                          price={e.price}
                        />
                      ))
                    }
                  </div>
              ) : (
                <p className="text-gray-600 mt-2 text-center">
                  No Similar Products yet! ------
                </p>
              )}

            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={animationVariants}
      >
        <Footer />
      </motion.div>
    </div>
  ) : (
    <div className=""></div>
  );
};

export default ProductsDevicesID;