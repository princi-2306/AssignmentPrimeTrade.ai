import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LaptopProducts, HistoryImage, faqs, ComputerParts, ComputerAccessories, PrintersAndCCTVs, services } from "../assets/assets.js"
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const deliveryFee = 0;
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate()

    const addToCart = async (ItemId) => {
        let cartData = structuredClone(cartItem); // making a clone of the cartItem object
        if(cartData[ItemId]){
            cartData[ItemId]++;
        } else {
            cartData[ItemId] = {};
            cartData[ItemId] = 1;
        }
        toast.success("Item added to cart");
        setCartItem(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItem) {
            try {
                if (cartItem[item] > 0) {
                    totalCount += cartItem[item];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalCount;
    }

    const updateQuantity = async (ItemId, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[ItemId] = quantity;
        setCartItem(cartData);
    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            const itemInfo = LaptopProducts.find((e) => e._id === item) || ComputerParts.find((e) => e._id === item) || ComputerAccessories.find((e) => e._id === item) || PrintersAndCCTVs.find((e) => e._id === item) || services.find((e) => e._id === item); // Find the product info using its ID
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItem[item]; // Add price * quantity
            }
        }
        return totalAmount;
    };
    

    const value = {
        LaptopProducts, ComputerParts, ComputerAccessories, PrintersAndCCTVs, HistoryImage, services, faqs, currency, deliveryFee, cartItem, addToCart, getCartCount, updateQuantity, getTotalAmount, navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;