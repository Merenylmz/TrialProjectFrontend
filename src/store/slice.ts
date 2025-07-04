import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "./authThunk";

export interface initialStateInterface {
    token: string,
    user: object,
    isAuth: boolean
}
const initialState : initialStateInterface = {
    token: "",
    user: {},
    isAuth: false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{
        logoutState: (state)=>{
            console.log(state);
            
            state.token = ""
            state.user = {}
            state.isAuth = false
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginThunk.fulfilled, (state, action:{payload:{token:string, user: object}})=>{
            state.isAuth = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        });
    }
    
});

export const {logoutState} = authSlice.actions;

export default authSlice.reducer;