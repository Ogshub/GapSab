import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setSelectedUser, setUserData } from "../redux/userSlice"
import { clearAuthToken, getAuthConfig } from "../utils/auth"

const getOtherUsers=()=>{
    let dispatch=useDispatch()
    let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        if(!userData?._id){
            dispatch(setOtherUsers(null))
            return
        }

        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/others`,getAuthConfig())
                dispatch(setOtherUsers(result.data))
            } catch (error) {
                if(error?.response?.status===401){
                    clearAuthToken()
                    dispatch(setOtherUsers(null))
                    dispatch(setSelectedUser(null))
                    dispatch(setUserData(null))
                    return
                }
                console.log(error)
            }
        }
        fetchUser()
    },[userData])
}

export default getOtherUsers
