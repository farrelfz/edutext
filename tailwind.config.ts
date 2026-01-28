import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          600: '#0f766e',
          500: '#14b8a6',
          400: '#22c55e'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
