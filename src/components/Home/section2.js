import React from 'react';

export default function Section2({ bgImage }) {
  return (
    <div
      className="relative h-[90vh] bg-no-repeat flex flex-col gap-6 sm:gap-8 md:gap-10 m-auto justify-center items-center w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-zinc-600 opacity-50"></div>

      <div className="relative flex flex-col text-center gap-4 sm:gap-6 md:gap-8 m-auto justify-center items-center px-4 sm:px-8 md:px-12 lg:px-16 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 z-10">
        <p className="text-white text-sm sm:text-base md:text-lg">FALL RELEASE</p>
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] text-white">the autumn equinox</h1>
        <p className="text-white text-sm sm:text-base md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
