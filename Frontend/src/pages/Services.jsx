import { motion } from "framer-motion";
import ServiceMain from "../Components/ServicesUse/ServiceMain";
import Footer from "../Components/MultiUse/Footer";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Servies = () => {
  return (
    <div>
      <ServiceMain />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={animationVariants}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Servies;
