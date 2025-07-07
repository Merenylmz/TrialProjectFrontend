"use client";

import { BlogType } from "@/app/(types)/BlogTypes";
import { CategoryType } from "@/app/(types)/CategoryTypes";
import { UserTypes } from "@/app/(types)/UserTypes";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store";
import CommonAPI from "@/utils/CommonAPI";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyBlogsPage = () => {
    const state = useSelector((state: RootState)=>state.auth);
    const [inputs, setInputs] = useState({id: "0", title: "", description: "", categoryId: "0"});
    const closeBtnRef = useRef(null);
    
    const [blogs, setBlogs] = useState<Array<BlogType>>([]);
    const [categories, setCategories] = useState<Array<CategoryType>>();
    useEffect(()=>{
        (async()=>{
            const data = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "GET", parameters: `blogs/user/${(state.user as UserTypes).id}`}) as Array<BlogType>;
            setBlogs(data);
            const datas = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "GET", parameters: "categories"}) as Array<CategoryType>;
            setCategories(datas);
        })()
    }, [state.user, state.token]);

    const editBlog = async(id: number) =>{
        try {
            
            const data = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "EDIT", parameters: `blogs/edit/${id}?token=${state.token}`, inputs: {
                title: inputs.title, 
                description: inputs.description, 
                categoryId: Number(inputs.categoryId), 
                userId: (state.user as UserTypes).id
            }}) as {status: boolean};
            if (!data.status) {
                return toast.error("Error");
            }
            
            const updatedBlogs = blogs.map(blog =>
                blog.id === id
                    ? { ...blog, title: inputs.title, description: inputs.description, categoryId: Number(inputs.categoryId), userId: (state.user as UserTypes).id }
                    : blog
            );
            setBlogs(updatedBlogs);

            if (closeBtnRef.current) {
                (closeBtnRef.current as {click: ()=>void}).click();
            } 
            toast.success("Edited");
        } catch (error) {
            console.log(error);
        }

    }

    const deleteBlog = async(id: number)=>{
        try {
            const data = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "DELETE", parameters: `blogs/delete/${id}?token=${state.token}`}) as {status: boolean, id: number};
            if (!data.status) {
                return toast.error("Error");
            }
            setBlogs(prev => prev.filter(blog => blog.id !== id));
            toast.success("Deleted")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="">
            <div className="flex justify-between align-top mt-7 mb-10">
                <h1 className="text-3xl">My Blogs</h1>
                <div className="flex space-x-2">
                    <Link href={`/blogs/create`}>
                        <Button variant={`outline`}>Create Blog</Button>
                    </Link>
                    <Link href={`/categories/create`}>
                        <Button variant={`outline`}>Create Category</Button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-7">
                {
                    blogs ? blogs.map(b=>(
                        <Card className="w-full" key={b.id}>
                            <CardHeader>
                                <CardTitle>{b.title}</CardTitle>
                                <CardDescription>
                                    {b.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex-col gap-2">
                                <Link className="w-full" href={`/blogs/${b.id}`}>
                                    <Button className="w-full" variant={"ghost"}>Detail</Button>
                                </Link>
                                {/* <Button className="w-full" onClick={()=>editBlog(b.id)}>Edit</Button> */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full" onClick={()=>{
                                            setInputs({...inputs, title: b.title, description: b.description, categoryId: b.categoryId.toString()});
                                        }}>Edit</Button>
                                    </DialogTrigger>
                                    <form>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit Blogs</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your blogs here. Click save when you&apos;re
                                                    done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name-1">Title</Label>
                                                    <Input onChange={(e)=>setInputs({...inputs, title: e.target.value})} value={inputs.title}/>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name-1">Description</Label>
                                                    <Input onChange={(e)=>setInputs({...inputs, description: e.target.value})} value={inputs.description}/>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name-1">Description</Label>
                                                    <select onChange={(e)=>setInputs({...inputs, categoryId: e.target.value})} value={inputs.categoryId} className="border w-full p-2 rounded">
                                                        <option value="0">Select  Category</option>
                                                        {categories && categories.map(c=>(
                                                            <option value={c.id} key={c.id}>{c.title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline" ref={closeBtnRef}>Cancel</Button>
                                                </DialogClose>
                                                <Button type="button" onClick={()=>editBlog(b.id)}>Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </form>
                                </Dialog>
                                <Button className="w-full" variant={"outline"} onClick={()=>deleteBlog(b.id)}>Delete</Button>
                            </CardFooter>
                        </Card> 
                    )): <p className="text-center">No Blogs</p>
                }
            </div>
        </div>
    );
}

export default MyBlogsPage;