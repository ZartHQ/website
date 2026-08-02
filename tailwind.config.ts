import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        zart: {
          green: "#015A2F",
          "green-dark": "#014022",
          ink: "#0C1E22",
          body: "#323233",
          line: "#E4E2DC",
          mist: "#F7F6F3",
          gold: "#FFC600",
          error: "#B42318",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"]
      },
    },
  },
  plugins: [],
} satisfies Config;
