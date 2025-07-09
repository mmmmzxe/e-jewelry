import React from 'react';
import {teamData} from '../../Data/data'
import {motion} from 'framer-motion'
import { fadeIn } from '../../Context/variants';

const Team = () => {
  const {pretitle , title , sub1 , sub2 , name , occupation , jImg} =teamData
  return (
    <section className='container relative top-[28px] z-10 lg:top-[50px] '>
      <div className='mx-auto '>
        <div className='flex flex-col lg:flex-row lg:gap-x-[110px] items-center lg:items-start'>
          <motion.div variants={fadeIn('down' , 'tween' , 0.6 , 3.6)} 
          initial='hidden'
          whileInView={'show'}
           className='flex-1 text-center lg:text-left lg:pt-16'>
          <div className='pretitle'>{pretitle}</div>
          <h2 className='h2 capitalize'>{title}</h2>
          <p className='mb-[60px]'>{sub1}</p>
          <p>{sub2}</p>
          <div className='my-[26px]'>
            <div className='text-2xl capitalize font-semibold text-pink-900'>{name}</div>
            <div className='text-[15px] font-semibold capitalize text-gray-200/50'>{occupation}</div>
          </div>
        </motion.div>
<motion.div 
variants={fadeIn('up' , 'tween' , 0.7 , 1.6)} 
initial='hidden'
whileInView={'show'}
 className='flex-1'>
  <img  alt="Background Decoration" src={jImg}></img>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default Team;
