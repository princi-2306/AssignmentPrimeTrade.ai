import { useState, useRef, useContext } from "react";
import { assets } from "../../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = ({tokenHandle}) => {
  const [dropdownAppear, setDropdownAppear] = useState(false);
  const [sideBarAppear, setSideBarAppear] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { getCartCount } = useContext(ShopContext);
  const dropdownRef = useRef(null);

  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setDropdownAppear(false);
    }
  };
  const navigate = useNavigate();
  const logout = () => {
    navigate("/")
    tokenHandle("")
  }
  
  return (
    <div>
      <div
        ref={dropdownRef}
        className="py-5 -mx-6 px-6 flex items-center justify-between font-medium border-b-2 border-gray-200"
      >
        <NavLink to="/" className="cursor-pointer">
          <img className="md:w-32 w-28" src="/MainLogo.svg" alt="" />
        </NavLink>

        <div className="flex items-center justify-between md:gap-8 gap-5 flex-wrap transition-all delay-500">

          {/* User Profile Dropdown */}
          <div className="relative">
              <div onClick={()=>{logout()}} className="h-10 px-4 py-2 bg-green-500 rounded-md flex text-white hover:bg-green-600 hover:cursor-pointer delay-50 transition-all">
                <img
                  onClick={() => setDropdownAppear(!dropdownAppear)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className="md:w-8 w-6 cursor-pointer transition-all duration-500"
                  src={assets.UserProfile}
                  alt="Profile"
                />
                <div>
                  <p>Logout</p>
                </div>
              </div>
          </div>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative">
            <img
              src={assets.Cart}
              className="md:w-8 w-6 cursor-pointer transition-all duration-500 hover:scale-105"
              alt="Cart"
            />
            <p className="absolute right-[-8px] bottom-[-8px] w-5 h-5 pt-[2px] text-center bg-black text-white rounded-full text-[10px] md:text-xs">
              {getCartCount()}
            </p>
          </Link>

          {/* Hamburger Menu */}
          <img
            onClick={() => setSideBarAppear(true)}
            src={assets.MenuIcon}
            className="cursor-pointer w-6 md:hidden"
            alt="Menu"
          />
        </div>

        {/* Sidebar for small screen */}
        <div className={`absolute top-0 bg-blue-gray-50 z-20 right-0 bottom-0 overflow-hidden bg-slate-100 transition-all ${sideBarAppear ? "w-[85%]" : "w-0"}`}>
          <div className="flex text-gray-600">
            <div onClick={() => setSideBarAppear(false)} className="flex px-1 py-2 gap-1 items-center cursor-pointer">
              <p className="text-lg pl-2">Back</p>
              <img className="h-7 -rotate-90" src={assets.DropdownIcon} alt="" />
            </div>
          </div>
          <div className="flex flex-col text-gray-700">
            {isLogin ? (
            <NavLink to="/user-profile" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md border">
              <img className="pr-2" src={assets.UserProfile} alt="" />
              <p className="pxl-2">Profile</p>
            </NavLink>
            ) : (
              <NavLink to="/login" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md border">
              <img className="pr-2" src={assets.UserProfile} alt="" />
              <p className="pxl-2">Profile</p>
            </NavLink>
            )}
            <NavLink to="/" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md">
              <img className="pr-2" src={assets.HomeLogo} alt="" />
              <p className="pxl-2">Home</p>
            </NavLink>
            <NavLink to="/store" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md">
              <img className="pr-2" src={assets.StoreLogo} alt="" />
              <p className="pxl-2">Store</p>
            </NavLink>
            <NavLink to="/services" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md">
              <img className="pr-2" src={assets.ServicesLogo} alt="" />
              <p className="pxl-2">Services</p>
            </NavLink>
            <NavLink to="/cart" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md">
              <img className="pr-2" src={assets.Cart} alt="" />
              <p className="pxl-2">Cart</p>
            </NavLink>
            <NavLink to="/about-us" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md">
              <img className="pr-2" src={assets.AboutLogo} alt="" />
              <p className="pxl-2">About-us</p>
            </NavLink>
            <NavLink to="/contact-us" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md">
              <img className="pr-2" src={assets.ContactLogo} alt="" />
              <p className="pxl-2">Contact-us</p>
            </NavLink>
            <NavLink to="/privacy-policy" onClick={() => setSideBarAppear(false)} className="flex pl-3 py-3 text-lg rounded shadow-md">
              <img className="pr-2" src={assets.PrivacyLogo} alt="" />
              <p className="pxl-2">Privacy-policy</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;