/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F7F7F5',
          elevated: '#FFFFFF',
          surface: '#FFFFFF',
          subtle: '#F0F0EE',
          card: '#FFFFFF',
        },
        border: {
          subtle: '#E5E7EB',
          strong: '#D1D5DB',
          glow: 'rgba(37, 99, 235, 0.25)',
        },
        text: {
          primary: '#111318',
          secondary: '#5F6368',
          muted: '#80868B',
          accent: '#2563EB',
        },
        accent: {
          blue: '#2563EB',
          violet: '#7C3AED',
          cyan: '#0891B2',
          amber: '#D97706',
          emerald: '#059669',
          rose: '#E11D48',
        },
        neural: {
          violet: '#7C3AED',
          purple: '#8B5CF6',
          pink: '#EC4899',
          rose: '#F43F5E',
          cyan: '#0891B2',
          blue: '#2563EB',
          electric: '#4F46E5',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'editorial': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'editorial-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'editorial-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'editorial-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
