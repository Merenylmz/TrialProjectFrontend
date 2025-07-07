"use client"

import { BlogType } from "@/app/(types)/BlogTypes";
import { CategoryType } from "@/app/(types)/CategoryTypes";
import { UserTypes } from "@/app/(types)/UserTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store";
import CommonAPI from "@/utils/CommonAPI";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BlogCreatePage = () => {

    const [inputs, setInputs] = useState({title: "", description: "", categoryId: "0"});
    const [categories, setCategories] = useState<Array<CategoryType>>();
    const [loading, setLoading] = useState(false);
    const state = useSelector((state: RootState)=>state.auth);
    const router = useRouter();
    
    useEffect(()=>{
        (async()=>{
            const data = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "GET", parameters: "categories"}) as Array<CategoryType>;
            setCategories(data);
        })()
    }, []);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        try {
            if (inputs.categoryId == "0") {
                setLoading(false);
                return toast.error("Please enter category");
            }
            const data = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "POST", parameters: `blogs/create?token=${state.token}`, inputs: {...inputs, userId: (state.user as UserTypes).id}}) as BlogType;
            if (!data.title) {
                setLoading(false);
                return toast.error("Error");
            }

            router.push("/");
            setLoading(false);
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
                <div className="flex">
                    <Label className="w-1/4">Description</Label>
                    <Input className="w-3/4" onChange={(e)=>setInputs({...inputs, description: e.target.value})} value={inputs.description}/>
                </div>
                <div className="flex">
                    <Label className="w-1/4">Category</Label>
                    <select onChange={(e)=>setInputs({...inputs, categoryId: e.target.value})} value={inputs.categoryId} className="border w-3/4 p-2 rounded">
                        <option value="0">Select  Category</option>
                        {categories && categories.map(c=>(
                            <option value={c.id} key={c.id}>{c.title}</option>
                        ))}
                    </select>
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

export default BlogCreatePage;