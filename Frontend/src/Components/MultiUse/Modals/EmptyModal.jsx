// import { useState, useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
// import { ShopContext } from "../../../context/ShopContext";

export function EmptyModal({ size, handleOpen, buttonText }) {
    // const { ProductsLaptopsID } = useParams();
    // const { LaptopProducts, currency, addToCart } = useContext(ShopContext);
    // const [productData, setProductData] = useState([]);

    const submitData = () => {
        // addToCart(productData._id) 
        handleOpen(null);
      };


    return (
        <Dialog
            open={size === "md"}
            size={size || "md"}
            handler={() => handleOpen(null)}
        >
            <DialogHeader>Empty Cart</DialogHeader>
            <DialogBody>
                <p className="">
                    Please add some items to the cart before proceeding to checkout page! 
                </p>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen(null)}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={submitData}
                >
                    <span>{buttonText}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}