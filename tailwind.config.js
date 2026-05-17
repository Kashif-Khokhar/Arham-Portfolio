/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#050508',
        deep: '#0a0a12',
        surface: '#0f0f1a',
        elevated: '#161625',
        card: '#1a1a2e',
        hover: '#1f1f35',
        
        cyan: {
          DEFAULT: '#00d4ff',
          dim: '#00a8cc',
          glow: 'rgba(0, 212, 255, 0.15)',
          border: 'rgba(0, 212, 255, 0.25)',
        },
        
        purple: {
          DEFAULT: '#8b5cf6',
          dim: '#6d46d0',
          glow: 'rgba(139, 92, 246, 0.15)',
        },
        
        green: {
          DEFAULT: '#00ff88',
          dim: '#00cc6a',
          glow: 'rgba(0, 255, 136, 0.1)',
        },
        
        orange: {
          DEFAULT: '#ff6b35',
          glow: 'rgba(255, 107, 53, 0.1)',
        },

        text: {
          primary: '#f0f0f5',
          secondary: '#b0b8d0',
          muted: '#7a8599',
          bright: '#ffffff',
        },

        ui: {
          border: 'rgba(255, 255, 255, 0.06)',
          'border-cyan': 'rgba(0, 212, 255, 0.2)',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Syne', 'sans-serif'],
      },
      boxShadow: {
        'cyan': '0 0 30px rgba(0, 212, 255, 0.15), 0 0 60px rgba(0, 212, 255, 0.05)',
        'purple': '0 0 30px rgba(139, 92, 246, 0.15)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s infinite',
        'bounce-soft': 'bounce-soft 2s infinite',
        'fade-in-up': 'fadeInUp 0.7s ease both',
        'fade-in-down': 'fadeInDown 0.6s ease both',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(6px)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
