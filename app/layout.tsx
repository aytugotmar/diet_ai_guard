import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TravelGenie AI - Your AI-Powered Travel Companion",
    description: "Generate personalized travel itineraries with AI. Discover hidden gems, plan your perfect trip, and explore the world with TravelGenie AI.",
    keywords: "travel, AI, itinerary, travel planner, vacation, trip planning, hidden gems",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
