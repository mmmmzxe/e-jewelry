import React from 'react';
import {navData} from '../Data/data'

import Search from '../Search/Search';

import { IoLocationSharp } from 'react-icons/io5';

const Nav = () => {
  return (
    <nav className=' h-full'>
      <ul className='h-full flex md:flex-row flex-col justify-center items-center gap-6 '>

        <li className='md:hidden'>
        <Search/>
        </li>
      
        {navData.map((item , index)=>{
          return(
            <li key={index}>
              <a className=' uppercase text-sm  md:text-black text-white  transition-all duration-300' href={item.href}>{item.name}</a>
            </li>
           
          )

          
        })}
        <li className='md:hidden'>  <IoLocationSharp className='md:text-black text-white'/></li>
      </ul>
  
    </nav>
  );
};

export default Nav;
