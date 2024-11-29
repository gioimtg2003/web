import React from 'react'
import home_icon from './home.jpg'
import img1 from './img1.jpg'
import img2 from './img2.jpg'

const Sidebar = () => {
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img src={houseIcon} alt="Ikona Home" className='w-6 h-6' />
          <p className='font-bold'>Home</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
