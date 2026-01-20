import { useState, useContext } from 'react'
import Title from '../Components/MultiUse/Title';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../Components/MultiUse/CartTotal';
import { assets } from '../assets/assets';

const PlaceOrder = () => {

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------------ Left Side -------------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title title1="DELIVERY" title2="INFORMATION"/>
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="Number" min={1} placeholder='ZipCode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="Number" placeholder='Phone' />
      </div>

      {/* ------------------ Right Side -------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title title1="PAYMENT" title2="METHOD" />
          {/* Payment method selections */}
          <div className='flex gap-3 flex-col lg:flex-row '>
            <div onClick={() => {setPaymentMethod("stripe")}} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod == "stripe" ? "bg-green-500" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.stripe} alt="" />
            </div>
            <div onClick={() => {setPaymentMethod("razorpay")}} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod == "razorpay" ? "bg-green-500" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay} alt="" />
            </div>
            <div onClick={() => {setPaymentMethod("cod")}} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod == "cod" ? "bg-green-500" : ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end'>
            <button onClick={() => {navigate("/orders")}} className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-green-600'>
              PLACE THE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
