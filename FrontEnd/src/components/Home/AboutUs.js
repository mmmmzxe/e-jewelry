import React from 'react';
import Imag from '../../assets/img/about/Mask group(1).png';
import Imag2 from '../../assets/img/about/Mask group(2).png';
import Imag3 from '../../assets/img/about/03 1.png';
import Imag4 from '../../assets/img/about/Asset 3@2048x.png';

const AboutUs = () => {
  return (
    <div className="relative">
      <div>
        <div className="absolute bottom-[-150px] right-[-50px] md:bottom-[-250px] md:right-[-100px]">
          <img className="w-[60%] md:w-[85%]" src={Imag3} alt="Background Decoration" />
        </div>
        <div className="absolute bottom-[-120px] right-[-50px] md:bottom-[-200px] md:right-[-100px]">
          <img className="w-[60%] md:w-[85%]" src={Imag4} alt="Background Decoration" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-[90%] justify-center items-center mx-auto my-20 md:my-28">
        <div className="w-full md:w-[35%] mb-10 md:mb-0 md:mr-20 text-center md:text-left">
          <p className="text-sm font-medium text-pink-900">About Us</p>
          <h2 className="text-2xl md:text-4xl font-serif font-bold leading-snug text-gray-800 mt-2">
            WE MAKE SPARKLY<br />MAGIC HAPPEN
          </h2>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque vitae massa sit.
          </p>
          <button className="btn3 mt-4">EXPLORE</button>
        </div>

        <div className="relative flex w-full md:w-[35%] justify-center items-center">
          <div className="w-[60%] md:w-[70%] h-[40%] md:h-[50%] overflow-hidden">
            <img
              src={Imag2}
              alt="Jewelry"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[50%] md:w-[70%] overflow-hidden absolute left-[-50px] top-48 md:left-[-100px] md:top-64">
            <img
              src={Imag}
              alt="Bracelet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-[-150px] left-5 md:top-[-300px] md:left-10">
        <img className="w-[50%] md:w-[85%]" src={Imag3} alt="Background Decoration" />
      </div>
    </div>
  );
};

export default AboutUs;
