/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				"bounce-slow": "bounce 3s linear infinite",
			},
			backdropBlur: {
				xs: "2px",
			},
			boxShadow: {
				"3xl": "0 35px 60px -12px rgba(0, 0, 0, 0.25)",
			},
		},
	},
	plugins: [],
};
