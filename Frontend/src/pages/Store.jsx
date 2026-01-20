import { motion } from "framer-motion";
import Title from "../Components/MultiUse/Title";
import LaptopSection from "../Components/StoreUse/LaptopSection";
import ComputerPartSection from "../Components/StoreUse/ComputerPartSection";
import DeviceSection from "../Components/StoreUse/DeviceSection";
import PrinterAndCameraSection from "../Components/StoreUse/PrinterAndCameraSection";
import Footer from "../Components/MultiUse/Footer";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Store = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-8 pb-4">
        <Title title1="STORE" title2="PAGE"/>
      </div>      
      <div>
        <LaptopSection />
      </div>
      <div>
        <DeviceSection />  
      </div>
      <div>
        <ComputerPartSection />
      </div>
      <div>
        <PrinterAndCameraSection />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={animationVariants}
      >
        <Footer />
      </motion.div>
    </div>
  )
}

export default Store
