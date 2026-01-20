import { useState, useEffect, useContext } from "react";
import { ShopContext } from '../../context/ShopContext';

let autoSlide = true;
let slideDuration = 2500;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { LaptopProducts } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProduct = LaptopProducts.filter((e) => e.bestSeller);
    setBestSellers(bestProduct.slice(0, 5));
  }, [LaptopProducts]);

  const next = () => setCurrent((e) => (e === bestSellers.length - 1 ? 0 : e + 1));

  useEffect(() => {
    if (!autoSlide || isHovered) return;
    const s = setInterval(next, slideDuration);
    return () => clearInterval(s);
  }, [isHovered, next]);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 bg-white rounded">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 mt-2 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] mt-3 bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <div>
        <div className="md:w-[45vw] md:h-[60vh] flex justify-center items-center relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <div style={{ transform: `translateX(-${current * 100}%)` }} className="flex transition-transform ease-out duration-500 w-full h-full">
            {bestSellers.map((e, i) => (
              <div className="relative hover:scale-105 ease-out duration-700 transition-all min-w-full h-full" key={i}>
                <a target='_blank' rel="noopener noreferrer" href={`/store/productsLaptops/${e._id}`}>
                  <img src={e.image[0]} alt={e.title} className='object-cover w-full h-full' />
                </a>
              </div>
            ))}
          </div>
          <div className="absolute bottom-1 mt-2">
            <div className="gap-2 flex justify-center items-center">
              {bestSellers.map((_, i) => (
                <div key={i} className={`border bg-white w-2 h-2 rounded-full ${current === i ? "p-1" : "bg-opacity-50"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;