// check-models.js dosyası
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Buraya tırnak içine kendi API anahtarını yaz (AIza... ile başlayan)
const genAI = new GoogleGenerativeAI("AIzaSyA00HsjxQL4AKm8QPAEugcCcNx3mn1L51A");

async function listModels() {
    try {
        // API anahtarınla erişebildiğin modelleri listele
        // Not: Node.js SDK'sında doğrudan listModels olmadığı için basit bir fetch yapıyoruz
        const apiKey = "AIzaSyA00HsjxQL4AKm8QPAEugcCcNx3mn1L51A";
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        console.log("=== KULLANABİLECEĞİN MODELLER ===");
        if (data.models) {
            data.models.forEach(model => {
                if (model.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`✅ Model Adı: ${model.name.replace("models/", "")}`);
                }
            });
        } else {
            console.log("Hata:", data);
        }
    } catch (error) {
        console.error("Bağlantı hatası:", error);
    }
}

listModels();