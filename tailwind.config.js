/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin.js";

function flattenColorPalette(colors) {
  const result = {};
  for (const [color, values] of Object.entries(colors)) {
    if (typeof values === 'object' && values !== null) {
      for (const [key, val] of Object.entries(values)) {
        result[`${color}${key === 'DEFAULT' ? '' : `-${key}`}`] = val;
      }
    } else {
      result[color] = values;
    }
  }
  return result;
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': {
          900: '#0f0520',
          800: '#1e0a3c',
          700: '#2d1060',
          600: '#3c1680',
        },
        'brand-purple': {
          600: '#5a2490',
          500: '#6b2fa0',
          400: '#8b4fc0',
          300: '#a870d8',
        },
        'brand-magenta': {
          600: '#a01550',
          500: '#c2185b',
          400: '#d81b6b',
          300: '#e91e80',
        },
        'brand-lavender': {
          400: '#b39ddb',
          300: '#ce93d8',
          200: '#e1bee7',
          100: '#f3e5f5',
        },
        'soft-pink': {
          100: '#fce4ec',
          50: '#f3e5f5',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'blob': 'blob 15s ease-in-out infinite',
        'aurora': 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '50%': { transform: 'translate(-20px, 15px) scale(0.97)' },
          '75%': { transform: 'translate(15px, -10px) scale(1.03)' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(30, 10, 60, 0.06), 0 1px 4px rgba(30, 10, 60, 0.04)',
        'card-hover': '0 12px 40px rgba(107, 47, 160, 0.12), 0 4px 12px rgba(107, 47, 160, 0.06)',
        'btn': '0 4px 16px rgba(107, 47, 160, 0.25), 0 2px 6px rgba(194, 24, 91, 0.15)',
        'btn-hover': '0 8px 30px rgba(107, 47, 160, 0.35), 0 4px 12px rgba(194, 24, 91, 0.2)',
      },
    },
  },
  plugins: [plugin(addVariablesForColors)],
}
