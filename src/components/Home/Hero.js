import React from 'react';
import { heroData } from '../Data/data';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../Context/variants';

const Hero = () => {
  const { pretitle, title, subtitle, btnText } = heroData;
  return (
    <section className="pt-[120px] min-h-[990px] bg-hero bg-cover bg-no-repeat bg-center">
      <div className="container min-h-[600px] flex justify-start items-center m-auto">
        <motion.div
          variants={staggerContainer(0.3, 1)}
          initial="hidden"
          whileInView="show"
          className=" text-left  flex flex-col items-start"
        >
          <motion.div
            variants={fadeIn('down', 'tween', 0.2, 1.1)}
            className="text-[24px] text-left  lg:text-[20px]  mb-1"
          >
            <p className=' text-zinc-500 '>{pretitle}</p>
          </motion.div>
          <motion.h1 variants={fadeIn('down', 'tween', 0.3, 1.1)} className="h1 text-black  text-left  mb-5">
            {title}
          </motion.h1>
          <motion.p variants={fadeIn('down', 'tween', 0.4, 1.1)} className="max-w-[540px] text-zinc-400  text-left  mb-2">
            {subtitle}
          </motion.p>
          <motion.div variants={fadeIn('down', 'tween', 0.5, 1.1)}>
            <button className="btn3 items-center flex">{btnText}</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
