/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design system tokens
        'surface-0': '#0B0E12',  // page background
        'surface-1': '#0F141A',  // card surfaces  
        'surface-2': '#111821',  // elevated surfaces
        'line-weak': 'rgba(255,255,255,0.06)',
        'line-strong': 'rgba(255,255,255,0.12)',
        'brand': '#F7B733',      // primary brand
        'brand-strong': '#FFC65C', // hover/accent
        'accent': '#7C5CFC',     // purple accent
        'text-1': '#FFFFFF',     // primary text
        'text-2': '#C7D0DC',     // secondary text  
        'text-3': '#8893A2',     // muted text
        // Keep existing for compatibility
        brand: {
          400: '#F7B733',
          500: '#FFC65C', 
          600: '#CC8000',
          700: '#996000',
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
          DEFAULT: '#0A0B0D', // Main dark background
          light: '#151518',   // Slightly lighter dark for alternating sections
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
      borderRadius: {
        'sm': '10px',
        'DEFAULT': '12px', 
        'md': '12px',
        'lg': '16px',
        'xl': '20px'
      },
      fontFamily: {
        sans: ['var(--font-openai-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-openai-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 56px  
        'h2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],   // 48px
        'h3': ['1.875rem', { lineHeight: '1.3' }],                        // 30px
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],                   // 18px
        'body': ['1rem', { lineHeight: '1.6' }],                          // 16px
        'sm': ['0.875rem', { lineHeight: '1.5' }],                        // 14px
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        'extra-wide': '0.15em',
      },
      boxShadow: {
        'elevated': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'brand-glow': '0 4px 20px rgba(247,183,51,0.15)',
        'brand-hover': '0 8px 32px rgba(247,183,51,0.2)'
      },
      ringColor: {
        brand: 'var(--ring)'
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px  
        '26': '6.5rem', // 104px
        '30': '7.5rem'  // 120px
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'gradient-flow': 'gradientFlow 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'grid': 'grid 15s linear infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
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
        'pulse-subtle': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(247,183,51,0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(247,183,51,0.4)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-hero': 'var(--brand-hero-grad)'
      },
    },
  },
  plugins: [],
};