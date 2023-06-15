import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { logo } from '../assets'

const Icon = ({styles , imgUrl,name ,isActive})=>(
        <div >

        </div>
)

const SideBar = () => {
  return (
    <div className='flex justify-between items-center flex-col h-[93vh] top-5 sticky'>
        <Link to='/'>
            <Icon styles={'h-[56px] w-[56px] bg-[#2c2f32]'} imgUrl={logo} />
        </Link>
    </div>
  )
}

export default SideBar