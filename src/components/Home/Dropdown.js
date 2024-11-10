import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

import { IoLocationSharp } from 'react-icons/io5';

const Dropdown = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='flex justify-start g items-center w-full'>
      <div className='flex items-center w-full  flex-col justify-around h-full '>
        <motion.div className="w-full  text-black ">
         
          <div className="flex flex-col gap-3">
            {[
              {
                question: "DETAILS",
                icon:<MdOutlineKeyboardDoubleArrowDown/>,
                answer:
                  "  We allow you to indulge in unlimited streaming at your convenience – all at an affordable monthly rate."
              },
              {
                question: "TIPS & WARNINGS",
                icon:<MdOutlineKeyboardDoubleArrowDown/>,
                answer:
                  "The cost of IPTV depends on the subscription plan you choose. Please visit our pricing page for detailed information."
              },
              {
                question: "LOCAL AVAILABILITY",
                answer:
                  "You can watch IPTV on any internet-connected device, .",
                  icon:<IoLocationSharp/>
              },
            
            ].map((item, index) => (
              <div key={index}>
                <button
                  className="flex w-full justify-between  text-left rounded-md focus:outline-none items-start transition-all duration-300 p-2 border-b-2
                  "
                  onClick={() => toggleAccordion(index)}
                >
                  <h6 className=''>{item.question}</h6>
                  <p className=' p-1'>
                    
                     {item.icon}
                   
                        
                   
                  </p>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={activeIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 ">
                    <p className='text-[15px]'>{item.answer}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dropdown;
