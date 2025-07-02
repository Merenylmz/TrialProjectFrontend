import CategoryListComponent from "@/components/Categories/CategoryListComponent";
import CommonAPI from "@/utils/CommonAPI";
import { CategoryType } from "../(types)/CategoryTypes";

const Categories = async() => {
    const categories : CategoryType[] = await CommonAPI({url: process.env.apiLink as string, method: "GET", parameters: "categories"}) as Array<CategoryType>;
    return (
        <div>
            <CategoryListComponent categories={categories}/>
        </div>
    );
}

export default Categories;