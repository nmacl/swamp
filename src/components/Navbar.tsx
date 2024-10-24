import SignUp from './SignUp';
import { useState } from 'react';

const Navbar = () => {

  return (
    <nav className="bg-gunmetal p-4">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto px-64">
        <div className="flex items-center space-x-4 ml-auto">
          <button className="text-xl p-1 bg-raspberryRose rounded-lg px-3 text-white">
            +
          </button>
          <button className="bg-amaranthPurple font-semibold text-white px-4 py-2 rounded-lg">
            Manage
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
