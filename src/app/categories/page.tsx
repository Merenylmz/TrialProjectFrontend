// export const revalidate = 10;
import CategoryListComponent from "@/components/Categories/CategoryListComponent";
import CommonAPI from "@/utils/CommonAPI";
import { CategoryType } from "../(types)/CategoryTypes";

const Categories = async() => {
    const categories : CategoryType[] = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "GET", parameters: "categories"}) as Array<CategoryType>;
    return (
        <div>
            <CategoryListComponent categories={categories}/>
        </div>
    );
}

export default Categories;