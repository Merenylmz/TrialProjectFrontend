import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "./authThunk";
import Cookies from "js-cookie";
import { UserTypes } from "@/app/(types)/UserTypes";

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
            state.token = ""
            state.user = {}
            state.isAuth = false

            Cookies.remove("token");
            Cookies.remove("isAuth");
        },
        editingUserState: (state, action)=>{
            const {name, email, profilePhoto} = action.payload;
            (state.user as UserTypes).name = name;
            (state.user as UserTypes).email = email;
            (state.user as UserTypes).profilePhoto = profilePhoto;
            
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

export const {logoutState, editingUserState} = authSlice.actions;

export default authSlice.reducer;