"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Label } from "../ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { logoutState } from "@/store/slice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";


const Header = () => {
    const state = useSelector((state: RootState)=>state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        Cookies.remove("token");
        Cookies.remove("isAuth");
    }, []);
    return (
        <div className="shadow-sm top-0 bg-gray-800">
            <div className="container items-center justify-between p-4 flex">
                <Link href={"/"} className="text-white text-2xl">Logo</Link>
                <nav className="md:flex space-x-4 text-white">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/blogs"}>Blogs</Link>
                    <Link href={"/categories"}>Categories</Link>
                    {/* <Button onClick={()=>{
                        Cookies.remove("token");
                        Cookies.remove("isAuth");
                        console.log("Deleted");
                    }}>Delete</Button> */}
                </nav>
                {
                    !state.isAuth ? 
                    <div className="space-x-3">
                        <Link href={"/auth/login"}><Button>Login</Button></Link>
                        <Link href={"/auth/register"}><Button variant={"outline"}>Register</Button></Link>
                    </div> :
                    <div>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex space-x-2 align-top">
                                    <Avatar>
                                        <AvatarImage src={(state.user as {profilePhoto: string}).profilePhoto ? (state.user as {profilePhoto: string}).profilePhoto : "/avatar.png"} alt="@shadcn" />
                                    </Avatar>
                                    <Label className="text-white">{(state.user as {name: string}).name}</Label>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={()=>router.push("/auth/profile")}>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>router.push("/auth/myblogs")}>
                                        My Blogs
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={()=>{
                                    dispatch(logoutState())
                                    router.push("/");
                                }}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;