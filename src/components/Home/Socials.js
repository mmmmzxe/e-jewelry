
import React from 'react';
import { footerData } from '../Data/data';

const Socials = () => {
  return (
    <div className="flex gap-x-[10px]">
      {footerData.social.icons.map((item, id) => (
        <div key={id} className="flex items-center justify-center">
          {item.href ? (
            <a
              href={item.href}
              className=" w-[35px] text-bg h-[35px] flex items-center justify-center text-sm transition-all "
            >
              {item.icon}
            </a>
          ) : (
            <div className="w-[35px] h-[35px] flex items-center justify-center">
              {item.icon}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Socials;
