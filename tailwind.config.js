/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Enai brand tokens mapped to CSS variables
        brand: {
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)',
          ink: 'var(--brand-ink)'
        },
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-fg': 'var(--muted-fg)',
        border: 'var(--border)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        // existing palette kept for backward compatibility
        primary: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#F7B733', // Primary color
          500: '#FC4A1A', // Secondary color
          600: '#CC8000',
          700: '#996000',
          800: '#664000',
          900: '#332000',
          950: '#1A1000',
        },
        dark: {
          DEFAULT: '#0A0B0D',
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#1A1B1E',
          900: '#0A0B0D',
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        // map to design tokens; keep Tailwind defaults intact by adding new keys
        'brand-sm': 'var(--shadow-sm)',
        'brand-md': 'var(--shadow-md)',
        'brand-lg': 'var(--shadow-lg)'
      },
      ringColor: {
        brand: 'var(--ring)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'gradient-flow': 'gradientFlow 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'grid': 'grid 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        gradientFlow: {
          '0%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
          '100%': { backgroundPosition: '0% center' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(247, 183, 51, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(247, 183, 51, 0.4)' },
        },
        grid: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-hero': 'var(--brand-hero-grad)'
      },
    },
  },
  plugins: [],
};