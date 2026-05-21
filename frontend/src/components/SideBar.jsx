import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl, getImageUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearAuthToken, getAuthConfig } from '../utils/auth';
import { clearStoredSelectedUserId, setStoredSelectedUserId } from '../utils/selectedUser';
function SideBar() {
    let {userData,otherUsers,selectedUser,onlineUsers,searchData} = useSelector(state=>state.user)
    let [search,setSearch]=useState(false)
    let [input,setInput]=useState("")
let dispatch=useDispatch()
let navigate=useNavigate()
    const getUserKey = (user, index) => {
        return user?._id || user?.email || user?.userName || `user-${index}`
    }
    const handleLogOut=async ()=>{
        try {
            let result =await axios.get(`${serverUrl}/api/auth/logout`,getAuthConfig())
clearAuthToken()
clearStoredSelectedUserId()
dispatch(setUserData(null))
dispatch(setOtherUsers(null))
dispatch(setSelectedUser(null))
navigate("/login")
        } catch (error) {
            clearAuthToken()
            clearStoredSelectedUserId()
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            dispatch(setSelectedUser(null))
            navigate("/login")
            console.log(error)
        }
    }

    const handlesearch=async ()=>{
        try {
            let result =await axios.get(`${serverUrl}/api/user/search?query=${input}`,getAuthConfig())
            dispatch(setSearchData(result.data))
           
        }
        catch(error){
if(error?.response?.status===401){
clearAuthToken()
dispatch(setUserData(null))
dispatch(setOtherUsers(null))
dispatch(setSelectedUser(null))
navigate("/login")
return
}
console.log(error)
        }
    }

    useEffect(()=>{
        if(input){
            handlesearch()
        }

    },[input])
  return (
    <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-200  relative ${!selectedUser?"block":"hidden"}`}>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-[#20c7ff] shadow-gray-500 text-gray-700 cursor-pointer shadow-lg absolute bottom-[20px] left-[20px] z-[50]' onClick={handleLogOut}>
   <BiLogOutCircle className='w-[25px] h-[25px]'/>
</div>
{input.length>0 && <div className='flex absolute top-[250px] bg-[white] w-full h-[500px] overflow-y-auto items-center pt-[20px] flex-col gap-[10px] z-[150] shadow-lg'>
{searchData?.map((user,index)=>(
     <div key={getUserKey(user, index)} className='w-[95%] h-[70px] flex items-center gap-[20px]  px-[10px] hover:bg-[#78cae5] border-b-2 border-gray-400 cursor-pointer' onClick={()=>{
        setStoredSelectedUserId(user._id)
        dispatch(setSelectedUser(user))
        setInput("")
        setSearch(false)
     }
        }>
     <div className='relative rounded-full bg-white  flex justify-center items-center '>
     <div className='w-[60px] h-[60px]   rounded-full overflow-hidden flex justify-center items-center '>
     <img src={getImageUrl(user.image) || dp} alt="" className='w-full h-full object-cover' onError={(e) => { e.target.src = dp; }}/>
     </div>
     {onlineUsers?.includes(user._id) &&
     <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
     </div>
     <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
     </div>
))}
        </div> }

      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px] '>
    <h1 className='text-white font-bold text-[25px]'>GapShap</h1>
   <div className='w-full flex justify-between items-center'>
    <h1 className='text-gray-800 font-bold text-[25px]'>Hii , {userData?.name || "user"}</h1>
    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg' onClick={()=>navigate("/profile")}>
<img src={getImageUrl(userData?.image) || dp} alt="" className='w-full h-full object-cover' onError={(e) => { e.target.src = dp; }}/>
</div>
   </div>
   <div className='w-full  flex items-center gap-[20px] overflow-x-auto py-[18px]'>
    {!search && <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg' onClick={()=>setSearch(true)}>
   <IoIosSearch className='w-[25px] h-[25px]'/>
</div>}

{search && 
    <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative'>
    <IoIosSearch className='w-[25px] h-[25px]'/>
    <input type="text" placeholder='search users...' className='w-full h-full p-[10px] text-[17px] outline-none border-0 ' onChange={(e)=>setInput(e.target.value)} value={input}/>
    <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>setSearch(false)}/>
     
    </form>
    }
{!search && otherUsers?.filter(user => onlineUsers?.includes(user._id)).map((user, index)=>(
    <div key={getUserKey(user, index)} className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center cursor-pointer' onClick={()=>{
      setStoredSelectedUserId(user._id)
      dispatch(setSelectedUser(user))
    }}>
    <div className='w-[60px] h-[60px]   rounded-full overflow-hidden flex justify-center items-center '>
    <img src={getImageUrl(user.image) || dp} alt="" className='w-full h-full object-cover' onError={(e) => { e.target.src = dp; }}/>
    </div>
    <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
    </div>
))}
 
   </div>
      </div>

      <div className='w-full h-[50%] overflow-auto flex flex-col gap-[15px] items-center mt-[20px] pb-[90px]'>
{otherUsers?.map((user,index)=>(
    <div key={getUserKey(user, index)} className='w-[95%] h-[70px] min-h-[70px] flex items-center gap-[20px] px-[15px] shadow-gray-400 bg-white shadow-md rounded-full hover:bg-[#78cae5] cursor-pointer' onClick={()=>{
      setStoredSelectedUserId(user._id)
      dispatch(setSelectedUser(user))
    }}>
    <div className='relative rounded-full shadow-gray-400 bg-white shadow-md flex justify-center items-center'>
    <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center'>
    <img src={getImageUrl(user.image) || dp} alt="" className='w-full h-full object-cover' onError={(e) => { e.target.src = dp; }}/>
    </div>
    {onlineUsers?.includes(user._id) &&
    <span className='w-[10px] h-[10px] rounded-full absolute bottom-[3px] right-[-1px] bg-[#3aff20] shadow-gray-400 shadow-md'></span>}
    </div>
    <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
    </div>
))}
      </div>
    </div>
  )
}

export default SideBar
