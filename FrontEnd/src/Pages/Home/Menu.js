import React from 'react';
import {menuData} from '../../Data/data'
import {motion} from 'framer-motion'
import {fadeIn } from '../../Context/variants'

const Menu = () => {
  const { title , subtitle } =menuData
  return (
    <section className='min-h-[750px] mt-[100px]'>
      <div className='bg-menu h-[750px] w-full max-w-[1800px] absolute -z-0 bg-cover ' >

      </div>
      <motion.div 
      variants={fadeIn('up','tween' , 0.2 , 1.6)}
      initial='hidden'
      whileInView={'show'} className='relative'>
<div className='mx-auto container flex flex-col items-center text-center py-10'>
  <h2 className='h2 capitalize text-pink-900 max-w-[400px] text-center'>{title}</h2>
  <p className='mb-8'>{subtitle}</p>
  
</div>
      </motion.div>
     
    </section>
  )
};

export default Menu;
