import { CategoryType } from "@/app/(types)/CategoryTypes";
import CategoryDetailsComponent from "@/components/Categories/CategoryDetailsComponent";
import CommonAPI from "@/utils/CommonAPI";

const CategoryDetail = async({params}: {params:Promise<{id: string}>}) => {
    const category : CategoryType = await CommonAPI({url: process.env.apiLink as string, method: "GET", parameters: `categories/withblogs/${(await params).id}`}) as CategoryType;
    return (
        <div className="mt-5">
            <CategoryDetailsComponent category={category}/>
        </div>
    );
}

export default CategoryDetail;