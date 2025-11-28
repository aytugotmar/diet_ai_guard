export const translations = {
    en: {
        // Header
        title: 'Travel Discovery',
        subtitle: 'Discover Hidden Gems Powered by AI',

        // Form
        formTitle: 'Plan Your Adventure',
        location: 'Location',
        locationPlaceholder: 'e.g., Istanbul, Cappadocia, Antalya',
        duration: 'Duration',
        durationOptions: {
            'half-day': 'Half Day (4-5h)',
            'full-day': 'Full Day (8-10h)',
            '2-days': '2 Days',
            '3-days': '3 Days',
        },
        foodPreferences: 'Food Preferences',
        foodOptions: {
            breakfast: 'Breakfast',
            lunch: 'Lunch',
            dinner: 'Dinner',
            'street-food': 'Street Food',
        },
        interests: 'Interests',
        interestOptions: {
            historical: 'Historical',
            nature: 'Nature',
            museums: 'Museums',
            'hidden-gems': 'Hidden Gems',
            adventure: 'Adventure',
            culture: 'Culture',
        },
        pace: 'Pace',
        paceOptions: {
            relaxed: 'Relaxed',
            moderate: 'Moderate',
            packed: 'Packed',
        },
        startTime: 'Start Time',
        startTimePlaceholder: 'e.g., 09:00',
        generate: 'Generate Itinerary',
        generating: 'Generating...',
        generatingNote: 'This may take 10-20 seconds...',

        // Results
        resultsTitle: 'Your Personalized Itinerary',
        noResults: 'No itinerary yet. Fill in the form and generate your adventure!',
        placeTypes: {
            food: 'Food',
            sight: 'Sight',
            nature: 'Nature',
        },

        // Errors
        errorTitle: 'Oops!',
        errorLocationRequired: 'Please enter a location',
        errorGeneric: 'Something went wrong. Please try again.',

        // UI
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
    },
    tr: {
        // Header
        title: 'Seyahat Keşfi',
        subtitle: 'Yapay Zeka ile Gizli Cenneti Keşfedin',

        // Form
        formTitle: 'Maceranızı Planlayın',
        location: 'Konum',
        locationPlaceholder: 'örn., İstanbul, Kapadokya, Antalya',
        duration: 'Süre',
        durationOptions: {
            'half-day': 'Yarım Gün (4-5s)',
            'full-day': 'Tam Gün (8-10s)',
            '2-days': '2 Gün',
            '3-days': '3 Gün',
        },
        foodPreferences: 'Yemek Tercihleri',
        foodOptions: {
            breakfast: 'Kahvaltı',
            lunch: 'Öğle Yemeği',
            dinner: 'Akşam Yemeği',
            'street-food': 'Sokak Lezzetleri',
        },
        interests: 'İlgi Alanları',
        interestOptions: {
            historical: 'Tarihi',
            nature: 'Doğa',
            museums: 'Müzeler',
            'hidden-gems': 'Gizli Yerler',
            adventure: 'Macera',
            culture: 'Kültür',
        },
        pace: 'Tempo',
        paceOptions: {
            relaxed: 'Rahat',
            moderate: 'Orta',
            packed: 'Yoğun',
        },
        startTime: 'Başlangıç Saati',
        startTimePlaceholder: 'örn., 09:00',
        generate: 'Rota Oluştur',
        generating: 'Oluşturuluyor...',
        generatingNote: 'Bu işlem 10-20 saniye sürebilir...',

        // Results
        resultsTitle: 'Kişiselleştirilmiş Rotanız',
        noResults: 'Henüz rota yok. Formu doldurun ve maceranızı oluşturun!',
        placeTypes: {
            food: 'Yemek',
            sight: 'Görülecek Yer',
            nature: 'Doğa',
        },

        // Errors
        errorTitle: 'Hata!',
        errorLocationRequired: 'Lütfen bir konum girin',
        errorGeneric: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.',

        // UI
        darkMode: 'Karanlık Mod',
        lightMode: 'Aydınlık Mod',
    },
};

export type TranslationKey = keyof typeof translations.en;
