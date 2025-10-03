/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const darkMode = 'class';
export const theme = {
    extend: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'], // Example font
        },
        colors: {
            primary: {
                light: '#6366f1', // Indigo 500
                dark: '#818cf8', // Indigo 400
            },
            secondary: {
                light: '#fde047', // Yellow 300
                dark: '#facc15', // Yellow 400
            },
            background: {
                light: '#ffffff', // White
                dark: '#1a202c', // Dark Gray
            },
            card: {
                light: '#f3f4f6', // Gray 100
                dark: '#2d3748', // Dark Grayish Blue
            },
            text: {
                light: '#1f2937', // Gray 900
                dark: '#e2e8f0', // Gray 200
            },
        },
    },
};
export const plugins = [];
