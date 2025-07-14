"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {forgotPasswordTask} from "../../../components/Auth/PasswordTaskComponents";


const ForgotPassword = () => {
    
    const [inputs, setInputs] = useState({email: ""});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);

        if (!inputs.email) {
            setLoading(false);
            return toast.error("Please Enter inputs");
        }
        const {status} = await forgotPasswordTask(inputs.email);
        console.log(status);
        
        if (!status) {
            setLoading(false);
            return toast.error("Error");
        }

        toast.success("Email Sended");
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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

export default ForgotPassword;