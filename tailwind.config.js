/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        asphalt: "#232326",
        asphalt2: "#2E2E32",
        signal: "#F2C200",
        signalDark: "#D9AE00",
        road: "#4C1D75",
        roadLight: "#6B3AA0",
        paper: "#FFFFFF",
        chalk: "#EFEFF0",
        chalkLine: "#DADADD",
        slate: "#5B5B60",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["\"Work Sans\"", "sans-serif"],
        plate: ["\"Space Mono\"", "monospace"],
      },
      backgroundImage: {
        lanes: "repeating-linear-gradient(90deg, currentColor 0px, currentColor 28px, transparent 28px, transparent 52px)",
      },
      keyframes: {
        drive: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "160px 0" },
        },
      },
      animation: {
        drive: "drive 6s linear infinite",
      },
    },
  },
  plugins: [],
};
