/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // KrishiAi earthy green palette — overrides default green
        green: {
          50: '#F0FFF4',
          100: '#D8F3DC',   // Background Green
          200: '#B7E4C7',
          300: '#95D5B2',
          400: '#52B788',   // Light Green
          500: '#40916C',
          600: '#2D6A4F',   // PRIMARY — Deep Earthy Green
          700: '#1B4332',
          800: '#163B2E',
          900: '#0D2818',
        },
        golden: {
          DEFAULT: '#F4A300',
          light: '#FFD166',
          dark: '#C47F00',
        },
        soil: {
          DEFAULT: '#8B5E3C',
          light: '#A67C52',
          dark: '#6B4226',
        },
        sky: {
          DEFAULT: '#48CAE4',
          light: '#90E0EF',
          dark: '#0096C7',
        },
        cream: {
          DEFAULT: '#FEFAE0',
          dark: '#F5F0D0',
        },
        danger: {
          DEFAULT: '#D62828',
          light: '#EF4444',
        },
        // Legacy alias — maps to golden
        greenAccent: '#F4A300',
        lightGreen: {
          50: '#F0FFF4',
          100: '#D8F3DC',
          200: '#B7E4C7',
          300: '#95D5B2',
          400: '#52B788',
          500: '#40916C',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#163B2E',
          900: '#0D2818',
        },
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        greenGlow: '0 0 10px 0 rgba(45, 106, 79, 0.5)',
      },
      animation: {
        wobble: 'wobble 1s ease-in-out',
        pulse: 'pulse 2s infinite',
        'fade-in': 'fade-in 1s ease-out',
        bounce: 'bounce 2s infinite',
        vortex: 'vortex 10s linear infinite',
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        blink: 'blink 1.5s infinite',
        rotate: 'rotate 1s linear infinite',
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite',
        'slide-up-1': 'slide-up 1s ease-out forwards',
        'slide-up-2': 'slide-up 1s ease-out 0.2s forwards',
        'slide-up-3': 'slide-up 1s ease-out 0.4s forwards',
        'grow': 'grow 0.8s ease-in-out infinite alternate',
      },
      fontFamily: {
        baloo: ['"Baloo 2"', '"Noto Sans Devanagari"', 'sans-serif'],
        noto: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      keyframes: {
        wobble: {
          '0%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-5deg)' },
          '30%': { transform: 'rotate(5deg)' },
          '45%': { transform: 'rotate(-5deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
        vortex: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        grow: {
          '0%': { transform: 'scaleY(0.3)', opacity: '0.4' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      animationDelay: {
        '1': '0.5s',
        '2': '1s',
        '3': '1.5s',
        '4': '2s',
      },
      backgroundImage: {
        'vortex': 'radial-gradient(circle, #2D6A4F 20%, transparent 70%)',
      },
    },
  },
  plugins: [nextui(), addVariablesForColors],
  darkMode: "class",
}

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({
    ":root": newVars,
  });
}
