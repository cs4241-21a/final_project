const colors = require("tailwindcss/colors");

module.exports = {
	purge: {
		enabled: true,
		content: ["./public/*.html", "./public/js/*.js", "./node_modules/@themesberg/tailwind-datepicker/**/*.*"]
	},
	darkMode: false,
	theme: {
		extend: {
			animation: {
				'spin-reverse': 'reverse-spin 1s linear infinite'
			},
			keyframes: {
				'reverse-spin': {
					from: {
						transform: 'rotate(360deg)'
					}
				}
			}
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",

			black: colors.black,
			white: colors.white,
			gray: colors.coolGray,
			red: colors.red,
			rose: colors.rose,
			yellow: colors.yellow,
			amber: colors.amber,
			emerald: colors.emerald,
			green: colors.green,
			trueBlue: colors.blue,
			sky: colors.sky,
			indigo: colors.indigo,
			purple: colors.purple,
			violet: colors.violet,
			pink: colors.pink,
			warmGray: colors.warmGray,
			myGreen: {
				100: "#d2ffe6",
				400: "#63D397",
				500: "#51BC83",
				600: "#3EB575",
				700: "#359A63",
				800: "#2b8656",
				900: "#246A45"
			},
			blue: {
				100: "#d2ffe6",
				400: "#63D397",
				500: "#51BC83",
				700: "#3EB575",
				800: "#359A63",
				900: "#2b8656",
			},
			theme: {
				100: "#d2ffe6",
				400: "#63D397",
				500: "#51BC83",
				600: "#3EB575",
				700: "#359A63",
				800: "#2b8656",
				900: "#246A45"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require("tailwindcss"),
		require("autoprefixer"),
		require("@tailwindcss/forms")
	]
};
