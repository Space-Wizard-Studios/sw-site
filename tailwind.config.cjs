const defaultTheme = require('tailwindcss/defaultTheme');
// const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./src/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {
			colors: {
				'sw': {
					'primary': {
						DEFAULT: '#100E32',
						50: '#DCDBF5',
						100: '#BEBBEC',
						200: '#7974D8',
						300: '#3C35BF',
						400: '#262178',
						500: '#100E32',
						600: '#0D0B28',
						700: '#0A0920',
						800: '#060614',
						900: '#04030C',
					},

					'secondary': {
						DEFAULT: '#FCFCFC',
						50: '#FCFCFC',
						100: '#FAFAFA',
						200: '#F2F2F2',
						300: '#EDEDED',
						400: '#E8E8E8',
						500: '#E1E1E1',
						600: '#DEDEDE',
						700: '#DBDBDB',
						800: '#D9D9D9',
						900: '#D6D6D6'
					},

					'flamingo': {
						DEFAULT: '#FF62F2',
						50: '#FFF5FE',
						100: '#FFEBFD',
						200: '#FFD1FB',
						300: '#FFB8F9',
						400: '#FF94F6',
						500: '#FF62F2',
						600: '#FF29ED',
						700: '#E600D2',
						800: '#C200B2',
						900: '#8A007E'
					},

					'coal': {
						DEFAULT: '#1B2026',
						50: '#E4E8EC',
						100: '#CCD3DB',
						200: '#97A4B5',
						300: '#66788F',
						400: '#404B59',
						500: '#1B2026',
						600: '#15191E',
						700: '#111418',
						800: '#0B0D0F',
						900: '#060809'
					},

					'navy': {
						DEFAULT: '#005CE6',
						"50": "#F0F6FF",
						"100": "#E0EDFF",
						"200": "#B8D4FF",
						"300": "#8AB9FF",
						"400": "#5297FF",
						"500": "#005CE6",
						"600": "#0058DB",
						"700": "#0050C7",
						"800": "#0049B8",
						"900": "#0043A8"
					},
					'neon-yellow': {
						DEFAULT: '##f7f701'
					},
					'neon-green': {
						DEFAULT: '#a8f72e'
					}

				}
			},
			fontFamily: {
				sans: ["'Roboto'", ...defaultTheme.fontFamily.sans],
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio'),
		require('daisyui'),
	],
	darkMode: 'class',

	// daisyUI config (optional)
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'dark',
	},
};
