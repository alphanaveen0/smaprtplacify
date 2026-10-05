/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#050B1A",
        surface: "#071126",
        card: "#0B1730",
        purple: "#7C3AED",
        blue: "#2563EB",
        cyan: "#06B6D4",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        muted: "#94A3B8"
      }
    }
  },
  plugins: []
};
