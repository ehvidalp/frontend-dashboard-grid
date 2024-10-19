/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokeball': "url('src/assets/pokeball.svg')",
      },
    },
  },
  plugins: [],
}

