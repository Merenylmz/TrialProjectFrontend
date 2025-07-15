import CommonAPI from "@/utils/CommonAPI";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {title, token, userId} = await request.json();
    try {
        
        const res = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, parameters: `categories/create?token=${token}`, method: "POST", inputs: {
            title: title,
            userId
        }}) as {title: string};

        
        if (!res) {
            return NextResponse.json({status: false});
        }

        revalidatePath('/'); 
        revalidatePath('/categories'); 
        
        return NextResponse.json({status: true});
    } catch (error) {
        console.log(error);
        return NextResponse.json({status: true});
    }
}