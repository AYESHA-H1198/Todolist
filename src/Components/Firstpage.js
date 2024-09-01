// Firstpage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook

const Firstpage = () => {
  const navigate = useNavigate(); // Creating a navigate function

  // Function to handle button clicks and navigate to respective pages
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-[#F4F4F9]'>
      <div className='flex flex-col xl:flex-row gap-5'>
        <div className='flex justify-center items-center'>
          <img src='logo.png' alt='logo' className='w-32 h-32 flex justify-center items-center' />
        </div>
        <div className='text-3xl xl:text-3xl flex justify-center items-center text-[#1D3557] font-bold'>
          Take Control of Your Day
        </div>
      </div>
      <div className='flex justify-center items-center mt-3 text-lg font-semibold text-[#333333] ml-9'>
        <p>Stay focused, stay organized, and get things done</p>
      </div>
      <div className='flex flex-col mt-20 gap-3 items-center justify-center '>
        <div>
          <button
            className='px-5 py-2 border-2 border-[#457B9D] rounded-lg text-[#457B9D] hover:bg-[#3A6F8F] hover:text-white transition-colors'
            onClick={() => handleNavigation('/login')}
          >
            Login
          </button>
        </div>
        <div >
          <button
            className='px-5 py-2 border-2 border-[#457B9D] rounded-lg text-[#457B9D] hover:bg-[#3A6F8F] hover:text-white transition-colors'
            onClick={() => handleNavigation('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Firstpage;
