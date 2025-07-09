require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

// TODO: Paste your categories and products arrays here, or require them from your data.js
// Example:
// const { categories, products } = require('../src/components/Data/data.js');

const categories = [
  { title: 'Necklaces', image: 'https://i.postimg.cc/XYb8kQ7c/Rectangle-38.png' },
  { title: 'Earrings', image: 'https://i.postimg.cc/XYb8kQ7c/Rectangle-38-1.png' },
  { title: 'Bracelets', image: 'https://i.postimg.cc/XYb8kQ7c/Rectangle-38-2.png' },
  { title: 'Rings', image: 'https://i.postimg.cc/XYb8kQ7c/Rectangle-38-3.png' },
  { title: 'Charms', image: 'https://i.postimg.cc/XYb8kQ7c/Rectangle-24.png' },
];

 const products = [
    {
      id: 1,
      name: "Vivamus vitae",
      rating: 4.3,
      description:
        "Vivamus vitae neque accumsan, ultrices nisl et, viverra magna. Fusce nec maximus sem.",
      price: 199,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image:"https://i.postimg.cc/NfB5TSDx/1.png",
      images: [
        "https://i.postimg.cc/fLvhh2dw/1a.png",
        "https://i.postimg.cc/X7LXgLD6/1aa.png"
      ],
    },
    {
      id: 2,
      name: "Fusce sit amet ipsum",
      rating: 4.2,
      description:
        "Maecenas fermentum urna egestas urna ullamcorper sodales. Sed a enim imperdiet, tempus massa a, iaculis tellus.",
      price: 229,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/TPDRBJQw/3.png",
      images: [
       "https://i.postimg.cc/Qxdjj3Sv/3a.png",
      "https://i.postimg.cc/W14zYZQF/3aa.png"
      ],
    },
    {
      id: 3,
      name: "Etiam volutpat aliquam",
      rating: 3.2,
      description:
        "Praesent et orci vel nunc interdum aliquet et non dolor. Etiam eget finibus justo",
      price: 99,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/ht3jkjBC/4.png",
      images: [
       "https://i.postimg.cc/tgZTpjR9/4a.png",
        "https://i.postimg.cc/1zkzzj4w/4aa.png"
      ],
    },
  
    {
      id: 4,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/76SZJnTc/5.png",
      images: [
        "https://i.postimg.cc/qq0Ms6s7/5a.png",
       "https://i.postimg.cc/nrkV0V2G/5aa.png"
      ],
    },
    {
      id: 5,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/8kBC1wGf/6.png",
      images: [
        "https://i.postimg.cc/BQSntDZY/6a.png",
        "https://i.postimg.cc/kXTXS4Bn/6aa.png"
      ],
    },
    {
      id: 6,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/8zskmS6L/8.png",
      images: [
      "https://i.postimg.cc/RZ8SPD7y/8a.png",
       "https://i.postimg.cc/L5H2YKSY/8aa.png"
      ],
    },
    {
      id: 7,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/NM8QjG3v/9.png",
      images: [
        "https://i.postimg.cc/NFpYRJGN/9a.png",
        "https://i.postimg.cc/P5H9dztJ/9aa.png"
      ],
    },
    {
      id: 8,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/2jwzp6d4/10.png",
      images: [
        "https://i.postimg.cc/gktmJTTj/10a.png",
        "https://i.postimg.cc/0yLvGJxq/10aa.png"
      ],
    },
    {
      id: 9,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/6p7wGfk0/11.png",
      images: ["https://i.postimg.cc/C12sdYkJ/11a.png"],
    },
    {
      id: 10,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/wBLpwTTR/12.png",
      images: ["https://i.postimg.cc/BvMg92vr/12a.png"],
    },
    {
      id: 11,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/43J5SWXv/13.png",
      images: ["https://i.postimg.cc/w385cVWm/13a.png"],
    },
    {
      id: 12,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/W3z72tFh/14.png",
      images: [
       "https://i.postimg.cc/tJVtxfzb/14a.png",
       "https://i.postimg.cc/rydvjwnV/14aa.png"
      ]
    },
    {
      id: 13,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image:"https://i.postimg.cc/C1R6cc4P/15.png",
      images: [
        "https://i.postimg.cc/TYgB8HvB/15a.png",
       "https://i.postimg.cc/sftbNCqp/15aa.png"
      ],
    },
    {
      id: 14,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image: "https://i.postimg.cc/Cx4t5B1N/16.png",
      images: [
        "https://i.postimg.cc/k5pTRxdx/16a.png",
       "https://i.postimg.cc/xdTZzfNS/16aa.png"
      ],
    },
    {
      id: 15,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/s26NPk5G/17.png",
      images: ["https://i.postimg.cc/mZF5M6kh/17a.png"],
    },
    {
      id: 16,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/zvW2r36T/18a.png",
      images: ["https://i.postimg.cc/50DKT87x/18aa.png"],
    },
    {
      id: 17,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/kgw1901Y/19.png",
      images: ["https://i.postimg.cc/28Q99b4D/19a.png"],
    },
    {
      id: 18,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/HsDPt48z/20.png",
      images: [
        "https://i.postimg.cc/13yCkmHN/20a.png",
        "https://i.postimg.cc/Pqx6qS0X/20aa.png",
        "https://i.postimg.cc/vBx3rcQC/20aaa.png"
      ],
    },
    {
      id: 19,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/KjnfWw3N/21.png",
      images: [
       "https://i.postimg.cc/x1sRBK8W/21a.png",
  "https://i.postimg.cc/66RMT2bv/21aa.png"    ],
    },
    {
      id: 20,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/4yCwBsyy/22.png",
      images: ["https://i.postimg.cc/yYynyqH6/22a.png"],
    },
    {
      id: 21,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
      image: "https://i.postimg.cc/Fs4DSrwn/23.png",
      images: [
      "https://i.postimg.cc/7LdNZwg9/23a.png",
        "https://i.postimg.cc/T320kkdV/23aa.png",
        "https://i.postimg.cc/mrtw4tFh/23aaa.png"
      ],
    },
    {
      id: 22,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Diamond",
      },
  
      image:"https://i.postimg.cc/59wmfcj5/24.png",
      images: ["https://i.postimg.cc/T1Xqn0NW/24a.png"],
    },
    {
      id: 23,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/6qLVcZFb/25.png",
      images: ["https://i.postimg.cc/5NbS0PFh/25a.png"],
    },
    {
      id: 24,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/hvfzzdc7/n2.jpg",
      images:["https://i.postimg.cc/1X2gp337/n2a.jpg"],
    },
    {
      id: 25,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/G35s0qxP/n3.jpg",
      images: ["https://i.postimg.cc/nc99nB3y/n3a.jpg"],
    },
    {
      id: 26,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/pLNhrr7p/n4.jpg",
      images: ["https://i.postimg.cc/YC14WkK8/n4a.jpg"],
    },
  
    {
      id: 27,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/8CN7d3TG/n5.jpg",
      images: [
        "https://i.postimg.cc/Dz68xgzX/n5a.jpg",
        "https://i.postimg.cc/gJ0rQZwB/n5aa.jpg"
      ],
    },
    {
      id: 28,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/cH56SLw1/n6.jpg",
      images: ["https://i.postimg.cc/J0D04C5N/n6a.jpg"],
    },
    {
      id: 29,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/SRBsn1gw/n7.jpg",
      images: [
        "https://i.postimg.cc/fRjLbKmr/n7a.jpg",
       "https://i.postimg.cc/zD6323q0/n7aa.jpg"
      ],
    },
  
    {
      id: 30,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/J4X0fmnm/n8.jpg",
      images: [
        "https://i.postimg.cc/YCw0kVGF/n8a.jpg",
        "https://i.postimg.cc/HLYL8yts/n8aa.jpg"
      ],
    },
    {
      id: 31,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Necklaces",
      },
  
      image: "https://i.postimg.cc/fb8RcRH7/n9.jpg",
      images: ["https://i.postimg.cc/tT7C2GfK/n9a.jpg"],
    },
    {
      id: 32,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Charms",
      },
  
      image: "https://i.postimg.cc/VsRDjQ1f/c1.jpg",
      images: ["https://i.postimg.cc/jdSvcgdz/c1a.jpg"],
    },
    {
      id: 33,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Charms",
      },
  
      image: "https://i.postimg.cc/WbY8HGhx/c2.jpg",
      images: ["https://i.postimg.cc/8zF4Q7vc/c2a.jpg"],
    },
    {
      id: 34,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Charms",
      },
  
      image: "https://i.postimg.cc/52Z3xf53/c3.jpg",
      images: ["https://i.postimg.cc/HLXtnFBC/c3a.jpg"],
    },
  
    {
      id: 35,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Bracelets",
      },
  
      image:"https://i.postimg.cc/sDmqDG1J/b1.jpg",
      images: [
        "https://i.postimg.cc/vZSK5Rrg/b1a.jpg",
        "https://i.postimg.cc/KYkHN9f9/b1aa.jpg"
      ],
    },
    {
      id: 36,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Bracelets",
      },
  
      image: "https://i.postimg.cc/bv7FFQFq/b2.jpg",
      images: [
        "https://i.postimg.cc/pLd79VFM/b2a.jpg",
        "https://i.postimg.cc/sX50Fvt7/b2aa.jpg"
      ],
    },
    {
      id: 37,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Bracelets",
      },
  
      image: "https://i.postimg.cc/d3vNJJYX/b3.jpg",
      images: [
        "https://i.postimg.cc/90p8MsXf/b3a.jpg",
        "https://i.postimg.cc/yY1p56n3/b3aa.jpg"
      ],
    },
    {
      id: 38,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Bracelets",
      },
  
      image: "https://i.postimg.cc/T2qHC5jX/b4.jpg",
      images: [
        "https://i.postimg.cc/Wb5YPRfW/b4a.jpg",
      "https://i.postimg.cc/qvgbJmPk/b4aa.jpg"
      ],
    },
    {
      id: 39,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Bracelets",
      },
  
      image: "https://i.postimg.cc/t4frY3bF/b5.jpg",
      images: [
        "https://i.postimg.cc/Zqdw3WY2/b5a.jpg",
        "https://i.postimg.cc/1t1JKyft/b5aa.jpg"
      ],
    },
    {
      id: 40,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Bracelets",
      },
  
      image: "https://i.postimg.cc/FRbGWwLx/b6.jpg",
      images: [
        "https://i.postimg.cc/WzX8jrSF/b6a.jpg",
       "https://i.postimg.cc/0j8nLZG1/b6aa.jpg"
      ],
    },
    {
      id: 41,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Rings",
      },
  
      image: "https://i.postimg.cc/9MSXkNHr/r1.jpg",
      images: [
        "https://i.postimg.cc/brtYfHqL/r1a.jpg",
       "https://i.postimg.cc/pyMWWhTv/r1aa.jpg"
      ],
    },
    {
      id: 42,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Rings",
      },
  
      image: "https://i.postimg.cc/28nv4nn4/r2.jpg",
      images: [
        "https://i.postimg.cc/1RnD3kt7/r2a.jpg",
        "https://i.postimg.cc/CM3kBcnh/r2aa.jpg"
      ],
    },
    {
      id: 43,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Rings",
      },
  
      image: "https://i.postimg.cc/pLxjkyB3/r3.jpg",
      images: [
        "https://i.postimg.cc/QMdTGPwb/r3a.jpg",
        "https://i.postimg.cc/Hk2yNHZn/r3aa.jpg"
      ],
    },
    {
      id: 44,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Rings",
      },
  
      image: "https://i.postimg.cc/XqdZk0BV/r4.jpg",
      images: [
        "https://i.postimg.cc/TPNWR0XX/r4a.jpg",
        "https://i.postimg.cc/V63rtN6G/r4aa.jpg"
      ],
    },
    {
      id: 45,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Rings",
      },
  
      image: "https://i.postimg.cc/SsXYj9yY/r5.jpg",
      images: [
        "https://i.postimg.cc/RCHnBwsj/r5a.jpg",
        "https://i.postimg.cc/L6Fg6hGh/r5aa.jpg"
      ],
    },
    {
      id: 46,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Rings",
      },
  
      image: "https://i.postimg.cc/dVq7rpsY/r6.jpg",
      images: [
        "https://i.postimg.cc/SNL2Xkpd/r6a.jpg",
        "https://i.postimg.cc/NjpK4DFr/r6aa.jpg"
      ],
    },
    {
      id: 47,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Earrings",
      },
  
      image: "https://i.postimg.cc/yd70dxDF/e4.jpg",
      images: [
        "https://i.postimg.cc/7hWzmNmV/e4a.jpg",
       "https://i.postimg.cc/B6NH13FR/e4aa.jpg"
      ],
    },
    {
      id: 48,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Earrings",
      },
  
      image: "https://i.postimg.cc/rmTNrgPR/e1.jpg",
      images: [
        "https://i.postimg.cc/kGXNjG9n/e1a.jpg",
        "https://i.postimg.cc/50mqqvh7/e1aa.jpg"
      ],
    },
    {
      id: 49,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Earrings",
      },
  
      image: "https://i.postimg.cc/cC9RPW4f/e2.jpg",
      images: [
        "https://i.postimg.cc/5NyqLXng/e2a.jpg",
        "https://i.postimg.cc/qvCsD9fC/e2aa.jpg"
      ],
    },
    {
      id: 50,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Earrings",
      },
  
      image: "https://i.postimg.cc/tR2Ns3t7/e3.jpg",
      images: [
        "https://i.postimg.cc/jd16XR1b/e3a.jpg",
        "https://i.postimg.cc/43kzDBZ2/e3aa.jpg"
      ],
    },
    {
      id: 51,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Earrings",
      },
  
      image: "https://i.postimg.cc/fyLXcPjy/e5.jpg",
      images: [
        "https://i.postimg.cc/qvnKxyns/e5aa.jpg",
        
      ],
    },
    {
      id: 52,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Earrings",
      },
  
      image: "https://i.postimg.cc/FFW0r9NL/e6.jpg",
      images: [
        "https://i.postimg.cc/RVWKqjZb/e6a.jpg",
        "https://i.postimg.cc/DyRsGBWf/e6aa.jpg"
      ],
    },
    {
      id: 53,
      name: "Ultrices nisl",
      rating: 4.5,
      description:
        "Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
      price: 85,
      oldprice: 90,
      category: {
        title: "Earrings",
      },
  
      image: "https://i.postimg.cc/9fh780tv/e7.jpg",
      images: ["https://i.postimg.cc/mDd1gwfs/e7a.jpg"],
    },
  ];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Seed categories
  await Category.deleteMany();
  await Category.insertMany(categories);

  
  // Seed products
  await Product.deleteMany();
  await Product.insertMany(products);

  console.log('Database seeded!');
  process.exit();
}

seed(); 