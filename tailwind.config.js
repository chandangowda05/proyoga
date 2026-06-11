export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F5F5F4', // Warm Stone - Light but premium
          secondary: '#FFFFFF', // Pure White
          elevated: '#FAFAF9',
        },
        border: '#E7E5E4', // Stone 200
        accent: {
          primary: '#166534', // Forest Green - Sophisticated
          secondary: '#15803D',
          glow: 'rgba(22, 101, 52, 0.1)',
        },
        text: {
          primary: '#1C1917', // Stone 900 - High contrast
          secondary: '#57534E', // Stone 600
          muted: '#A8A29E', // Stone 400
        }
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        btn: '12px',
        pill: '9999px',
      },
      boxShadow: {
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'btn': '0 4px 6px -1px rgba(22, 101, 52, 0.2), 0 2px 4px -2px rgba(22, 101, 52, 0.2)',
        'sidebar': '4px 0 24px rgba(0, 0, 0, 0.02)',
      }
    }
  },
  plugins: []
}
