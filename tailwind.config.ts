import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{mdx,md}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  '#FFF5F8',
          100: '#FFE4ED',
          200: '#FFCAD9',
          300: '#FFA8C0',
          400: '#FF85A6',
          500: '#F26D90',
          600: '#D85275',
          700: '#B83A5D',
        },
        cream: '#FFFBF7',
        ink: '#3D2A33',
        'ink-muted': '#7B5C68',
      },
      borderRadius: {
        soft: '1.25rem',
        pill: '9999px',
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft:   '0 2px 16px 0 rgb(242 109 144 / 0.10)',
        medium: '0 4px 32px 0 rgb(242 109 144 / 0.18)',
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #FFF5F8 0%, #FFE4ED 100%)',
      },
    },
  },
}

export default config
