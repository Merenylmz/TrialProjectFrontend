import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
    return (
        <div className="shadow-sm top-0 bg-gray-800">
            <div className="container items-center justify-between p-4 flex">
                <Link href={"/"} className="text-white text-2xl">Logo</Link>
                <nav className="md:flex space-x-4 text-white">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/blogs"}>Blogs</Link>
                    <Link href={"/categories"}>Categories</Link>
                </nav>
                <div className="space-x-3">
                    <Button>Login</Button>
                    <Button variant={"outline"}>Register</Button>
                </div>
            </div>
        </div>
    );
}

export default Header;