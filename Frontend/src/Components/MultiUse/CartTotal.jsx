import { useContext } from 'react'
import { ShopContext } from "../../context/ShopContext"
import Title from "./Title"

const CartTotal = () => {
  const {currency,deliveryFee,getTotalAmount} = useContext(ShopContext);

  return (
    <div className='w-full bg-gray-50 shadow-md p-4 rounded-md'>
      <div className='text-2xl'>
        <Title title1="CART" title2="TOTAL" />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>SubTotal</p>
          <p>{currency}{getTotalAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Delivery Fee</p>
          <p>{currency}{deliveryFee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <p>{currency}{getTotalAmount() === 0 ? 0 : getTotalAmount() + deliveryFee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal