import { CategoryType } from "@/app/(types)/CategoryTypes";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const CategoryListComponent = ({categories}: {categories: CategoryType[]}) => {
    return (
        <div className="mx-auto grid grid-cols-3 gap-4 mt-7">
            {
                categories && categories.map(c=>(
                    <div key={c.id}>
                        <Card className="w-full max-w-sm">
                            <CardHeader>
                                <CardTitle>{c.title}</CardTitle>
                                <CardDescription>
                                    Category Details Page;
                                </CardDescription>

                            </CardHeader>
                            <CardFooter>
                                <Link href={`/categories/${c.id}`}>
                                    <Button>Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
}

export default CategoryListComponent;