/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
          light: "var(--secondary-light)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-dark)",
          light: "var(--accent-light)",
        },
        success: "var(--success)",
        error: "var(--error)",
        warning: "var(--warning)",
        info: "var(--info)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

