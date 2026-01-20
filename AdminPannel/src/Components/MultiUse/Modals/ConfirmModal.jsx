import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { currency } from "../../../App";

export function RemoveConfirmModal({ open, onClose, onConfirm, product }) {
    if (!product) return null;

    return (
        <Dialog
            open={open}
            handler={onClose}
            size="md"
        >
            <DialogHeader>Confirm Remove Product</DialogHeader>
            <DialogBody>
                <p className="mb-4">
                    Are you sure you want to remove this product?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mx-2 sm:gap-6 items-center">
                    {product.image && product.image[0] && (
                        <img
                            src={product.image[0]}
                            className="w-full sm:w-36 h-20 object-contain rounded-md"
                            alt={product.name}
                        />
                    )}

                    <div className="text-center sm:text-left">
                        <h1 className="text-lg font-semibold text-gray-800">{product.name}</h1>
                        <p className="text-sm text-gray-600 md:w-80 w-[80vw]">{product.description}</p>
                        <p className="text-lg font-medium text-blue-600">{currency}{product.price}</p>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="gray"
                    onClick={onClose}
                    className="mr-1 cursor-pointer"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="red"
                    onClick={onConfirm}
                    className="cursor-pointer"
                >
                    <span>Confirm Remove</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}