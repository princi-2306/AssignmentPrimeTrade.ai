import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryImage, faqs } from "../assets/assets.js"
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const currency = "$";
    const deliveryFee = 0;
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [cartItem, setCartItem] = useState({});
    const [LaptopProducts, setLaptopProducts] = useState([]);
    const [ComputerParts, setComputerParts] = useState([]);
    const [ComputerAccessories, setComputerAccessories] = useState([]);
    const [PrintersAndCCTVs, setPrintersAndCCTVs] = useState([]);
    const [services, setServices] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const addToCart = async (ItemId) => {
        if (!token) {
            toast.error("Please login to add items to cart");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/cart/addToCart`,
                { userId, ItemId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                let cartData = structuredClone(cartItem);
                cartData[ItemId] = (cartData[ItemId] || 0) + 1;
                setCartItem(cartData);
                toast.success("Item added to cart");
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error(error.response?.data?.message || "Failed to add item to cart");
        }
    };

    const getCartCount = () => {
        return Object.values(cartItem).reduce((total, count) => {
            return total + (count > 0 ? count : 0);
        }, 0);
    };

    const updateQuantity = async (ItemId, quantity) => {
        if (!token) {
            toast.error("Please login to update cart");
            navigate("/login");
            return;
        }
    
        if (!userId) {
            toast.error("User ID not found");
            return;
        }
    
        try {
            const response = await axios.post(
                `${backendUrl}/cart/updateCart`,
                { userId, ItemId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (response.data.success) {
                setCartItem(prevCart => ({
                    ...prevCart,
                    [ItemId]: quantity
                }));
                toast.success("Cart updated successfully");
            }
        } catch (error) {
            console.error("Update quantity error:", error);
            toast.error(error.response?.data?.message || "Failed to update quantity");
        }
    };

    const getTotalAmount = () => {
        return Object.entries(cartItem).reduce((total, [itemId, quantity]) => {
            const itemInfo =
                LaptopProducts.find(e => e._id === itemId) ||
                ComputerParts.find(e => e._id === itemId) ||
                ComputerAccessories.find(e => e._id === itemId) ||
                PrintersAndCCTVs.find(e => e._id === itemId) ||
                services.find(e => e._id === itemId);

            return total + (itemInfo ? itemInfo.price * quantity : 0);
        }, 0);
    };

    const fetchProducts = async (endpoint, setterFunction) => {
        try {
            const response = await axios.get(`${backendUrl}${endpoint}`);
            if (response.data.success) {
                setterFunction(response.data.data);
            }
        } catch (error) {
            console.error(`Failed to fetch data from ${endpoint}:`, error);
            toast.error("Failed to fetch products");
        }
    };

    const getCurrentUser = async () => {
        if (!token) return;

        try {
            const response = await axios.get(
                `${backendUrl}/users/current-user`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setUserId(response.data.data._id);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            if (error.response?.status === 401) {
                // Token is invalid or expired
                localStorage.removeItem("token");
                setToken("");
                setUserId(null);
                navigate("/login");
            }
        }
    };

    const fetchUserCart = async () => {
        if (!userId || !token) {
            console.log("Missing userId or token for cart fetch");
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/cart/getUserCart`,
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCartItem(response.data.data.cartData || {});
            }
        } catch (error) {
            console.error("Error fetching user cart:", error);
            toast.error("Failed to fetch cart items");
        }
    };

    // Then, create a separate useEffect for fetching cart data
    useEffect(() => {
        if (userId && token) {
            fetchUserCart();
        }
    }, [userId, token, backendUrl]); // Add proper dependencies


    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                fetchProducts("/productLaptops/listProductLaptop", setLaptopProducts),
                fetchProducts("/productPart/listProductPart", setComputerParts),
                fetchProducts("/productDevice/listProductDevice", setComputerAccessories),
                fetchProducts("/productPrinterCCTV/listProductPrinterCCTV", setPrintersAndCCTVs),
                fetchProducts("/service/listService", setServices)
            ]);
        };

        getCurrentUser();
        fetchAllData();

    }, [backendUrl]);


    const value = {
        LaptopProducts,
        ComputerParts,
        ComputerAccessories,
        PrintersAndCCTVs,
        HistoryImage,
        services,
        faqs,
        currency,
        deliveryFee,
        cartItem,
        setCartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        getTotalAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        userId,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;