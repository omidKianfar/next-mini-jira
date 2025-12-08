/** @type {import('tailwindcss').Config} */

import { Colors } from "./src/theme/colors";
import { FontSize } from "./src/theme/fon-size";
import { BorderRadius } from "./src/theme/border-radius";
import { BoxShadow } from "./src/theme/box-shadow";

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: Colors,
      fontFamily: {
        sans: ["Poppins", "Inter", "Outfit", "system-ui", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      fonSize: FontSize,
      borderRadius: BorderRadius,
      boxShadow: BoxShadow,
    },
  },
  plugins: [],
};
