/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0D14",
        surface: "#111827",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        "surface-hover": "#1F2937",
        slate: {
          850: "#151F30",
          900: "#0F172A",
          950: "#0A0E1A",
        },
        accent: {
          blue: "#3B82F6",
          cyan: "#0ea5e9",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#EF4444",
        }
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        "subtle": "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)",
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)",
        "panel": "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-subtle": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
};
