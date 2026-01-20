import {assets} from "../../assets/assets.js"

const OurPolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center my-10 py-8 pt-8 px-4 rounded-md shadow-md bg-white'>
      <div>
        <img src={assets.ExchangeLogo} alt="" className="w-12 m-auto mb-3 sm:w-10"/>
        <p className="font-semibold sm:text-base">Easy Exchange Policy</p>
        <p className="text-gray-500 text-sm">We offer hassle free Exchange Policy</p>
      </div>
      <div>
        <img src={assets.Headphone} alt="" className="w-12 m-auto mb-3 sm:w-10"/>
        <p className="font-semibold sm:text-base">Easy Exchange Policy</p>
        <p className="text-gray-500 text-sm">We offer hassle free Exchange Policy</p>
      </div>
      <div>
        <img src={assets.RefundCheck} alt="" className="w-12 m-auto mb-3 sm:w-10"/>
        <p className="font-semibold sm:text-base">Easy Exchange Policy</p>
        <p className="text-gray-500 text-sm">We offer hassle free Exchange Policy</p>
      </div>
    </div>
  )
}

export default OurPolicies
