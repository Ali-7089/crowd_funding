import React from 'react'
import {search , thirdweb} from '../assets'
import {CustomeButton} from './'
import { Link } from 'react-router-dom';

const address = '0x123';
const NavBar = () => {
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
     btnType= "button"
     title = {address? 'create campaign': 'connect'}
     styles= {address? 'bg-[#4acd8d]' : 'bg-sky-500/100'}
     />
    {/* //Link of thirdweb profile */}

    <Link to='/profile' className='h-[50px] w-[50px] bg-[#2e2e32] flex justify-center items-center  rounded-full'>
      <img src={thirdweb} alt="thirdweb" className='h-[60%]'/>
    </Link>
   </div>

 </div>
 </div>
  )
}

export default NavBar