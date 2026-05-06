import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use these via className="font-display", "font-ui", "font-mono"
        display: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        ui:      ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-geist-mono)', 'Courier New', 'monospace'],
      },

      colors: {
        // Brand system — reference via className="bg-brand", "text-ink", etc.
        bg:      '#F9F8FF',
        surface: '#FFFFFF',
        ink:     '#0A0A0A',
        ink2:    '#3D3D3D',
        ink3:    '#6B6B6B',
        ink4:    '#A0A0A0',
        brand:   '#6B3FA0',

        // Status colors — inside product UI panels only
        status: {
          green:  { bg: '#D1FAE5', text: '#065F46' },
          amber:  { bg: '#FEF3C7', text: '#92400E' },
          red:    { bg: '#FEE2E2', text: '#991B1B' },
          blue:   { bg: '#EDE9FE', text: '#5B21B6' },
          grey:   { bg: '#F3F4F6', text: '#6B7280' },
        },
      },

      screens: {
        sm:    '480px',
        md:    '768px',
        lg:    '1024px',
        xl:    '1280px',
        '2xl': '1440px',
      },

      maxWidth: {
        content: '1120px',
        text:    '520px',
        panel:   '1000px',
        cta:     '960px',
      },

      spacing: {
        section:         '120px',
        'section-mobile': '80px',
        gutter:          '40px',
        'gutter-mobile': '24px',
      },

      borderRadius: {
        card:  '16px',
        panel: '12px',
        btn:   '10px',
        inner: '8px',
        pill:  '999px',
      },

      // Grid size matches background grid
      backgroundSize: {
        grid: '44px 44px',
      },
    },
  },
  plugins: [],
}

export default config
