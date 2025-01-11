import { Config } from 'tailwindcss';

// const defaultTheme = require("tailwindcss/defaultTheme");
// const colors = require("tailwindcss/colors");
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";


const tailwindConfig: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    // Define your theme configurations here
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any): void {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]: [string, any]) => [`--${key}`, val])
  );
  addBase({
    ":root": newVars,
  });
}

export default tailwindConfig;
