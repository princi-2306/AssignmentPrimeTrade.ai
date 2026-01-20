import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../context/ShopContext.jsx"
import Title from "../MultiUse/Title.jsx"
import ProductItem from "../MultiUse/ProductItem.jsx"

const LatestCollection = () => {

    const { LaptopProducts } = useContext(ShopContext);
    const [latestCollection, setLatestCollection] = useState([]);

    useEffect(()=>{
      setLatestCollection(LaptopProducts.slice(0,10))
    },[LaptopProducts])

  return (
    <div className="my-10 py-8 pt-2 px-4 rounded-md shadow-md bg-white">
      <div className="text-center py-8 pt-10 text-3xl">
        <Title title1="LATEST" title2="COLLECTIONS" />
        <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Explore our latest range of high-performance laptops, cutting-edge devices, premium computer parts, and accessories designed to meet all your tech needs. 
        Upgrade your setup with the best in modern technology!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestCollection.map((e,i) => (
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

export default LatestCollection
