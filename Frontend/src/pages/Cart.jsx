import { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../Components/MultiUse/Title';
import { EmptyModal } from '../Components/MultiUse/Modals/EmptyModal';
import CartTotal from '../Components/MultiUse/CartTotal';
import { assets } from '../assets/assets';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Cart = () => {
  const { LaptopProducts, currency, cartItem, updateQuantity, navigate, ComputerParts, ComputerAccessories, PrintersAndCCTVs, services } = useContext(ShopContext);
  const [activeModal, setActiveModal] = useState(null);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        tempData.push({
          _id: item,
          quantity: cartItem[item]
        })
      }
    }
    setCartData(tempData);
  }, [cartItem])

  const handleConfirmingModalOpen = (itemId) => {
    setActiveModal(itemId); // Set the ID of the item whose modal is open
  };

  const submitData = (id) => {
    updateQuantity(id, 0); // Set quantity to 0 to "remove" the item
    setActiveModal(null); // Close the modal
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title title1="YOUR" title2="CART" />
      </div>

      <div>
        {cartData.length > 0 ? (
          <div>
            {cartData.map((e, i) => {
              const product = LaptopProducts.find((product) => product._id === e._id) || ComputerParts.find((product) => product._id === e._id) || ComputerAccessories.find((product) => product._id === e._id) || PrintersAndCCTVs.find((product) => product._id === e._id) || services.find((services) => services._id === e._id);
              return (
                <div
                  key={i}
                  className="flex flex-col my-4 px-6 sm:flex-row justify-between items-center border-b py-4 gap-4 sm:gap-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md"
                >
                  <div className="flex flex-col sm:flex-row gap-4 mx-2 sm:gap-6 items-center">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full sm:w-36 h-20 object-contain rounded-md"
                    />
                    <div className="text-center sm:text-left">
                      <h1 className="text-lg font-semibold text-gray-800">{product.name}</h1>
                      <p className="text-sm text-gray-600 sm:w-96 w-80">{product.description}</p>
                      <p className="text-lg font-medium text-blue-600">{currency}{product.price}</p>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-lg font-semibold text-green-500">
                      Quantity:
                      <span className='mx-1 font-normal'>
                        {e.quantity}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-green-500">
                      Total:
                      <span className='mx-1 font-normal'>
                        {currency}{e.quantity * product.price}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfirmingModalOpen(e._id)}
                    className="mx-4"
                  >
                    <img className="w-8" src={assets.DeleteBin} alt="" />
                  </button>

                  {activeModal === e._id && (
                    <Dialog
                      open={true}
                      size="md"
                      handler={() => setActiveModal(null)}
                      dismiss={{ outsidePointerDown: false }}
                    >
                      <DialogHeader>Remove Item</DialogHeader>
                      <DialogBody>
                        <p>Are you sure you want to Remove this item from your cart?</p>
                        <div className="flex flex-col sm:flex-row gap-4 mx-2 sm:gap-6 items-center mt-4">
                          {product.image && product.image[0] && (
                            <img
                              src={product.image[0]}
                              className="w-full sm:w-36 h-20 object-contain rounded-md"
                            />
                          )}

                          <div className="text-center sm:text-left">
                            <h1 className="text-lg font-semibold text-gray-800">{product.name}</h1>
                            <p className="text-sm text-gray-600 md:w-80 w-[80vw]">{product.description}</p>
                            <p className="text-lg font-medium text-blue-600">{currency}{product.price}</p>
                          </div>
                          <div className="text-center sm:text-right -mx-5">
                            <p className="text-lg font-semibold text-gray-800">Quantity</p>
                            <div className="text-lg font-semibold text-blue-300 flex text-center">
                              {e.quantity}
                            </div>
                          </div>

                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="text"
                          color="red"
                          onClick={() => setActiveModal(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={() => submitData(product._id)}
                        >
                          Remove
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className='my-4 w-full bg-white rounded-md'>
            <div className='flex justify-center my-4 py-8'>
              <img className='w-96' src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />
            </div>
            <div className='flex flex-col items-center mb-4 pb-6'>
              <h1 className="text-2xl my-2 text-center">Missing Cart items?</h1>
              <p className='text-lg text-gray-600'>Your cart is empty</p>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            {cartData.length > 0 ? (
              <div>
                <button onClick={() => { navigate("/place-order") }} className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-green-600'>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => { setActiveModal("md") }} className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-green-600'>
                  PROCEED TO CHECKOUT
                </button>
                <EmptyModal
                  size={activeModal}
                  handleOpen={setActiveModal}
                  buttonText="Okay"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
