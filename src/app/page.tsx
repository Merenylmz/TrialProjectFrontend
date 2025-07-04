import CategoryListGroupComponent from "@/components/Home/CategoryListGroupComponent";
import CommonAPI from "@/utils/CommonAPI";
import { CategoryType } from "./(types)/CategoryTypes";
import BlogListGroupComponent from "@/components/Home/BlogListGroupComponent";
import { BlogType } from "./(types)/BlogTypes";



export default async function Home() {
  const categories = await CommonAPI({url: process.env.apiLink as string, method: "GET", parameters: "categories"}) as Array<CategoryType>;
  const blogs = await CommonAPI({url: process.env.apiLink as string, method: "GET", parameters: "blogs"}) as Array<BlogType>;
  return (
    <div className="mt-7">
      <CategoryListGroupComponent categories={categories}/>
      <br />
      <BlogListGroupComponent blogs={blogs}/>
    </div>
  );
}
