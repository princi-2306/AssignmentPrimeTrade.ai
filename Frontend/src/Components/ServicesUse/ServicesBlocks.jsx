import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const ServicesBlocks = (props) => {
  const { currency } = useContext(ShopContext);
  return (
    <section className="bg-white dark:bg-gray-600 py-16 px-6 rounded-md">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight dark:text-white">
            {props.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
            {props.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="px-6 py-3 text-black bg-primary-700 hover:bg-primary-800 rounded-lg text-lg font-medium transition-all focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Get Started
              <svg
                className="w-5 h-5 ml-2 inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Link
              target="_blank"
              to={`/services/${props._id}`}
              className="px-6 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg text-lg font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800"
            >
              {currency}
              {props.price}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <img
            src={props.image}
            alt="mockup"
            className="w-full max-w-md lg:max-w-lg drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesBlocks;
