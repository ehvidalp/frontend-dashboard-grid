/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokeball': "url('src/assets/pokeball.svg')",
      },
      fontFamily: {
        'roboto-mono': ['Roboto Mono', 'monospace'],
        'clash': ['"Clash Display"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

