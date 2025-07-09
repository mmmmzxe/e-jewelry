import React from "react";
import { aboutData } from "../../Data/data";
import { motion } from "framer-motion";
import { plateVariants, staggerContainer, fadeIn } from "../../Context/variants";

const About = () => {
  const { pretitle, title, subtitle, btnText, image } = aboutData;
  return (
    <section className="min-h-[650px]">
      <div className="mx-auto min-h-[615px] container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="min-h-[600px] flex flex-col lg:flex-row items-center "
        >
          <motion.div
            variants={fadeIn("right", "tween", 0.2, 1.8)}
            className="flex-1 text-center lg:text-left"
          >
            <div className="pretitle">{pretitle}</div>
            <h2 className="h2 capitalize">{title}</h2>
            <p className="mb-8 max-w-[560px] ">{subtitle}</p>
            <button className="btn3 capitalize mx-auto lg:mx-0">
              {btnText}
            </button>
          </motion.div>
          <motion.div
            variants={plateVariants}
            className=""
          >
            <img alt="m" src={image}></img>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
