import React from "react"
import image from '../../assets/img/product/Mask group(7).png'
import Imag3 from '../../assets/img/about/03 1.png';

function Section (){
    return (
     <div className=" relative">
 <div className="absolute bottom-[-150px] left-[-50px] md:bottom-[-250px] md:left-[-100px]">
          <img className="w-[60%] md:w-[85%]" src={Imag3} alt="Background Decoration" />
        </div>
        <div className=" " >
<img  alt="Background Decoration" src={image}></img>
        </div>
        <div className="absolute top-[-150px] right-[-50px] md:top-[-250px] md:right-[-100px]">
          <img className="w-[60%] md:w-[85%]" src={Imag3} alt="Background Decoration" />
        </div>
     </div>
    )
}
export default Section