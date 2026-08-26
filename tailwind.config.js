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
          DEFAULT: '#060709',
          elevated: '#0B0D12',
          surface: '#11141C',
          subtle: '#181D28',
          card: 'rgba(15, 18, 26, 0.75)'
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.18)',
          glow: 'rgba(139, 92, 246, 0.35)',
        },
        neural: {
          violet: '#8B5CF6',
          purple: '#A855F7',
          pink: '#EC4899',
          rose: '#F43F5E',
          cyan: '#06B6D4',
          blue: '#38BDF8',
          electric: '#6366F1',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          accent: '#C084FC',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Syne"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'shimmer-sweep': 'shimmer 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scanLine 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(139,92,246,0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(6,182,212,0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'neural-glow': 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.18) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
