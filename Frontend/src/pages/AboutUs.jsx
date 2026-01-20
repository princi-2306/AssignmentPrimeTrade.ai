import { useContext, useState, useEffect } from 'react'
import Title from '../Components/MultiUse/Title'
import { ShopContext } from '../context/ShopContext'


const AboutUs = () => {
  const [defaultImage, setDefaultImage] = useState([]);
  const { navigate, HistoryImage } = useContext(ShopContext)
  
  useEffect(() => {
    setDefaultImage(HistoryImage[0]);
  }, []);

  return (
    <div>
      <div className='text-2xl text-center mt-10 mb-4 mx-6'>
        <Title title1="ABOUT" title2="US" />
      </div>
      <div className='my-6 flex flex-col md:flex-row gap-10'>
        <div>
          <img className='sm:h-[75vh] sm:w-[35vw] object-cover rounded-md' src="https://metapod.com/cdn/shop/articles/tech-gift-for-him-2022-metapod.webp?v=1660778620&width=1000" alt="" />
          <div className='w-full my-4'>
            <p className='text-center'>For more information and questions</p>
            <button onClick={() => { navigate("/faq") }} className='bg-black w-full text-white text-sm my-2 px-8 py-3 hover:bg-blue-500'>
              Visit FAQs
            </button>
            <button onClick={() => { navigate("/privacy-policy") }} className='bg-black w-full text-white text-sm my-2 px-8 py-3 hover:bg-blue-500'>
              Visit Privacy Policy
            </button>
          </div>
        </div>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <div className=''>
            <div className='text-xl font-bold text-gray-800'>
              <Title title1="Important" title2="Note" />
            </div>
            <p className='text-base'>currently we are only shipping across Haldwani and nearby places, such as Pantnagar, Nainital, Rampur and Rudrapur.</p>
            <p className='text-base'>Also we offer SuperFast delivery under listed areas like Haldwani, Pantnagar, etc. Means product will be delivered within 2 days.</p>
          </div>
          <div>
            <div className='text-xl font-bold text-gray-800'>
              <Title title1="Welcome to TeraFortress:" title2="Your Tech, Our Stronghold." />
            </div>
            <p className='text-base'>At TeraFortress, we’re more than just a business – we’re your trusted partner in all things tech. Founded with a vision to provide cutting-edge solutions and unmatched customer support, we specialize in bringing high-quality laptops, cameras, and computer accessories to your fingertips.</p>
          </div>
          <div>
            <div className='text-xl font-bold text-gray-800'>
              <Title title1="Our" title2="Mission" />
            </div>
            <p className='text-base'>Our mission is to make technology accessible, reliable, and long-lasting for every individual and business. Whether it’s the latest gadgets or professional repair services, we aim to bridge the gap between innovation and convenience.</p>
          </div>
          <div>
            <div className='text-xl font-bold text-gray-800'>
              <Title title1="What Do" title2="We Offer" />
            </div>
            <div>
              <h1 className='text-black'>1. Wide Range of Products</h1>
              <p className='text-base mx-4'>From powerful laptops and sleek cameras to essential peripherals like keyboards and mouse, TeraFortress is your one-stop shop for all your tech needs.</p>
            </div>
            <div>
              <h1 className='text-black'>2. Professional Repair Services</h1>
              <p className='text-base mx-4'>Our experienced technicians ensure your computers and laptops get back in shape with the utmost care and precision.</p>
            </div>
            <div>
              <h1 className='text-black'>3. Customer-Centric Support</h1>
              <p className='text-base mx-4'>Your satisfaction is our priority. We’re here to assist you every step of the way, offering tailored recommendations and solutions.</p>
            </div>
          </div>
          <div className=''>
            <p onClick={() => navigate("/login")} className='text-light-blue-500 underline cursor-pointer'>Join the TeraFortress family today and experience technology like never before.</p>
          </div>
        </div>
      </div>
      <div className='text-2xl text-center mt-14 mb-4 mx-6'>
        <Title title1="OUR" title2="HISTORY" />
      </div>
      <div className='my-6 flex flex-col md:flex-row gap-10 mb-14'>
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-none justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {HistoryImage.map((e, i) => (
              <img
                onClick={() => {
                  setDefaultImage(e);
                }}
                src={e}
                key={i}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="Default"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={defaultImage} alt="" />
            <div>
              <p className="w-full h-[1.5px] my-6 bg-gray-300"></p>
              <div className="text-gray-700 ml-2">
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    SuperFast delivery under listed areas like Haldwani, Pantnagar, etc.
                  </p>
                </div>
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    SuperFast delivery means product will be delivered within 2 days.
                  </p>
                </div>
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    Discount on Servies like repairs and updates.
                  </p>
                </div>
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    Cash on delivery is available.
                  </p>
                </div>
                <div className="my-3 flex">
                  <p className="w-[6px] h-[6px] mr-2 bg-gray-700 rounded-full"></p>
                  <p className="-mt-2">
                    Easy return and Exchange Policy within 7 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <div className=''>
            <div className='text-xl font-bold text-gray-800'>
              <Title title1="The Origins" title2="of TeraFortress" />
            </div>
            <p className='text-base'>In the bustling city of Haldwani, nestled in the scenic landscapes of Uttarakhand, Mr. Ethesham Haider laid the foundation of what would later become TeraFortress. With a passion for technology and an entrepreneurial spirit, he began his journey in the late 2000s, offering computer repair services and selling refurbished laptops to the local community.</p>
          </div>
          <div>
            <div className='text-xl font-bold text-gray-800'>
              <Title title1="A Vision" title2="for Growth" />
            </div>
            <p className='text-base'>As demand for technology grew, so did Mr. Haider’s ambition. Recognizing the need for reliable tech solutions in the region, he expanded his services to include new laptops, cameras, and a variety of computer accessories such as keyboards, mice, and networking tools. With his dedication to quality and customer satisfaction, his business quickly gained trust and became a go-to destination for tech enthusiasts in Haldwani.</p>
          </div>
          <div>
            <div className='text-xl font-bold text-gray-800'>
              <Title title1="From Local Roots" title2="to a National Dream" />
            </div>
            <p className='text-base'>Driven by his son Faraz Mohammad’s vision to scale the business, TeraFortress evolved from a small-town store into a growing e-commerce platform. Together, they aim to provide cutting-edge tech products and reliable services to customers across Uttrakhand, staying true to the company’s slogan: "Your Tech, Our Stronghold."</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
