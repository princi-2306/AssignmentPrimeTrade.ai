import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./context/ShopContext.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/MultiUse/Navbar.jsx";
import Sidebar from "./Components/MultiUse/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import AddService from "./pages/AddService.jsx";
import ListService from "./pages/ListService.jsx";
// import AdminProfile from "./pages/AdminProfile.jsx";
// import PlaceOrder from "./pages/PlaceOrder.jsx";
// import ContactUs from "./pages/ContactUs.jsx";
// import Cart from "./pages/Cart.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  return (
    <>
      <div className="w-full">
        <ToastContainer />
        {token == "" ? (
          <div>
            <Routes>
              <Route path="/" element={<Login tokenHandle={setToken} />} />
            </Routes>
          </div>
        ) : (
          <div className="w-full px-4 sm:px-[1vw] md:px-[2vw] lg:px-[3vw]">
            <div>
              <Navbar tokenHandle={setToken} />
            </div>
            <div className="flex">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home token={token} />} />
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/addService" element={<AddService token={token} />} />
                <Route path="/listService" element={<ListService token={token} />} />
                <Route path="/orders" element={<Orders token={token}/>} />
                {/* <Route path="/contact-us" element={<ContactUs />} /> */}
                {/* <Route path="/cart" element={<Cart />} /> */}
                {/* <Route path="/admin-profile" element={<AdminProfile />} /> */}
              </Routes>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

