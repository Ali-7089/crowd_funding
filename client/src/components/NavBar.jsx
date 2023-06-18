import React, { useState } from 'react'
import { search, thirdweb } from '../assets'
import { CustomeButton } from './'
import { Link, useNavigate } from 'react-router-dom';
import { logo, menu } from '../assets';
import { navlinks } from '../constant';

const address = '0x123';
const NavBar = () => {
  const [isActive, setActive] = useState('dashboard');
  const [toggleDrawer, setToggelDrawer] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
        <div className="lg:flex-1 flex flex-row justify-between max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
          {/* //input for search campaign */}
          <input type="text" placeholder='search for campaign' className='bg-transparent outline-none
      text-white font-normal w-[85%] font-epilogue  px-3'/>

          <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            {/* //image of search */}
            <img src={search} alt="search" className='w-[20px] h-[20px]' />
          </div>
        </div>

        <div className="sm:flex hidden flex-row justify-end gap-4">
          {/* //create customButton */}
          <CustomeButton
            btnType="button"
            title={address ? 'create campaign' : 'connect'}
            styles={address ? 'bg-[#4acd8d]' : 'bg-sky-500/100'}
          />
          {/* //Link of thirdweb profile */}

          <Link to='/profile'>
            <div className='h-[50px] w-[50px] bg-[#2e2e32] flex justify-center items-center  rounded-full'>
              <img src={thirdweb} alt="thirdweb" className='h-[60%]' />
            </div>
          </Link>
        </div>

        {/* Small screen navigation */}
        <div className="sm:hidden flex justify-between items-center relative">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            {/* //image of logo */}
            <img src={logo} alt="logo" className='w-[24px] h-[24px] ' />

          </div>

          {/* design hamburger */}
          <img src={menu}
            alt="menu"
            className='w-[30px] h-[30px] cursor-pointer'
            onClick={() => setToggelDrawer((prev) => !prev)}
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10
           shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'}
            transition-all duration-700`}>
            <ul className="mb-4">
              {/* design icons */}
              {navlinks.map((t) => (
                <li
                  key={t.name}
                  className={`p-4 cursor-pointer ${isActive === t.name ? 'grayscale-0 ' : 'grayscale'} flex`}
                  onClick={() => {
                    setToggelDrawer(false)
                    navigate(t.link);
                    setActive(t.name)
                  }}
                >
                  <img src={t.imgUrl} alt="" />
                  <p className={`ml-10 ${isActive === t.name ? 'text-[#3BC884]' : 'text-[#b8b8b9]'}`}>{t.name}</p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
              {/* desgin custome button */}
              <CustomeButton
                btnType="button"
                title={address ? 'create campaign' : 'connect'}
                styles={address ? 'bg-[#4acd8d]' : 'bg-sky-500/100'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar