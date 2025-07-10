// import icons
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaDiscord,
} from "react-icons/fa";
// import images
import AboutImg from "../assets/img/about/a3.png";
import ModelWhiteImg from "../assets/img/model-white.png";

import jImg from "../assets/img/team/j1.png";
import Avatar1 from "../assets/img/testimonial/avatar1.png";
import Avatar2 from "../assets/img/testimonial/avatar2.png";
import Avatar3 from "../assets/img/testimonial/avatar3.png";



export const navData = [
  {id:1, href: "/jewelry", name: "Jewlry" },
  {id:2, href: "/allproducts", name: "products" },
  {id:3, href: "/gifts", name: "Gifts" },
];
export const gifts = [
   {
    title: "GIFTS $100 AND UNDER",
  
    image: require("../assets/img/Gift/image 29.png"),
  },

 {
    title: "GIFTS $200  -  $300",
  
    image: require("../assets/img/Gift/image 29(3).png"),
  },
 {
    title: "GIFTS $300 AND MORE",
   
    image: require("../assets/img/Gift/image 29(2).png"),
  },
 {
    title: "GIFTS FOR HIM",
    pric:200,
    image: require("../assets/img/Gift/image 29(1).png"),
  },
 {
    title: "GIFTS FOR HER",
  
    image: require("../assets/img/Gift/image 28.png"),
  },
  {
    title: "GIFTS FOR THEM",
  
    image: require("../assets/img/Gift/image 27.png"),
  },
];
export const heroData = {
  pretitle: "Nothing brings together like",
  title: "Jewelry For You",
  subtitle:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ",
  btnText: "Find out more",
};

export const aboutData = {
  pretitle: "our story",
  title: "who we are",
  subtitle:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet consequatur, quasi minima molestiae ex exercitationem culpa quisquam architecto quaerat, iusto dolores labore, sapiente magni rem commodi aperiam ad dolorem neque ducimus. Placeat vel non quod quis pariatur a aperiam, aliquam adipisci voluptatum voluptatem sit cupiditate dolore natus beatae earum omnis.",
  btnText: "find out more",
  image: AboutImg,
};

export const menuData = {
  title: "delicious flavour of autumn",
  subtitle: "view all menu for tasty meal today",
  modelImg: ModelWhiteImg,
  btnText: "view complete menu",
};

export const teamData = {
  pretitle: "jewelry stand neck",
  title: "Beautiful and luxury necklace",
  sub1: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci repudiandae enim ratione corrupti voluptatum suscipit distinctio dolor.",
  sub2: "Sequi exercitationem quae deserunt reiciendis nesciunt perferendis atque quisquam, odit facere! Minima esse reiciendis, magnam fugiat totam maxime consequatur perspiciatis voluptas consequuntur.",
  name: "maryem mostafa",
  occupation: "executive jewelry",
  jImg: jImg,
};

export const testimonialData = {
  title: "what client's say ",
  subtitle: "1500+ statisfied clients",
  modelImg: ModelWhiteImg,
  slider: [
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas ipsum eius voluptatibus. Quod ipsum ullam id facere a beatae incidunt eaque, veritatis architecto cum perferendis debitis tempora.",
      image: Avatar1,
      name: "Rick Thompson",
      occupation: "CEO of Delightful",
    },
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas ipsum eius voluptatibus. Quod ipsum ullam id facere a beatae incidunt eaque, veritatis architecto cum perferendis debitis tempora.",
      image: Avatar2,
      name: "John Doe",
      occupation: "CEO of Delightful",
    },
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas ipsum eius voluptatibus. Quod ipsum ullam id facere a beatae incidunt eaque, veritatis architecto cum perferendis debitis tempora.",
      image: Avatar3,
      name: "Henry A.",
      occupation: "CEO of Delightful",
    },
  ],
};

export const footerData = {
  social: {
    title: "social network",
    icons: [
      { id: 1, href: "/", icon: <FaYoutube /> },
      { id: 2, href: "/", icon: <FaFacebookF /> },
      { id: 3, href: "/", icon: <FaInstagram /> },
      { id: 4, href: "/", icon: <FaPinterestP /> },
      { id: 5, href: "/", icon: <FaDiscord /> },
     
    ],
  },
};
export const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Services", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Affiliate Program", href: "#" },
    ],
  },
  {
    title: "Get Help",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Order Status", href: "#" },
      { label: "Payment Options", href: "#" },
    ],
  },
  {
    title: "Online Shop",
    links: [
      { label: "Watch", href: "#" },
      { label: "Jewelry", href: "#" },
      { label: "Shoes", href: "#" },
      { label: "Dress", href: "#" },
    ],
  },
];


 

