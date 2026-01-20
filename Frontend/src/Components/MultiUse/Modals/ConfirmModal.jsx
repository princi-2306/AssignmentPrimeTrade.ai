import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { ShopContext } from "../../../context/ShopContext";

export function DialogSizesConfirm({ size, handleOpen, buttonText }) {
    const { ProductsLaptopsID, ProductsPartsID, ProductsDevicesID, ProductsPrintersAndCctvID, servicesID } = useParams();
    const { LaptopProducts, currency, addToCart, ComputerParts ,ComputerAccessories, PrintersAndCCTVs, services } = useContext(ShopContext);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            let selectedProduct = [];
            if (ProductsLaptopsID){
                 selectedProduct = LaptopProducts.find((e) => (e._id === ProductsLaptopsID));
            } else if (ProductsPartsID) {
                selectedProduct = ComputerParts.find((e) => (e._id === ProductsPartsID));
            } else if (ProductsDevicesID) {
                selectedProduct = ComputerAccessories.find((e) => (e._id === ProductsDevicesID));
            } else if (ProductsPrintersAndCctvID) {
                selectedProduct = PrintersAndCCTVs.find((e) => (e._id === ProductsPrintersAndCctvID));
            } else if (servicesID) {
                selectedProduct = services.find((e) => (e._id === servicesID));
            }

            if (selectedProduct) {
                setProductData(selectedProduct);
            }
        };
        fetchProductData();
        
    }, [LaptopProducts, ProductsLaptopsID, productData,ProductsPartsID, ComputerParts, ComputerAccessories, ProductsDevicesID, PrintersAndCCTVs, ProductsPrintersAndCctvID, servicesID, services]);

    const submitData = () => {
        addToCart(productData._id) 
        handleOpen(null);
      };


    return (
        <Dialog
            open={size === "md"}
            size={size || "md"}
            handler={() => handleOpen(null)}
        >
            <DialogHeader>Add to Cart Item</DialogHeader>
            <DialogBody>
                <p className="">
                    Please click on {buttonText} to add the product into the cart!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mx-2 sm:gap-6 items-center mt-4">
                    {productData.image && productData.image[0] && (
                        <img
                            src={productData.image[0]}
                            className="w-full sm:w-36 h-20 object-contain rounded-md"
                        />
                    )}

                    <div className="text-center sm:text-left">
                        <h1 className="text-lg font-semibold text-gray-800">{productData.name}</h1>
                        <p className="text-sm text-gray-600 md:w-80 w-[80vw]">{productData.description}</p>
                        <p className="text-lg font-medium text-blue-600">{currency}{productData.price}</p>
                    </div>

                    {/* <div className="text-center sm:text-right ">
                        <p className="text-lg font-semibold text-gray-800">Quantity</p>
                        <div className="text-lg font-semibold text-blue-300 flex">
                            {quantity}
                        </div>
                    </div> */}
                </div>
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