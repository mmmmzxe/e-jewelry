import React from 'react';
import Imag from '../../assets/img/about/1.jpg';
import Imag2 from '../../assets/img/about/2 (2).jpg';

export default function Information() {
  return (
    <div className='container mx-auto grid gap-10 pt-36 px-4 py-8'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
        <div className='flex flex-col gap-4 md:gap-10 text-left md:w-1/2'>
          <p className='text-sm text-gray-500'>ARTICLE • OCTOBER 2022</p>
          <h1 className='text-2xl md:text-3xl font-bold'>During the golden hour.</h1>
          <p className='text-base md:text-lg'>
            On this conceptual jewelry website, this is an article discussing whom this brand is currently collaborating with. I chose to introduce this element as part of both the aesthetic makeup and the “official” quality of Apollonian, whose extras are inspired by Tiffany & Co.’s Stories and Cartier’s Discover sections.
          </p>
          <p className='text-sm md:text-base'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin sed libero enim sed. Dignissim enim sit amet venenatis urna cursus. Odio aenean sed adipiscing diam donec. Ut consequat semper viverra nam libero justo laoreet sit amet. Est lorem ipsum dolor sit amet consectetur adipiscing. Tempor orci dapibus ultrices in iaculis nunc.<span className='text-pink-700'> Tristique sollicitudin nibh sit amet commodo nulla.</span>
          </p>
          <p className='text-sm md:text-base'>
            At ultrices mi tempus imperdiet nulla malesuada. Varius duis at consectetur lorem donec. Cursus euismod quis viverra nibh cras pulvinar. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Nibh tortor id aliquet lectus proin nibh. Aenean sed adipiscing diam donec adipiscing. Eros in cursus turpis massa tincidunt dui. Sed odio morbi quis commodo. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Tempor id eu nisl nunc mi ipsum faucibus vitae. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam.
          </p>
        </div>
        <div className='w-full md:w-1/2 flex justify-end'>
          <img src={Imag} alt='article' className='object-cover w-full h-auto max-w-xs md:max-w-md' />
        </div>
      </div>

      <div className='flex flex-col justify-center items-center text-center py-8  rounded-lg'>
        <h2 className='text-lg md:text-xl font-semibold italic'>
          “This is a quote by the collaborator discussed in this article.”
        </h2>
       <div className=' text-right flex justify-end items-end w-1/3 italic'>
       <p className='text-sm text-gray-600 mt-2 text-right'>— John Fern on his plans for the brand</p>
       </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
      <div className='w-full md:w-1/2 flex justify-start'>
          <img src={Imag2} alt='collaborator' className='object-cover w-full h-auto max-w-xs md:max-w-md' />
        </div>
        <div className='flex flex-col gap-4 md:gap-10 text-left md:w-1/2'>
          <p className='text-base md:text-lg'>
          Cursus euismod quis viverra nibh. Feugiat in ante metus dictum at tempor commodo. Purus non enim praesent elementum facilisis leo. Ipsum dolor sit amet consectetur adipiscing. Duis at consectetur lorem donec massa sapien.<span className='text-pink-700'> Quam vulputate dignissim suspendisse in est ante in nibh mauris. </span>Sit amet est placerat in egestas erat imperdiet. Maecenas volutpat blandit aliquam etiam erat.

          </p>
          <p className='text-sm md:text-base'>
          Morbi tempus iaculis urna id. Quam elementum pulvinar etiam non quam lacus. Lacus vestibulum sed arcu non odio euismod.</p>
        </div>
        
      </div>
    </div>
  );
}
