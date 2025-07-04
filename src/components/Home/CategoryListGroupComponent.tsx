import { CategoryType } from "@/app/(types)/CategoryTypes";
import Link from "next/link";


const CategoryListGroupComponent = ({categories} : {categories : Array<CategoryType>}) => {
    return (
        <div>
            <div className="w-full overflow-x-auto whitespace-nowrap py-4 px-2">
                <div className="inline-flex gap-4">
                    {
                        categories && categories.map((c)=>(
                            <Link key={c.id} href={`/categories/${c.id}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                {c.title}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoryListGroupComponent;