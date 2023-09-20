import React from 'react';
import bg from '../image/bg.gif';

const Welcome = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mb-8 animate-fall">
        <img src={bg} alt="#" className="w-64 h-64" />
      </div>
      <div className="text-center animate-fall">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 ">
          Welcome to the Money Manager App
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-indigo-500">
          Take control of your finances and achieve your financial goals.
        </p>
        <a
          href="/register"
          className="bg-blue-500 hover:bg-white hover:border border-blue-500 hover:text-blue-500 text-white font-semibold py-2 px-6 rounded-full text-lg md:text-xl lg:text-2xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Welcome;

