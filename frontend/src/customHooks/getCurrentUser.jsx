import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setAuthChecked, setOtherUsers, setSelectedUser, setUserData } from "../redux/userSlice"
import { clearAuthToken, getAuthConfig, getAuthToken } from "../utils/auth"
import { clearStoredSelectedUserId } from "../utils/selectedUser"

const getCurrentUser=()=>{
    let dispatch=useDispatch()
    useEffect(()=>{
        const fetchUser=async ()=>{
            if(!getAuthToken()){
                dispatch(setUserData(null))
                dispatch(setOtherUsers(null))
                dispatch(setSelectedUser(null))
                clearStoredSelectedUserId()
                dispatch(setAuthChecked(true))
                return
            }

            try {
                let result=await axios.get(`${serverUrl}/api/user/current`,getAuthConfig())
                dispatch(setUserData(result.data))
            } catch (error) {
                if(error?.response?.status===401){
                    clearAuthToken()
                    dispatch(setUserData(null))
                    dispatch(setOtherUsers(null))
                    dispatch(setSelectedUser(null))
                    clearStoredSelectedUserId()
                }else{
                    console.log(error)
                }
            } finally {
                dispatch(setAuthChecked(true))
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser

