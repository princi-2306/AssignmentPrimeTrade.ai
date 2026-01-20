import { useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/MultiUse/Navbar.jsx";
import DetailedBar from "./Components/MultiUse/DetailedBar.jsx";
import Home from "./pages/Home.jsx";
import Store from "./pages/Store.jsx";
import FAQ from "./pages/FAQ.jsx";
import Login from "./pages/Login.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Services from "./pages/Services.jsx";
import ServicesID from "./pages/ServicesID.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Cart from "./pages/Cart.jsx";
import ProductsLaptops from "./pages/ProductsLaptops.jsx";
import ProductsDevices from "./pages/ProductsDevices.jsx";
import ProductsPrinterAndCCTV from "./pages/ProductsPrintersAndCCTV.jsx";
import ProductsParts from "./pages/ProductsParts.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ProductsLaptopsID from "./pages/ProductsLaptopsID.jsx";
import ProductsDevicesID from "./pages/ProductsDevicesID.jsx";
import ProductsPrintersAndCctvID from "./pages/ProductsPrintersAndCctvID.jsx";
import ProductsPartsID from "./pages/ProductsPartsID.jsx";
import { ShopContext } from "./context/ShopContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const location = useLocation();
  const { LaptopProducts, ComputerParts, ComputerAccessories, PrintersAndCCTVs, services } = useContext(ShopContext);
  const idArr = [];

  LaptopProducts.map((e) => {
    idArr.push(e._id);
  })
  const idDataLaptops = location.pathname.replace("/store/productsLaptops/", "");

  ComputerParts.map((e) => {
    idArr.push(e._id);
  })
  const idDataParts = location.pathname.replace("/store/productsParts/", "");

  ComputerAccessories.map((e) => {
    idArr.push(e._id);
  })
  const idDataDevices = location.pathname.replace("/store/productsDevices/", "");
  
  PrintersAndCCTVs.map((e) => {
    idArr.push(e._id);
  })
  const idDataPrinters = location.pathname.replace("/store/productsPrinterAndCCTV/", "");
  
  services.map((e) => {
    idArr.push(e._id);
  })
  const idDataServices = location.pathname.replace("/services/", "");

  // Paths where DetailedBar should not be displayed
  const hideDetailedBarPaths = [
    "/productsLaptops",
    "/productsDevices",
    "/productsPrinterAndCCTV",
    "/productsParts",
    `/store/productsLaptops/${idDataLaptops}`,
    `/store/productsDevices/${idDataDevices}`,
    `/store/productsPrinterAndCCTV/${idDataPrinters}`,
    `/store/productsParts/${idDataParts}`,
    `/services/${idDataServices}`,
    "/cart",
    "/orders",
    "/login",
    "/about-us",
    "/faq",
    "/privacy-policy",
    "/place-order",
    "/contact-us",
  ];

  const shouldHideDetailedBar = hideDetailedBarPaths.includes(location.pathname);

  // const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  //   useEffect(() => {
  //     localStorage.setItem('token', token);
  //   }, [token])

  return (
    <>
      <div className="w-full">
        <ToastContainer />
        <div className="w-full px-4 sm:px-[5vw] md:px-[6vw] lg:px-[8vw]">
          <div>
            <Navbar />
          </div>
          {!shouldHideDetailedBar && (
            <div className="md:block hidden">
              {/* <DetailedBar /> */}
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/services" element={<Services />} />
              <Route path="/services/:servicesID" element={<ServicesID />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
        <div className="w-full px-4 sm:px-[5vw] md:px-[6vw] lg:px-[8vw]">
          <Routes>
            <Route path="/store/productsLaptops" element={<ProductsLaptops />} />
              <Route path="/store/productsLaptops/:ProductsLaptopsID" element={<ProductsLaptopsID />}/>
            <Route path="/store/productsDevices" element={<ProductsDevices />} />
              <Route path="/store/productsDevices/:ProductsDevicesID" element={<ProductsDevicesID />}/>
            <Route path="/store/productsPrinterAndCCTV" element={<ProductsPrinterAndCCTV />} />
              <Route path="/store/productsPrinterAndCCTV/:ProductsPrintersAndCctvID" element={<ProductsPrintersAndCctvID />}/>
            <Route path="/store/productsParts" element={<ProductsParts />} />
              <Route path="/store/productsParts/:ProductsPartsID" element={<ProductsPartsID />}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

