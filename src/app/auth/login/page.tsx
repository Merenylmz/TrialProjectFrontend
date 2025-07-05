"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store";
import { loginThunk } from "@/store/authThunk";
import { Label } from "@radix-ui/react-label";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const LoginPage = () => {
    const [inputs, setInputs] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    // const {isAuth, token} = useSelector((state: RootState)=>state.auth);

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        const res = await dispatch(loginThunk({email: inputs.email, password: inputs.password})) as {payload: {token: string}};
        if (!res.payload.token[0]) {
            return alert("Login Error");
        }

        Cookies.set("token", res.payload.token , {
            expires: 1,
            secure: true,
            sameSite: "strict"
        });

        Cookies.set("isAuth", "1", {
            expires: 1,
            secure: true,
            sameSite: "strict"
        })

        router.push("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
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

                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                        id="password"
                        type="password"
                        required
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    </div>

                    <Button type="submit" className="w-full mt-5" disabled={loading}>
                    {loading ? (
                        <div className="flex space-x-1 items-center justify-center">
                        <Loader2Icon className="animate-spin" />
                        </div>
                    ) : (
                        <div>Login</div>
                    )}
                    </Button>
                </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage;