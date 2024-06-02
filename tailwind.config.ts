import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Pretendard"],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semiBold: "600",
      bold: "700",
    },
  },
  plugins: [],
};
export default config;
