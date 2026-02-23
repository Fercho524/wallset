export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "on-primary": "var(--color-on-primary)",

        secondary: "var(--color-secondary)",
        "on-secondary": "var(--color-on-secondary)",

        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
      }
    }
  }
};