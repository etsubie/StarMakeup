import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth : null
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails : (state,action)=>{
      state.user = action.payload
      console.log("userDetails",action.payload)
    }
  },
})

export const { setUserDetails } = userSlice.actions

export default userSlice.reducer