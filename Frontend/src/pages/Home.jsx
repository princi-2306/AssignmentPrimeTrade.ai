import { motion } from "framer-motion";
import Hero from "../Components/HomeUse/Hero";
import LatestCollection from "../Components/HomeUse/LatestCollection";
import Bestsaller from "../Components/HomeUse/Bestsaller";
import OurAim from "../Components/HomeUse/OurAim";
import FAQ from "../Components/HomeUse/FAQ";
import MessageUs from "../Components/HomeUse/MessageUs";
import Footer from "../Components/MultiUse/Footer";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  return (
    <div>
      <div className="my-10">
        <Hero />
      </div>
      <LatestCollection />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Replay animations on scroll
        variants={animationVariants}
      >
        <Bestsaller />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={animationVariants}
      >
        <OurAim />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={animationVariants}
      >
        <FAQ />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={animationVariants}
      >
        <MessageUs />
      </motion.div>
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

export default Home;
