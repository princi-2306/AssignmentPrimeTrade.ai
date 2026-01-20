import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";

const ServicesItem = (props) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/services/${props._id}`}
      className="text-gray-700 cursor-pointer"
    >
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out duration-500"
          src={props.image[0]}
          alt=""
        />
      </div>
      <p className="pb-1 pt-3 text-sm">{props.name}</p>
      <p className="text-sm font-medium">
        {currency}
        {props.price}
      </p>
    </Link>
  );
};

export default ServicesItem;
