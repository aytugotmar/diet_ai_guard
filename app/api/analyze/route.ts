import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image, restrictions } = body;

        // 1. Temel kontroller
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'API Key eksik' }, { status: 500 });
        }
        if (!image) {
            return NextResponse.json({ error: 'Resim verisi yok' }, { status: 400 });
        }

        // 2. Base64 temizliği
        const base64Data = image.includes('base64,')
            ? image.split('base64,')[1]
            : image;

        // 3. MODEL SEÇİMİ (Listendeki Model!)
        // Senin listende "gemini-2.0-flash" var. En hızlısı ve güçlüsü bu.
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        // 4. Prompt Hazırlığı
        const prompt = `Sen uzman bir diyetisyensin. Gönderilen ürün içeriği resmini analiz et.
        Kullanıcının kısıtlamaları: ${restrictions.join(', ')}.
        
        Bu kısıtlamalara göre ürünün güvenli olup olmadığını incele.
        SADECE şu JSON formatında cevap ver (Markdown yok, sadece JSON):
        { 
            "status": "safe" | "unsafe" | "caution", 
            "reason": "Türkçe kısa açıklama" 
        }`;

        // 5. Google'a Gönderilecek Resim Formatı
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/jpeg"
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // 6. JSON Temizleme ve Parse Etme
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonResponse = JSON.parse(cleanText);

        return NextResponse.json({ success: true, result: jsonResponse });

    } catch (error: any) {
        console.error('API Hatası:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Analiz hatası' },
            { status: 500 }
        );
    }
}