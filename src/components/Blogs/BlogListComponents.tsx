import { BlogType } from "@/app/(types)/BlogTypes";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

const BlogListComponents = ({blogs} : {blogs: Array<BlogType>}) => {
    // const [blog]

    return (
        <div className="mx-auto grid grid-cols-3 gap-4 mt-7">
            {
                blogs && blogs.map((b)=>(
                    <Card className="w-full max-w-sm" key={b.id}>
                        <CardHeader>
                            <CardTitle>{b.title}</CardTitle>
                            <CardDescription>
                                {b.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex-col gap-2">
                            <Link className="w-full" href={`/blogs/${b.id}`}>
                                <Button className="w-full">Detail</Button>
                            </Link>
                            <Link className="w-full" href={`/categories/${b.categoryId}`}>
                                <Button className="w-full" variant={"outline"}>Category</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))
            }
            

        </div>
    );
}

export default BlogListComponents;