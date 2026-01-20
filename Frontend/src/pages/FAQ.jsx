import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../src/assets/assets";

const FAQ = () => {
  // State to track the open question
  const [openIndex, setOpenIndex] = useState(null);

  const {faqs} = useContext(ShopContext);

  // Toggle function for the FAQ items
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" lg:w-full md:py-10 md:px-6 my-10 py-4 pt-4 px-4 rounded-md shadow-md bg-white">
      <h1 className="text-center lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-700 font-semibold">
        FAQ's
      </h1>
      <div className="lg:w-8/12 w-full mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="w-full md:px-6">
            <hr className="w-full lg:mt-10 my-8" />
            <div
              className="flex justify-between items-center w-full cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <p className="flex justify-center items-center font-medium text-base leading-6 text-gray-800">
                <span className="lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 font-semibold text-gray-800">
                  Q{index + 1}.
                </span>
                {faq.question}
              </p>
              <img
                className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""
                  }`}
                src={assets.DropdownIcon}
                alt="toggler"
              />
            </div>
            <div
              className={`${openIndex === index ? "block" : "hidden"
                } mt-6 w-full`}
            >
              <p className="text-base leading-6 text-gray-600 font-normal">
                {faq.answer}
              </p>
              {index === 1 && openIndex === 1 && (
                <div className="mt-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13929.1091457151!2d79.50929026175693!3d29.21539735029882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09b4801853403%3A0xdaee40908688972c!2sTotal%20Computer%20and%20Networking%20Solutions!5e0!3m2!1sen!2sin!4v1733568484544!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                </div>
              )}
            </div>

          </div>
        ))}
        <hr className="w-full lg:mt-10 my-8" />
      </div>
    </div>
  );
};

export default FAQ;
