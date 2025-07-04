"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CommonAPI from "@/utils/CommonAPI";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterPage = () => {

    const [inputs, setInputs] = useState({name: "", email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        if (!inputs.email[0] || !inputs.password[0]) {
            return alert("Please enter inputs");  
        }
        const data = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "POST", parameters: "auth/register", inputs}) as {email: string};
        console.log(data);
        
        if (!data.email[0]) {
           return alert("Process's not successfully");
        }

        router.push("/auth/login");
        setLoading(false);
    }



    return (
        <div className="mt-7">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        I already have an account...
                    </CardDescription>
                    <CardAction>
                        <Link href={`/auth/login`}><Button variant="link">Sign In</Button></Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e:FormEvent<HTMLFormElement>)=>handleSubmit(e)} method="POST">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">User Name</Label>
                                <Input
                                    id="text"
                                    type="text"
                                    placeholder="Enter Your name"
                                    required
                                    value={inputs.name}
                                    onChange={(e)=>setInputs({...inputs, name: e.target.value})}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={inputs.email}
                                    onChange={(e)=>setInputs({...inputs, email: e.target.value})}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {/* <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                    Forgot your password?
                                    </a> */}
                                </div>
                                <Input id="password" type="password" required value={inputs.password} onChange={(e)=>setInputs({...inputs, password: e.target.value})}/>
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-5" disabled={loading}>
                        {loading ?
                            <div className="flex space-x-1 items-center justify-center">
                                <Loader2Icon className="animate-spin" />
                            </div> : <div>Submit</div>
                        }                
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterPage;