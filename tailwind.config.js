/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}", // ✅ Includes all files in the app folder
    "./index.{ts,tsx}", // ✅ Ensures root files are scanned
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
