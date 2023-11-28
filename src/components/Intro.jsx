import React from 'react';
import Navbar from './Navbar';

function Intro() {
  return (
    <div className="flex items-center justify-center flex-col text-center pt-10">
      <Navbar />
      <h1 className="text-4xl md:text-7xl mb-1 md:mb-3 font-bold">Habit Tracker</h1>
      <p className="text-base md:text-2xl mb-1 font-medium">Visualize and keep track of your habits.</p>
    </div>
  );
}

export default Intro;
