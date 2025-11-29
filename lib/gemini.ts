import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

export function initializeGemini() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
        console.warn('⚠️ GOOGLE_GEMINI_API_KEY not found. Using mock data mode.');
        return null;
    }

    if (!genAI) {
        genAI = new GoogleGenerativeAI(apiKey);
    }

    return genAI;
}

export function getGeminiModel() {
    const ai = initializeGemini();

    if (!ai) {
        return null;
    }

    return ai.getGenerativeModel({
        model: 'gemini-2.5-pro',
        generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
        },
    });
}

export async function generateWithGemini(prompt: string): Promise<string> {
    const model = getGeminiModel();

    if (!model) {
        throw new Error('Gemini model not initialized. Please set GOOGLE_GEMINI_API_KEY.');
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}
