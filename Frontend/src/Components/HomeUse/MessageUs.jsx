import CopyTextButton from "../MultiUse/CopyButton";

const MessageUs = () => {
    return (
      <div className="flex flex-col lg:flex-row my-10 py-8 pb-10 px-4 rounded-md shadow-md bg-white">
        {/* Left side */}
        <div className="flex flex-col justify-between border-b-2 border-gray-400 lg:border-b-0 lg:border-r-2 px-4 lg:px-10 lg:pr-14 mt-4">
          <div className="mb-5 mt-3">
            <p className="text-gray-600 px-2 text-sm md:text-base">Address</p>
            <div className="text-gray-800 py-4 px-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="px-2 pr-4 text-sm md:text-base">
                Sector 2, Jawahar Nagar, Jaipur, Rajasthan 302004
              </p>
              <div className="mt-2 sm:mt-0">
                <CopyTextButton copyText="Sector 2, Jawahar Nagar, Jaipur, Rajasthan" />
              </div>
            </div>
          </div>
          <div className="mb-5 mt-3">
            <p className="text-gray-600 px-2 text-sm md:text-base">Phone</p>
            <div className="text-gray-800 py-4 px-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-sm md:text-base">+91 7726990478</p>
              <div className="mt-2 sm:mt-0">
                <CopyTextButton copyText="7726990478" />
              </div>
            </div>
          </div>
          <div className="mb-5 mt-3">
            <p className="text-gray-600 px-2 text-sm md:text-base">Email</p>
            <div className="text-gray-800 py-4 px-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-sm md:text-base">
                priyanshimaurya23@gmail.com
              </p>
              <div className="mt-2 sm:mt-0">
                <CopyTextButton copyText="priyanshimaurya23@gmail.com" />
              </div>
            </div>
          </div>
        </div>
        {/* Right Hand Side */}
        <div className="w-full lg:w-[35vw] px-4 lg:px-10 mt-4">
          <p className="text-gray-600 text-lg md:text-2xl mb-4 lg:mb-8 text-center lg:text-left">
            Contact Us
          </p>
          <div className="w-full flex justify-center lg:justify-start">
            <form
              action="https://formsubmit.co/priyanshimaurya23@gmail.com"
              method="POST"
              className="relative text-gray-600 w-full max-w-md"
            >
              <div className="mx-2 my-4">
                <input
                  name="email"
                  className="border-2 rounded-md w-full p-2 my-2 text-sm md:text-base"
                  id="Email"
                  placeholder="Email"
                  type="text"
                />
                <input
                  name="Subject"
                  id="Subject"
                  className="border-2 rounded-md w-full p-2 my-2 text-sm md:text-base"
                  placeholder="Subject"
                  type="text"
                />
                <textarea
                  name="message"
                  className="border-2 w-full p-2 rounded-md my-2 text-sm md:text-base"
                  id="message"
                  placeholder="Message"
                  rows="4"
                ></textarea>
                <input type="hidden" name="_captcha" value="false" />
              </div>
              <div className="flex w-full justify-center">
                <button className="relative inline-block text-md group">
                  <span className="relative z-10 block px-10 py-1 bg-blue-500 overflow-hidden font-medium leading-tight text-gray-200 transition-colors duration-300 ease-out border-2 rounded-lg group-hover:text-white">
                    <span className="absolute left-0 w-60 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span className="relative">SEND</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default MessageUs;
