import Title from '../Components/MultiUse/Title'
import MessageUs from '../Components/HomeUse/MessageUs'

const ContactUs = () => {
  return (
    <div>
      <div className='text-2xl text-center mt-14 mb-4 mx-6'>
        <Title title1="Our" title2="Contacts"/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-16'>
        <img className='sm:w-[40vw] sm:h-[60vh] w-[95vw] h-[40vh] object-cover object-left' src="https://plus.unsplash.com/premium_photo-1661763911173-f2f7becc70b0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className='flex flex-col justify-center gap-6 items-start '>
          <p className='font-semibold text-xl'>Our Store</p>
          <p className='text-gray-600'>Sector 2, Jawahar Nagar <br /> Jaipur, Rajasthan 302004</p>
          <p className='text-gray-600'>Phone: +91-7726990478 <br /> Email: priyanshimaurya23@gmail.com</p>
          <p className='font-semibold text-xl'>Alternate Contacts</p>
          <p className='text-gray-600'>Phone: +91-9694309611 <br /> Email: 204.priyanshi@gmail.com</p>
        </div>
      </div>
      <div className='mb-20'>
      <div className='text-2xl text-center mx-6'>
        <Title title1="Message" title2="Us" />
      </div>
        <MessageUs />
      </div>
    </div>
  )
}

export default ContactUs
