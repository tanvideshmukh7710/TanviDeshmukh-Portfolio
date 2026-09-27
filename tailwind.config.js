/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./*.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        bodyGrotesque: [
          "'Body Grotesque Fit'",
          "'Body Grotesque'",
          "'Space Grotesk'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        agrandir: [
          "'Agrandir'",
          "'Agrandir Grand Heavy'",
          "'Impact'",
          "'Arial Black'",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "var(--geist-foreground)",
        "gray-200": "var(--ds-gray-200)",
        "gray-900": "var(--ds-gray-900)",
        "gray-1000": "var(--ds-gray-1000)",
        "gray-alpha-200": "var(--ds-gray-alpha-200)",
        "accents-2": "var(--accents-2)",
        "background-100": "var(--ds-background-100)",
        "success": "var(--geist-success)",
        "error": "var(--geist-error)",
        "warning": "var(--geist-warning)",
        "violet": "var(--geist-violet)",
        "mauve-dark-2": "rgba(22, 20, 26, 0.75)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      letterSpacing: {
        canva: "-0.053em",
      },
      lineHeight: {
        canva: "0.85",
      },
    },
  },
  plugins: [],
}
