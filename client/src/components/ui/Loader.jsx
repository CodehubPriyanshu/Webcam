import React from 'react';
import { BsCamera2 } from 'react-icons/bs';

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center animate-pulse">
      <BsCamera2 className="text-indigo-800 h-20 w-20" />
      <h1 className="text-indigo-800 text-xl">Loading...</h1>
    </div>
  );
}

export default Loader;
