import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginPayload{
    email: string,
    password: string
}
export interface LoginResponse{
    token: string,
    user: object
}

export const loginThunk = createAsyncThunk<LoginResponse, LoginPayload>("auth/loginThunk", async({email, password})=>{
    try {
        // const data = await CommonAPI<LoginResponse>({url: process.env.apiLink as string, method: "ADD", parameters: "auth/login", inputs: {email, password}});
        const res = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_API_LINK}/auth/login` as string, {email, password})
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});