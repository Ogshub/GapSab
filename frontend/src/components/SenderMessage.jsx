import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
import { getImageUrl } from '../main'
import { RiDeleteBin6Line } from "react-icons/ri";
function SenderMessage({image,message,onDelete,isDeleting}) {
  let scroll = useRef()
  let {userData}=useSelector(state=>state.user)
  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  },[message,image])
  const handleImageScroll=()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className='flex items-start gap-[10px]' >
     
      <div className='relative ml-auto group'>
      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className='absolute -left-[44px] top-[10px] w-[34px] h-[34px] rounded-full bg-white text-[#1797c2] shadow-md flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition disabled:cursor-not-allowed disabled:opacity-60'
        title='Delete message'
      >
        <RiDeleteBin6Line className='w-[18px] h-[18px]' />
      </button>
      <div ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px]  bg-[rgb(23,151,194)] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
    {image &&  <img src={getImageUrl(image)} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll}/>}
   {message && <span >{message}</span>}
   {isDeleting && <span className='text-[12px] text-slate-200'>Deleting...</span>}
   </div>
   </div>
   <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg ' >
     <img src={getImageUrl(userData?.image) || dp} alt="" className='w-full h-full object-cover' onError={(e) => { e.target.src = dp; }}/>
     </div>
    </div>
  )
}

export default SenderMessage
