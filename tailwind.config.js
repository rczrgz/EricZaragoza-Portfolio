/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const darkMode = 'class';
export const theme = {
    extend: {
        fontFamily: {
            display: ['Syne', 'sans-serif'],
            sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
        },
        colors: {
            brand: {
                accent: '#ccff00',
                emerald: '#059669',
                dark: '#08090d',
                darker: '#040507',
                card: '#10121a',
                border: '#1b1f2b',
                muted: '#7e8499',
            },
            primary: {
                light: '#0a0c10',
                dark: '#f3f4f6',
            },
            secondary: {
                light: '#16a34a',
                dark: '#ccff00',
            },
            background: {
                light: '#f7f8fa',
                dark: '#08090d',
            },
            card: {
                light: '#ffffff',
                dark: '#10121a',
            },
            text: {
                light: '#0c0e14',
                dark: '#f0f2f7',
            },
        },
    },
};
export const plugins = [];
