import { useContext } from "react";
import ServicesBlocks from "./ServicesBlocks";
import { ShopContext } from "../../context/ShopContext";
import Title from "../MultiUse/Title";

const ServiceMain = () => {
  const { services } = useContext(ShopContext);

  return (
    <div className="mb-14">
      <div className="text-2xl text-center mt-12 mb-8">
        <Title title1="SERVICES" title2="PAGE" />
      </div>
      {services.length > 0 && (
        <div className="flex flex-col gap-4 flex-wrap">
          {services.map((service, index) => (
            <div key={index}>
              <ServicesBlocks
                name={service.name}
                description={service.description}
                price={service.price}
                image={service.image[0]}
                _id={service._id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceMain;
