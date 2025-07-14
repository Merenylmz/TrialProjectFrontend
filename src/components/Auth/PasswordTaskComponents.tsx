"use client"

import axios from "axios";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const NewPasswordComponent = ({ params } : {params: Promise<{ token: string }>}) => {
    const [inputs, setInputs] = useState({password: "", verifyPassword: ""});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        console.log("params ", (await params));
        

        if (!inputs.password) {
            setLoading(false);
            return toast.error("Please Enter inputs");
        } else if (inputs.password != inputs.verifyPassword) {
            setLoading(false);
            return toast.error("Please Make sure the passwords are the same");
        }

        const res = await axios.post(process.env.NEXT_PUBLIC_API_LINK as string + `/auth/newpassword?passtoken=${(await params).token}`, {password: inputs.password});
        const data = res.data;
        
        console.log(data);
        
        if (!data.status) {
            setLoading(false);
            return toast.error("Error");
        }

        toast.success("Password Changed Successfully");
        router.push("/auth/login");
    }   

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email below to Save to your account
                </CardDescription>
                <CardAction>
                    <Link href={`/auth/register`}>
                    <Button variant="link">Sign Up</Button>
                    </Link>
                </CardAction>
                </CardHeader>

                <CardContent>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} method="POST">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="pass">New Password</Label>
                            <Input
                            id="pass"
                            type="password"
                            required
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Verify Password</Label>
                            <Input
                            id="password"
                            type="password"
                            required
                            value={inputs.verifyPassword}
                            onChange={(e) => setInputs({ ...inputs, verifyPassword: e.target.value })}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-5" disabled={loading}>
                    {loading ? (
                        <div className="flex space-x-1 items-center justify-center">
                        <Loader2Icon className="animate-spin" />
                        </div>
                    ) : (
                        <div>Send</div>
                    )}
                    </Button>
                </form>
                </CardContent>
            </Card>
        </div>
    );
}

export const forgotPasswordTask = async(email: string) =>{
    try {
        console.log(email);
        
        const res = await axios.post(process.env.NEXT_PUBLIC_API_LINK as string+ "/auth/forgotpassword", {email});
        const data = res.data;

        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
}
