// export const revalidate = 10;
import BlogListComponents from "@/components/Blogs/BlogListComponents";
import CommonAPI from "@/utils/CommonAPI";
import { BlogType } from "../(types)/BlogTypes";

const BlogsPage = async() => {
    const blogs: BlogType[] = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "GET", parameters: "blogs"}) as BlogType[];

    return (
        <div>
            <BlogListComponents blogs={blogs}/>
        </div>
    );
}

export default BlogsPage;