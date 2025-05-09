export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'serif'],
        sans: ['"Starboy"', 'sans-serif'],
      },
      colors: {
        galaxy: 'hsla(270, 92%, 3%, 1)',
        cream: {
          100: 'hsla(0, 38%, 90%, 1)',
          200: 'hsla(0, 39%, 84%, 0.8)',
        },
        bubblegum: {
          400: 'hsla(313, 100%, 74%, 1)',
          500: 'hsla(309, 78%, 53%, 1)',
          600: 'hsla(313, 97%, 53%, 1)',
        },
      },
    },
  },
  plugins: [],
};