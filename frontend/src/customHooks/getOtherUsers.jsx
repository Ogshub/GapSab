import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setSelectedUser, setUserData } from "../redux/userSlice"
import { clearAuthToken, getAuthConfig } from "../utils/auth"
import { clearStoredSelectedUserId, getStoredSelectedUserId } from "../utils/selectedUser"

const getOtherUsers=()=>{
    let dispatch=useDispatch()
    let {userData,selectedUser}=useSelector(state=>state.user)
    useEffect(()=>{
        if(!userData?._id){
            dispatch(setOtherUsers(null))
            return
        }

        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/others`,getAuthConfig())
                dispatch(setOtherUsers(result.data))

                const storedSelectedUserId = getStoredSelectedUserId()
                if(!storedSelectedUserId) return

                const matchedUser = result.data.find((user)=>user._id===storedSelectedUserId)
                if(matchedUser && selectedUser?._id!==matchedUser._id){
                    dispatch(setSelectedUser(matchedUser))
                    return
                }

                if(!matchedUser){
                    clearStoredSelectedUserId()
                }
            } catch (error) {
                if(error?.response?.status===401){
                    clearAuthToken()
                    dispatch(setOtherUsers(null))
                    dispatch(setSelectedUser(null))
                    dispatch(setUserData(null))
                    clearStoredSelectedUserId()
                    return
                }
                console.log(error)
            }
        }
        fetchUser()
    },[userData,selectedUser])
}

export default getOtherUsers
