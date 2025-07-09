import React from 'react';
import About from '../Home/About';
import Menu from '../Home/Menu';
import Team from '../Home/Team';
import Hero from '../Home/Hero';
import Testimonial from '../Home/Testimonial';

import AboutUs from '../Home/AboutUs';
import SliedProducts from '../Home/SliedProducts';
import Section from '../Home/Section';
import CategoryHighlight from '../Home/Hightlights';
import CategoriesList from '../Categories/CategoriesList ';
import Information from '../Home/Information';
import AboutGifts from '../Home/AboutGifts';

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