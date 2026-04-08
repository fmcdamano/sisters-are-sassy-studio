import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#3DBFB8",
          hover: "#2EA8A2",
          light: "#E8F9F8",
        },
        coral: {
          DEFAULT: "#E05C5C",
          hover: "#C94F4F",
          light: "#FCF0F0",
        },
        peach: {
          DEFAULT: "#F5C5A0",
          light: "#FEF4EC",
        },
        "off-white": "#FAF8F5",
        charcoal: "#2C2C2C",
        "light-gray": "#E8E8E8",
        "studio-error": "#EF4444",
        "studio-success": "#22C55E",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn: "10px",
      },
      maxWidth: {
        content: "1280px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
