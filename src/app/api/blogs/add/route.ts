import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'; 
import CommonAPI from '@/utils/CommonAPI'; 

export async function POST(request: Request) {
    const { title, description, categoryId, userId, token } = await request.json(); 

    try {
        const res = await CommonAPI({url: process.env.NEXT_PUBLIC_API_LINK as string, method: "POST", parameters: `blogs/create?token=${token}`, inputs: { title, description, categoryId, userId } }) as {title: string};

        if (!res || !res.title) { 
            console.error("Laravel'den beklenen yanıt gelmedi:", res);
            return NextResponse.json({ success: false, message: 'Blog eklenirken bir sorun oluştu.' }, { status: 400 });
        } 

        revalidatePath('/'); 
        revalidatePath('/blogs'); 
            
        return NextResponse.json({ success: true, message: 'Blog başarıyla eklendi!' }, { status: 200 });
    } catch (error) {
        console.error('API Route Hatası:', error);
        return NextResponse.json({ success: false, message: 'Sunucu hatası: Blog eklenemedi.' }, { status: 500 });
    }
}