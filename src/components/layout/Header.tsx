"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Label } from "../ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { logoutState } from "@/store/slice";

const Header = () => {
    const state = useSelector((state: RootState)=>state.auth);
    const dispatch = useDispatch();
    return (
        <div className="shadow-sm top-0 bg-gray-800">
            <div className="container items-center justify-between p-4 flex">
                <Link href={"/"} className="text-white text-2xl">Logo</Link>
                <nav className="md:flex space-x-4 text-white">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/blogs"}>Blogs</Link>
                    <Link href={"/categories"}>Categories</Link>
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
                                        <AvatarImage src="/avatar.png" alt="@shadcn" />
                                    </Avatar>
                                    {/* <Label className="text-white">{(state.user as {name: string}).name}</Label> */}
                                    <Label className="text-white">Eren</Label>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={()=>dispatch(logoutState())}>
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