"use client"

import { UserTypes } from "@/app/(types)/UserTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const CategoryCreatePage = () => {

    const [inputs, setInputs] = useState({title: ""});
    const state = useSelector((state: RootState)=>state.auth);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            setLoading(true);
            if (!inputs.title) {
                setLoading(false);
                return toast.error("Please enter input");
            }
            // const data = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "POST", parameters: `categories/create?token=${state.token}`, inputs: {...inputs, userId: (state.user as UserTypes).id}}) as CategoryType;
            // if (!data.title) {
            //     setLoading(false);
            //     return toast.error("Error");
            // }

            
            const response = await axios.post("/api/categories/add", {
                title: inputs.title,
                token: state.token,
                userId: (state.user as UserTypes).id
            });
            // console.log(response);
            

            if (!response.data.status) {
                setLoading(false);
                return toast.error("Error");  
            }

            
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="text-center mt-5 text-4xl mb-5">Create Blog Page</h1>
            <form onSubmit={handleSubmit} method="post" className="space-y-4 mt-7">
                <div className="flex">
                    <Label className="w-1/4">Title</Label>
                    <Input className="w-3/4" onChange={(e)=>setInputs({...inputs, title: e.target.value})} value={inputs.title}/>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="mt-5" disabled={loading}>
                        {loading ? (
                            <div className="flex space-x-1 items-center justify-center">
                                <Loader2Icon className="animate-spin" />
                            </div>
                        ) : (
                            <div>Create</div>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CategoryCreatePage;