import { BlogType } from "@/app/(types)/BlogTypes";
import BlogDetailComponent from "@/components/Blogs/BlogDetailComponent";
import CommonAPI from "@/utils/CommonAPI";

const BlogDetail = async({ params } : {params: Promise<{ id: string }>}) => {
    
    const blog : BlogType = await CommonAPI({url: process.env.apiLink as string, method: "GET", parameters: `blogs/${(await params).id}`}) as BlogType;
    return (
        <div className="mt-7 mx-auto">
            <BlogDetailComponent blog={blog as BlogType}/>
        </div>
    );
}

export default BlogDetail;