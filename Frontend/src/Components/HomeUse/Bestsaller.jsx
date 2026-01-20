import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../MultiUse/Title'
import ProductItem from '../MultiUse/ProductItem'

const Bestsaller = () => {
    const { LaptopProducts } = useContext(ShopContext)
    const [bestSeller, setBestSellers] = useState([]);

    // This useEffect is used for storing all the true values of laptopProduct.bestSellers in the bestSaller useState.
    useEffect(()=>{
      const bestProduct = LaptopProducts.filter((e)=>(e.bestSeller))  // here if the value is true the filter will save all the true values in bestProduct and otherwise it will not store the value.
      setBestSellers(bestProduct.slice(0,5))
    },[LaptopProducts])
  return (
    <div className='my-10 py-8 pt-2 px-4 rounded-md shadow-md bg-white '>
      <div className='text-center text-3xl py-8'>
        <Title title1="BEST" title2="SELLERS"/>
        <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our best-sellers: high-performance laptops, top-rated gadgets, premium computer parts, and must-have accessories.
          Trusted by tech enthusiasts, these products are crafted to elevate your experience and keep you ahead in the tech game!
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {
          bestSeller.map((e,i)=>(
            <ProductItem
            key={i}
            id={e._id}
            image={e.image}
            name={e.name}
            price={e.price}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Bestsaller
