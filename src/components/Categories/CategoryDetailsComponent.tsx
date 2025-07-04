import { CategoryType } from "@/app/(types)/CategoryTypes";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import BlogListComponents from "../Blogs/BlogListComponents";

const CategoryDetailsComponent = ({category}: {category: CategoryType}) => {
    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>
                        Category Details Page;
                    </CardDescription>
                </CardHeader>
            </Card>

            {
                category.blogs && category.blogs[0] ? 
                <BlogListComponents blogs={category.blogs}/>
                :
                <p className="text-gray-500 mt-7 text-center">No Blogs</p>
            }
        </div>
    );
}

export default CategoryDetailsComponent;