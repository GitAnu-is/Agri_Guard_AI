export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Deep agricultural green — primary brand
        leaf: {
          50: '#f0f8f3',
          100: '#dcefe3',
          200: '#bbdfc9',
          300: '#8cc7a5',
          400: '#57a87c',
          500: '#348a5e',
          600: '#236e4a',
          700: '#1c583d',
          800: '#194632',
          900: '#0f2e21',
        },
        // Warm harvest yellow / orange
        harvest: {
          50: '#fffaeb',
          100: '#fef0c7',
          200: '#fedf89',
          300: '#fec84b',
          400: '#fdb022',
          500: '#f79009',
          600: '#dc6803',
          700: '#b54708',
          800: '#93370d',
          900: '#7a2e0e',
        },
        // Weather blue
        sky: {
          50: '#eff8ff',
          100: '#d1e9ff',
          200: '#b2ddff',
          300: '#84caff',
          400: '#53b1fd',
          500: '#2e90fa',
          600: '#1570ef',
          700: '#175cd3',
          800: '#1849a9',
          900: '#194185',
        },
        // Disease / risk red
        risk: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda29b',
          400: '#f97066',
          500: '#f04438',
          600: '#d92d20',
          700: '#b42318',
          800: '#912018',
          900: '#7a271a',
        },
        // AI / XAI indigo-purple
        xai: {
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bdb4fe',
          400: '#9b8afb',
          500: '#7a5af8',
          600: '#6938ef',
          700: '#5925dc',
          800: '#4a1fb8',
          900: '#3e1c96',
        },
        // Earth tones
        earth: {
          50: '#faf8f5',
          100: '#f2ede5',
          200: '#e3d9c9',
          300: '#cdbca3',
          400: '#b39a78',
          500: '#9a805d',
          600: '#7e6749',
          700: '#65523c',
          800: '#4d3f30',
          900: '#332a21',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(16 24 40 / 0.04), 0 1px 3px 0 rgb(16 24 40 / 0.06)',
        lift: '0 4px 8px -2px rgb(16 24 40 / 0.06), 0 12px 24px -6px rgb(16 24 40 / 0.10)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
