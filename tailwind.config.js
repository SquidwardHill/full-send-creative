/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Starboy", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        galaxy: {
          100: "#1a1a2e",
          200: "#16213e",
          300: "#0f3460",
          400: "#533483",
        },
        cream: {
          100: "hsla(0, 38%, 90%, 1)",
          200: "hsla(0, 39%, 84%, 0.8)",
          300: "hsla(0, 39%, 84%, 0.6)",
          400: "hsla(0, 39%, 84%, 0.4)",
          500: "hsla(0, 39%, 84%, 0.2)",
          600: "hsla(0, 39%, 84%, 0.1)",
          700: "hsla(0, 39%, 84%, 0.05)",
          800: "hsla(0, 39%, 84%, 0.025)",
          900: "hsla(0, 39%, 84%, 0.0125)",
        },
        bubblegum: {
          100: "hsla(313, 100%, 74%, 1)",
          200: "hsla(309, 78%, 53%, 1)",
          300: "hsla(313, 97%, 53%, 1)",
          400: "hsla(313, 100%, 74%, 1)",
          500: "hsla(309, 78%, 53%, 1)",
          600: "hsla(313, 97%, 53%, 1)",
          700: "hsla(313, 100%, 74%, 1)",
          800: "hsla(309, 78%, 53%, 1)",
          900: "hsla(313, 97%, 53%, 1)",
        },
      },
      animation: {
        //sparkle: "sparkle 1.5s ease-in-out infinite",
        sparkle: "pulse 2s ease-in-out",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 0.9, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        },
        // sparkle: {
        //   "0%, 100%": { transform: "scale(1)" },
        //   "50%": { transform: "scale(1.2)" },
        // },
      },
    },
  },
  plugins: [],
};
