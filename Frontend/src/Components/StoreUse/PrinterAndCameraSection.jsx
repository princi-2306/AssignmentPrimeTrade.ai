import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from "../../context/ShopContext"
import Title from '../MultiUse/Title'
import ProductItemPrinters from '../MultiUse/ProductItemPrinters'

const PrinterAndCameraSection = () => {
  const { PrintersAndCCTVs } = useContext(ShopContext)
  const [bestSeller, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProduct = PrintersAndCCTVs.filter((e) => (e.bestSeller))
    setBestSellers(bestProduct.slice(0, 5))
  }, [PrintersAndCCTVs])

  return (
    <div className='my-2 mb-10 py-8 pt-2 px-4 rounded-md shadow-md bg-white '>
      <div className='text-center text-2xl py-8'>
        <Title title1="PRINTER AND" title2="CCTVs SECTION" />
        <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our Printers section for reliable and high-quality printing solutions. From home to office needs, find printers with advanced features and efficiency. Secure your space with our CCTV section. Discover advanced surveillance cameras offering clear visuals, smart monitoring, and peace of mind.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {bestSeller.map((e, i) => (
          <ProductItemPrinters
            key={i}
            id={e._id}
            image={e.image}
            name={e.name}
            price={e.price}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-8 text-center">
        <Link 
          to="/store/productsPrinterAndCCTV" 
          className="inline-block bg-black text-white px-6 py-2 rounded
          shadow-md hover:bg-gray-700 transition-colors duration-300 text-sm 
          md:text-base"
        >
          View All Printers & CCTVs
        </Link>
      </div>
    </div>
  )
}

export default PrinterAndCameraSection