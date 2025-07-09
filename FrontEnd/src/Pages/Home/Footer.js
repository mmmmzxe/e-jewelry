import React from "react";
import Socials from "./Socials";
import { motion } from "framer-motion";
import { fadeIn } from "../../Context/variants";
import { footerLinks } from "../../Data/data";

const Footer = () => {


  return (
    <footer className=" p-3 relative z-20 bg-[#DDD9D7] pt-20">
      <div className="mx-auto container h-full">
        <div className="container">
          <div className="row">
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                variants={fadeIn("down", "tween", 0.1 + index * 0.1, 1)}
                initial="hidden"
                whileInView="show"
                className="footer-col"
              >
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <motion.div
              variants={fadeIn("down", "tween", 0.4, 1)}
              initial="hidden"
              whileInView="show"
              className="footer-col"
            >
              <h4>Follow Us</h4>
              <div className="flex lg:flex-col">
                <Socials />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
