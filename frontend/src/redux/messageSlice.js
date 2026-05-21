import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
   name:"message",
   initialState:{
    messages:[]
   },  
   reducers:{
    setMessages:(state,action)=>{
   state.messages=action.payload
    },
    addMessage:(state,action)=>{
      state.messages.push(action.payload)
    },
    removeMessage:(state,action)=>{
      state.messages=state.messages.filter((message)=>message._id!==action.payload)
    }
   }
})

export const {setMessages,addMessage,removeMessage}=messageSlice.actions
export default messageSlice.reducer
