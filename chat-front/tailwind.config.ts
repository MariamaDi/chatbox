import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./composant/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      chat: {
        start: "flex-row-reverse",
        end: "flex-row",
        bubblePrimary: "bg-blue-500 text-white", // Exemple de classe pour le chat-bubble envoyé
        bubbleSecondary: "bg-gray-300 text-gray-700", // Exemple de classe pour le chat-bubble reçu
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
