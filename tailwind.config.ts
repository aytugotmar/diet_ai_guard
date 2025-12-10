import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                foreground: "rgb(var(--foreground) / <alpha-value>)",
                card: "rgb(var(--card) / <alpha-value>)",
                'card-foreground': "rgb(var(--card-foreground) / <alpha-value>)",
                primary: "rgb(var(--primary) / <alpha-value>)",
                'primary-foreground': "rgb(var(--primary-foreground) / <alpha-value>)",
                muted: "rgb(var(--muted) / <alpha-value>)",
                'muted-foreground': "rgb(var(--muted-foreground) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
            },
            animation: {
                'bounce': 'bounce 1s infinite',
                'spin': 'spin 1s linear infinite',
            },
        },
    },
    plugins: [],
};
export default config;
