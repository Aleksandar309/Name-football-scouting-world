/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#07090f',
          2: '#0d1220',
          3: '#111827',
          4: '#0a0f1c',
        },
        card: '#0f1623',
        border: {
          DEFAULT: '#1a2540',
          2: '#243050',
          3: '#2d3d5c',
        },
        green: {
          DEFAULT: '#00e676',
          dim: '#00b85c',
          glow: 'rgba(0,230,118,0.15)',
        },
        fsw: {
          blue: '#4fc3f7',
          amber: '#ffb300',
          red: '#ef5350',
          purple: '#b39ddb',
          teal: '#26c6da',
          muted: '#5a7090',
          muted2: '#8899aa',
          text: '#dce6f0',
        },
      },
    },
  },
  plugins: [],
}
