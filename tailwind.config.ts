import type { Config } from 'tailwindcss';
export default { content: ['./src/**/*.{ts,tsx}'], darkMode: 'class', theme: { extend: { colors: { brand: { DEFAULT: '#087db5', dark: '#056895', aqua: '#47c3bf' } }, boxShadow: { card: '0 18px 45px rgb(15 23 42 / .10)' } } }, plugins: [] } satisfies Config;
