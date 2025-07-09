import React from 'react';
import About from '../Pages/Home/About';
import Menu from '../Pages/Home/Menu';
import Team from '../Pages/Home/Team';
import Hero from '../Pages/Home/Hero';
import Testimonial from '../Pages/Home/Testimonial';

import AboutUs from '../Pages/Home/AboutUs';
import SliedProducts from '../Pages/Home/SliedProducts';
import Section from '../Pages/Home/Section';
import CategoryHighlight from '../Pages/Home/Hightlights';
import CategoriesList from '../Pages/Categories/CategoriesList ';
import Information from '../Pages/Home/Information';
import AboutGifts from '../Pages/Home/AboutGifts';

const Home =()=>{
    return (
        <>
        
            <Hero/>
              <About />
              <CategoriesList/>
      <AboutGifts/>
              <SliedProducts/>
      <Menu /> 
 
      <AboutUs/>
  
      <CategoryHighlight categoryName="Necklaces" />
   
   
    <Information/>
    <CategoryHighlight categoryName="Earrings" />
  
    <Section/>
    <CategoryHighlight categoryName="Bracelets" />
    <CategoryHighlight categoryName="Rings" />
      <Team />
      <Testimonial />
        </>
    )
}
export default Home