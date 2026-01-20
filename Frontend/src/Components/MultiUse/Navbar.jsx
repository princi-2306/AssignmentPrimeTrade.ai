import { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = ({ tokenHandler }) => {
  const [dropdownAppear, setDropdownAppear] = useState(false);
  const [sideBarAppear, setSideBarAppear] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const { LaptopProducts, ComputerParts, ComputerAccessories, PrintersAndCCTVs, services, getCartCount, token, navigate, setToken, backendUrl } = useContext(ShopContext);
  const dropdownRef = useRef(null);
  const [addAvatar, setAddAvatar] = useState(null);
  const products = [...LaptopProducts, ...ComputerParts, ...ComputerAccessories, ...PrintersAndCCTVs, ...services];
  const inputRef = useRef(null); // For focusing/blurring the search input

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAppear(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setDropdownAppear(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleProductClick = () => {
    setSearchQuery("");          // Reset search query
    setSearchResults([]);        // Clear results
    setDropdownAppear(false);    // Close dropdown
    inputRef.current.blur();     // Blur the input
  };



  // getting current user avatar
  const getCurrentUser = async () => {

    try {
      const response = await axios.get(`${backendUrl}/users/current-user`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setAddAvatar(response.data.data.avatar);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };


  const logout = () => {
    // You might want to clear the token and navigate to a login page or update state
    localStorage.removeItem('token');
    setToken("");
    getCartCount({});
    setIsLogin(false);
    navigate("/");
    toast.success("Logged out successfully");
  }
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    getCurrentUser();
  }, [token])

  return (
    <div>
      <div
        ref={dropdownRef}
        className="py-5 bg-white -mx-6 px-6 rounded-lg shadow-md flex items-center justify-between font-medium"
      >
        <NavLink to="about-us" className="cursor-pointer">
          <img className="md:w-32 w-28" src="/MainLogo.svg" alt="" />
        </NavLink>

        <ul className="gap-8 hidden sm:flex text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p className="text-lg hover:text-slate-400 transition-all duration-500">
              HOME
            </p>
            <hr className="w-3/4 border-none h-[2px] bg-black hidden transition-all duration-500" />
          </NavLink>
          <NavLink to="/store" className="flex flex-col items-center gap-1">
            <p className="text-lg hover:text-slate-400 transition-all duration-500">
              STORE
            </p>
            <hr className="w-3/4 border-none h-[2px] bg-black hidden transition-all duration-500" />
          </NavLink>
          <NavLink to="/services" className="flex flex-col items-center gap-1">
            <p className="text-lg hover:text-slate-400 transition-all duration-500">
              SERVICES
            </p>
            <hr className="w-3/4 border-none h-[2px] bg-black hidden transition-all duration-500" />
          </NavLink>
          <NavLink to="/contact-us" className="flex flex-col items-center gap-1">
            <p className="text-lg hover:text-slate-400 transition-all duration-500">
              CONTACT
            </p>
            <hr className="w-3/4 border-none h-[2px] bg-black hidden transition-all duration-500" />
          </NavLink>
        </ul>

        <div className="flex items-center justify-between md:gap-8 gap-5 flex-wrap transition-all delay-500">
          {/* Search Bar Icon */}
          <div onClick={() => setSearchBarVisible(!searchBarVisible)} className="relative">
            <img
              src={assets.SearchIcon}
              alt="Search"
              className="md:w-8 w-6 cursor-pointer transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            {isLogin ? (
              <div>
                <img
                  onClick={() => setDropdownAppear(!dropdownAppear)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className="w-8 h-8 cursor-pointer transition-all duration-500 hover:scale-105 rounded-full"
                  src={addAvatar}
                  alt="Profile"
                />
                {dropdownAppear && (
                  <div className="absolute right-0 mt-2 w-40 md:w-48 py-3 px-5 bg-slate-100 text-gray-500 bg-gray-50 rounded shadow-lg z-20">
                    <Link
                      to="/user-profile"
                      className="block py-1 text-sm md:text-base hover:text-black hover:border-b-2"
                    >
                      My Profile
                    </Link>
                    <Link
                      target="_blank"
                      to="/orders"
                      className="block py-1 text-sm md:text-base hover:text-black hover:border-b-2"
                    >
                      Orders
                    </Link>
                    <Link
                      onClick={logout}
                      className="block cursor-pointer py-1 text-sm md:text-base hover:text-black hover:border-b-2"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <img
                  onBlur={handleBlur}
                  tabIndex={0}
                  className="md:w-8 w-6 cursor-pointer transition-all duration-500 hover:scale-105"
                  src={assets.UserProfile}
                  alt="Profile"
                />
              </Link>
            )}
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

      {searchBarVisible && (
        <div className="md:w-[84%] bg-gray-200 w-full md:absolute z-20 bg-slate-100 md:py-4 md:px-10 mt-6 py-2 rounded-lg shadow-md transition-all duration-500">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center max-w-4xl md:mx-auto mx-[0.3rem]"
          >
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onBlur={handleBlur}
              placeholder="Search products..."
              className="border p-2 px-4 rounded w-full"
            />
            <button
              type="submit"
              className="border-2 px-4 md:px-8 py-2 rounded-lg mx-2 bg-blue-600 text-white text-sm md:text-base"
            >
              Search
            </button>
          </form>

          {/* Search Results Dropdown */}
          {searchQuery && searchResults.length > 0 && (
            <div className="max-w-4xl md:mx-auto mx-[0.3rem] mt-2 bg-white border rounded-lg shadow-lg">
              {searchResults.slice(0, 10).map((product) => {
                // Function to return the correct URL
                const getProductLink = (category, id) => {
                  switch (category) {
                    case "laptop":
                      return `/store/productsLaptops/${id}`;
                    case "service":
                      return `/services/${id}`;
                    case "device":
                      return `/store/productsDevices/${id}`;
                    case "printercctv":
                      return `/store/productsPrinterAndCCTV/${id}`;
                    case "parts":
                      return `/store/productsParts/${id}`;
                    default:
                      return "#"; // Fallback for unknown categories
                  }
                };

                return (
                  <Link
                    key={product._id}
                    onClick={handleProductClick} // 👈 Reset & blur on click
                    to={getProductLink(product.category, product._id)}
                    className="block px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-800">{product.name}</span>
                      <span className="text-gray-500 text-sm">{product.category}</span>
                    </div>
                  </Link>
                );
              })}

              {searchResults.length > 10 && (
                <div className="px-4 text-gray-500 text-sm text-center">
                  Showing top 10 results. Refine your search for more.
                </div>
              )}
            </div>
          )}



          {/* No Results Message */}
          {searchQuery && searchResults.length === 0 && (
            <div className="max-w-4xl md:mx-auto mx-[0.3rem] mt-2 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-600">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;