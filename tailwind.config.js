/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Royal Theme Colors from Master Prompt
        primary: {
          DEFAULT: "#3B0A0A", // Dark Maroon
          light: "#5A1212",
          dark: "#240505",
        },
        secondary: {
          DEFAULT: "#FFD700", // Gold
          light: "#FFE34D",
          dark: "#CCAC00",
        },
        background: {
          DEFAULT: "#F5E6CC", // Soft Beige
        },
        card: {
          DEFAULT: "#FFFFFF", // White
        },
        dark: {
          DEFAULT: "#1A1A1A",
          text: "#333333"
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Soft shadow for premium feel
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.39)', // Gold button glow effect
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'], // Elegant traditional font pairing
      },
    },
  },
  plugins: [],
}