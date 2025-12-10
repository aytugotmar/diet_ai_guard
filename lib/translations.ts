// Translations
export const translations = {
    tr: {
        // Home Page
        appTitle: 'DietGuard AI',
        appSubtitle: 'Gıda içeriklerini yapay zeka ile analiz edin',
        selectRestrictions: 'Diyet Kısıtlamalarınızı Seçin',
        selectedCount: 'kısıtlama seçildi',
        takePhoto: 'Fotoğraf Çek',
        infoText: 'Ürün etiketindeki içerik listesinin fotoğrafını çekin',
        selectAtLeastOne: 'Lütfen en az bir diyet kısıtlaması seçin',

        // Categories
        allergies: 'Alerjiler',
        dietary: 'Diyet Tercihleri',
        health: 'Sağlık',
        religious: 'Dini İnançlar',

        // Restrictions
        'gluten-free': 'Glütensiz',
        'lactose-free': 'Laktozsuz',
        'nut-allergy': 'Fındık Alerjisi',
        'egg-allergy': 'Yumurta Alerjisi',
        'soy-allergy': 'Soya Alerjisi',
        'fish-allergy': 'Balık Alerjisi',
        'shellfish-allergy': 'Kabuklu Deniz Ürünü Alerjisi',
        'sesame-allergy': 'Susam Alerjisi',
        'vegan': 'Vegan',
        'vegetarian': 'Vejetaryen',
        'no-sugar': 'Şekersiz',
        'low-carb': 'Düşük Karbonhidrat',
        'keto': 'Keto',
        'paleo': 'Paleo',
        'low-sodium': 'Düşük Sodyum',
        'halal': 'Helal',
        'kosher': 'Koşer',
        'no-alcohol': 'Alkol İçermez',

        // Camera Page
        productAnalysis: 'Ürün Analizi',
        activeRestrictions: 'Aktif Kısıtlamalar:',
        captureIngredients: 'İçerik Listesini Çekin',
        captureDescription: 'Ürün etiketindeki içerik listesinin net bir fotoğrafını çekin',
        analyzing: 'Analiz ediliyor...',
        analyzingDesc: 'Bu birkaç saniye sürebilir',
        errorOccurred: 'Hata Oluştu',
        tryAgain: 'Tekrar Dene',
        newAnalysis: 'Yeni Analiz Yap',

        // Results
        safe: 'Güvenli',
        unsafe: 'Güvenli Değil',
        caution: 'Dikkat',

        // Settings
        settings: 'Ayarlar',
        theme: 'Tema',
        language: 'Dil',
        lightMode: 'Açık Mod',
        darkMode: 'Koyu Mod',
        systemMode: 'Sistem',
        history: 'Geçmiş',
        clearHistory: 'Geçmişi Temizle',
        noHistory: 'Henüz analiz geçmişi yok',
        about: 'Hakkında',
        version: 'Versiyon',
    },
    en: {
        // Home Page
        appTitle: 'DietGuard AI',
        appSubtitle: 'Analyze food contents with artificial intelligence',
        selectRestrictions: 'Select Your Dietary Restrictions',
        selectedCount: 'restrictions selected',
        takePhoto: 'Take Photo',
        infoText: 'Take a photo of the ingredient list on the product label',
        selectAtLeastOne: 'Please select at least one dietary restriction',

        // Categories
        allergies: 'Allergies',
        dietary: 'Dietary Preferences',
        health: 'Health',
        religious: 'Religious Beliefs',

        // Restrictions
        'gluten-free': 'Gluten-Free',
        'lactose-free': 'Lactose-Free',
        'nut-allergy': 'Nut Allergy',
        'egg-allergy': 'Egg Allergy',
        'soy-allergy': 'Soy Allergy',
        'fish-allergy': 'Fish Allergy',
        'shellfish-allergy': 'Shellfish Allergy',
        'sesame-allergy': 'Sesame Allergy',
        'vegan': 'Vegan',
        'vegetarian': 'Vegetarian',
        'no-sugar': 'Sugar-Free',
        'low-carb': 'Low Carb',
        'keto': 'Keto',
        'paleo': 'Paleo',
        'low-sodium': 'Low Sodium',
        'halal': 'Halal',
        'kosher': 'Kosher',
        'no-alcohol': 'Alcohol-Free',

        // Camera Page
        productAnalysis: 'Product Analysis',
        activeRestrictions: 'Active Restrictions:',
        captureIngredients: 'Capture Ingredients',
        captureDescription: 'Take a clear photo of the ingredient list on the product label',
        analyzing: 'Analyzing...',
        analyzingDesc: 'This may take a few seconds',
        errorOccurred: 'Error Occurred',
        tryAgain: 'Try Again',
        newAnalysis: 'New Analysis',

        // Results
        safe: 'Safe',
        unsafe: 'Unsafe',
        caution: 'Caution',

        // Settings
        settings: 'Settings',
        theme: 'Theme',
        language: 'Language',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        systemMode: 'System',
        history: 'History',
        clearHistory: 'Clear History',
        noHistory: 'No analysis history yet',
        about: 'About',
        version: 'Version',
    }
};

export type Language = 'tr' | 'en';
export type TranslationKey = keyof typeof translations.tr;
