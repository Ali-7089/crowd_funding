import React from 'react'

const CustomeButton = ({styles ,title , btnType}) => {
  return (
   <button className={`${styles} px-[15px] py-[8px] text-[#c5c3c3] rounded-[100px]`}>
    {title}
   </button>
  )
}

export default CustomeButton