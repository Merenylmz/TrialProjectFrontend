import { BlogType } from "@/app/(types)/BlogTypes";
import { Separator } from "../ui/separator";

const BlogDetailComponent = ({blog} : {blog: BlogType}) => {
    
    return (
        <div>
            <div className="space-y-1">
                <h4 className="text-sm leading-none font-medium">{blog.title}</h4>
                <p className="text-muted-foreground text-sm">
                    {blog.description}
                </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>{blog.categoryId}</div>
                <Separator orientation="vertical" />
                <div>{blog.userId}</div>
            </div>
        </div>
    );
}

export default BlogDetailComponent;