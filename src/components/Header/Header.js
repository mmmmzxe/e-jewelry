import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


import { staggerContainer, fadeIn } from '../Context/variants';

import FavoritesButton from '../Favorites/FavoritesButton';
import Search from '../Search/Search';
import { IoLocationSharp } from "react-icons/io5";
import Nav from './Nav';
import Cart from '../Cart/Cart';

export const headerVariants = {
  hidden: {
    padding: '20px 0px',
    background: '#fff',
  },
  show: {
    padding: '10px 0px',
    background: '#fff',
    transition: {
      type: 'spring',
    },
  },
};

export const navVariants = {
  hidden: {
    clipPath: 'circle(5.8% at 50% 0px)',
    opacity: 0,
    transition: {
      type: 'spring',
      delay: 0.2,
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    clipPath: 'circle(130% at 50% 0px)',
    transition: {
      type: 'spring',
      stiffness: 80,
     
    },
  },
};

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate={isActive ? 'show' : 'hidden'}
      className="bg-pink-900 fixed  w-full mb-40 flex justify-between items-center z-50"
    >
      <motion.div
        variants={staggerContainer(0.3, 1)}
        initial="hidden"
        animate="show"
        className="mx-auto container border-b-2 border-gray-200 w-full"
      >
        <div className="flex justify-between items-center px-3 relative">
          {/* Menu Toggle Button */}
          <motion.div
            variants={fadeIn('down', 'tween', 1.2, 1.4)}
            onClick={() => setNav(!nav)}
            className={`flex flex-col justify-center md:hidden  items-center w-10 h-10 px-2 cursor-pointer border-2 border-bg rounded-full ${
              nav ? 'gap-y-0' : 'gap-y-2'
            }`}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: nav ? -45 : 0, translateY: nav ? 2 : 0 }}
              className="w-full h-[2px] bg-bg"
            ></motion.div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: nav ? 45 : 0 }}
              className="w-full h-[2px] bg-bg"
            ></motion.div>
          </motion.div>
          <div className=' hidden md:flex gap-2 md:justify-center md:items-center '>
  <IoLocationSharp className='text-black'/>
   <Nav/>
     </div>
          <motion.div
            className="md:ml-40 ml-10"
            variants={fadeIn('down', 'tween', 1.4, 1.4)} >
            <a href="/">
              <h1 className='text-black text-center capitalize'>a p o l l o n i a n</h1>
            </a>
          </motion.div>

     <div className=' hidden md:flex md:justify-center md:items-center '>
     <Search/>
     <Cart/>
     <FavoritesButton/>
   
     </div>
     <div className='flex md:hidden '>
    
     <Cart/>
     <FavoritesButton/>
   
     </div>

          <motion.div
            variants={navVariants}
            initial="hidden"
            animate={nav ? 'show' : 'hidden'}
            className="absolute bg-pink-900 w-[250px] h-[60vh] right-0 lg:left-0 top-[100px] rounded-lg shadow-xl"
          >
 
            <Nav />
            
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;