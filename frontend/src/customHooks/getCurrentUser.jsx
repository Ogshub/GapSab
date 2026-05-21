import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setOtherUsers, setSelectedUser, setUserData } from "../redux/userSlice"

const getCurrentUser=()=>{
    let dispatch=useDispatch()
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                if(error?.response?.status===401){
                    dispatch(setUserData(null))
                    dispatch(setOtherUsers(null))
                    dispatch(setSelectedUser(null))
                    return
                }
                console.log(error)
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser

