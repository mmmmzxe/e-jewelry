import React from 'react';
import {navData} from '../../Data/data'

import Search from '../../components/Search/Search';

import { IoLocationSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className=' h-full'>
      <ul className='h-full flex md:flex-row flex-col justify-center items-center gap-6 '>

        <li className='md:hidden'>
        <Search/>
        </li>
      
        {navData.map((item)=>{
          return(
            <li key={item.id}>
              <Link className=' uppercase text-sm  md:text-black text-white  transition-all duration-300' to={item.href}>{item.name}</Link>
            </li>
           
          )

          
        })}
        <li className='md:hidden'>  <IoLocationSharp className='md:text-black text-white'/></li>
      </ul>
  
    </nav>
  );
};

export default Nav;
