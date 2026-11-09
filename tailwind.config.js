/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FFFEFA',
          100: '#FFFDF9',
          200: '#FAF6ED',
          300: '#F4ECE0',
          400: '#E8DCC9',
        },
        blush: {
          50: '#FFF5F6',
          100: '#FDF2F4',
          200: '#F9DEE3',
          300: '#F3BCC7',
          400: '#E993A3',
          500: '#DE6F84',
        },
        rose: {
          vintage: '#E08798',
          deep: '#C95D73',
          muted: '#B04E64',
        },
        burgundy: {
          light: '#9E2D41',
          DEFAULT: '#832232',
          deep: '#5C1521',
          dark: '#3D0B14',
        },
        champagne: {
          light: '#F5E8C7',
          DEFAULT: '#D4AF37',
          dark: '#B38F24',
        },
        espresso: {
          DEFAULT: '#2A1E22',
          soft: '#3D2C31',
          muted: '#614B52',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
        script: ['"Homemade Apple"', '"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'polaroid': '0 8px 30px -4px rgba(42, 30, 34, 0.12), 0 4px 12px -2px rgba(42, 30, 34, 0.08)',
        'polaroid-hover': '0 20px 40px -6px rgba(131, 34, 50, 0.22), 0 8px 18px -4px rgba(42, 30, 34, 0.12)',
        'soft-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'romantic-glow': '0 0 35px rgba(224, 135, 152, 0.35)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-15px) translateX(10px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

