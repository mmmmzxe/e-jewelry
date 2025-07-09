import React from 'react';

export default function AboutGifts() {
  return (
    <div
      className="relative h-[100vh] bg-no-repeat flex flex-col gap-5 justify-start items-start bg-AboutGifts w-full bg-cover bg-center"
    >
      <div className="relative flex flex-col text-left gap-6 my-auto mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-36 2xl:mx-44 justify-center items-start w-full sm:w-3/4 md:w-1/2 lg:w-[40%]">
        <div className="border-b-2 border-stone-400">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] pb-4 md:pb-6 lg:pb-8 text-white">
            Gifts of the season
          </h1>
        </div>
        
        <p className="text-white text-sm sm:text-base">
          This is an About Us page for this conceptual jewelry website, helping viewers become accustomed to Apollonian and its purpose, if it were real.
        </p>
        
        <p className="text-white text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <p className="text-white text-sm sm:text-base">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        
        <p className="text-white text-sm sm:text-base">
          Vel eros donec ac odio tempor orci dapibus ultrices. Mauris vitae ultricies leo integer. <strong>Placerat duis ultricies lacus sed turpis tincidunt id.</strong>
        </p>
        
        <p className="text-white text-sm sm:text-base">
          Augue mauris augue neque gravida in fermentum et.
        </p>
      </div>
    </div>
  );
}
