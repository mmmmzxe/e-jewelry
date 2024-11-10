/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Playfair Display',
      secondary: 'Lato',
    },
    container: {
      padding: {
        DEFAULT: '10px',
        // lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '1200px',
      lg: '1024px',
      
    },
    extend: {
      colors: {
        body: '#e5e5e5',
        dark: '#0a0909',
        bg:"#705B4F",
        grey: {
          DEFAULT: '#777876',
          100: '#e4e4e3',
        },
        accent: {
          DEFAULT: '#fe7634',
          
        },
      },
      backgroundImage: {
        pattern: "url('assets/img/body-bg-pattern.png')",
        hero: "url('assets/img/hero/sabrianna-uiKSc7-NM2s-unsplash.jpg')",
        menu: "url('assets/img/menu/bg3.png')",
        section: "url('assets/img/about/13.jpg')",
        AboutGifts:"url('assets/img/about/1.png')",
       
        newsletter: "url('assets/img/newsletter/bg.png')",
        footer: "url('assets/img/footer/bg2.jpg')",
      },
    },
  },
  plugins: [],
};
