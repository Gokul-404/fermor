import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#14161a", muted: "#6b6f76", line: "#e7e4dd", paper: "#faf9f6", accent: { DEFAULT: "#1d5c4b", soft: "#e8f0ec" } },
      borderRadius: { card: "10px" },
    },
  },
  plugins: [],
};
export default config;
