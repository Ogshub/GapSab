import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"
import { setMessages } from "../redux/messageSlice"
import { clearAuthToken, getAuthConfig } from "../utils/auth"

const getMessage=()=>{
    let dispatch=useDispatch()
    let {userData,selectedUser}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchMessages=async ()=>{
            if(!selectedUser?._id) return
            try {
                let result=await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,getAuthConfig())
                dispatch(setMessages(result.data))
            } catch (error) {
                if(error?.response?.status===401){
                    clearAuthToken()
                    dispatch(setMessages([]))
                    dispatch(setUserData(null))
                    dispatch(setOtherUsers(null))
                    return
                }
                console.log(error)
            }
        }
        fetchMessages()
    },[selectedUser,userData])
}

export default getMessage
