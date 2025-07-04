import { BlogType } from "@/app/(types)/BlogTypes";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

const BlogListGroupComponent = ({blogs} : {blogs: Array<BlogType>}) => {
    return (
        <div className="space-y-4">
            {
                blogs && blogs.map((b)=>(
                    <Card className="hover:shadow-lg transition-shadow" key={b.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">{b.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4  text-center">{b.description}</p>
                            <Link href={`/blogs/${b.id}`} className="text-blue-600 text-sm font-medium">
                                Read more →
                            </Link>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    );
}

export default BlogListGroupComponent;