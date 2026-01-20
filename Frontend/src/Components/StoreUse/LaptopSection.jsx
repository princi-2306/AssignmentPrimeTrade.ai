import { useState, useContext, useEffect } from 'react'
import { ShopContext } from "../../context/ShopContext"
import { Link } from 'react-router-dom'
import Title from '../MultiUse/Title'
import ProductItem from '../MultiUse/ProductItem'

const LaptopSection = () => {
    const { LaptopProducts } = useContext(ShopContext)
    const [bestSeller, setBestSellers] = useState([]);

    // This useEffect is used for storing all the true values of laptopProduct.bestSellers in the bestSaller useState.
    useEffect(()=>{
      const bestProduct = LaptopProducts.filter((e)=>(e.bestSeller))  // here if the value is true the filter will save all the true values in bestProduct and otherwise it will not store the value.
      setBestSellers(bestProduct.slice(0,5))
    },[LaptopProducts])
    
  return (
    <div className='my-2 mb-10 py-8 pt-2 px-4 rounded-md shadow-md bg-white'>
      <div className='text-center text-2xl py-8'>
        <Title title1="LAPTOPS" title2="SECTION"/>
        <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our Laptop section for cutting-edge technology, sleek designs, and unmatched performance. From productivity to gaming, discover top brands, powerful processors, and advanced features tailored for every need.        
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

      {/* View All Button */}
      <div className="mt-8 text-center">
        <Link 
          to="/store/productsLaptops" 
          className="inline-block bg-black text-white px-6 py-2 rounded
          shadow-md hover:bg-gray-700 transition-colors duration-300 text-sm 
          md:text-base"
        >
          View All Laptops
        </Link>
      </div>
    </div>
  )
}

export default LaptopSection