import React from 'react'

const CustomeButton = ({styles ,title , btnType}) => {
  return (
   <button className={`${styles} px-[15px] py-[8px] text-white rounded-[10px]`}>
    {title}
   </button>
  )
}

export default CustomeButton