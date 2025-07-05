"use client";
import { UserTypes } from "@/app/(types)/UserTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store";
import { editingUserState } from "@/store/slice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
    const state = useSelector((s: RootState)=>s.auth);
    const [inputs, setInputs] = useState({name: "", email: "", password: ""});
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", inputs.name);
            formData.append("email", inputs.email);
            formData.append("password", inputs.password);
            if (profilePhoto) {
                formData.append("profilePhoto", profilePhoto);
            }
            
            const res = await axios.post((process.env.NEXT_PUBLIC_API_LINK as string)+"/auth/editprofile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            if (!res.data.status) {
                return alert("Error");
            }
            dispatch(editingUserState({name: inputs.name, email: inputs.email, profilePhoto: res.data.user.profilePhoto}));
            
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        setInputs({...inputs, email: (state.user as UserTypes).email, name: (state.user as UserTypes).name});
    }, [state.user]);
 
    return (
        <div className="mt-7">
            <h1 className="text-center w-full text-4xl">Profile Edit Page</h1>

            <div className="flex mt-15">
                <div className="w-1/4">
                    {
                        (state.user as UserTypes).profilePhoto ? 
                        <Image src={(state.user as UserTypes).profilePhoto!} alt="profilePhoto" className="rounded-full border-2 p-1" width={250} height={250}/>
                        :
                        <Image src={`/avatar.png`} alt="deneme" className="rounded-full border-2 p-1" width={250} height={250}/>
                    }
                </div>
                <div className="w-3/4">
                    <form onSubmit={handleSubmit} method="post" className="space-y-4">
                        <div className="flex">
                            <Label className="w-1/4">Name</Label>
                            <Input type="text" className="w-3/4" onChange={(e)=>setInputs({...inputs, name: e.target.value})} value={inputs.name} required/>
                        </div>
                        <div className="flex">
                            <Label className="w-1/4">Email</Label>
                            <Input type="email" className="w-3/4" onChange={(e)=>setInputs({...inputs, email: e.target.value})} value={inputs.email} required/>
                        </div>
                        <div className="flex">
                            <Label className="w-1/4">Password</Label>
                            <Input type="password" className="w-3/4" onChange={(e)=>setInputs({...inputs, password: e.target.value})} value={inputs.password}/>
                        </div>
                        <div className="flex">
                            <Label className="w-1/4">Profile Photo</Label>
                            <Input type="file" className="w-3/4" onChange={(e) => {if (e.target.files) {setProfilePhoto(e.target.files[0]);}}}/>
                        </div>
                        <div className="flex justify-end">
                            <Button className="w-40" variant={"default"}>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
            <p className="text-gray-400 mt-5 text-center">If You wanna not change password or profile photo, You can leave empty :)</p>
        </div>
    );
}

export default Profile;