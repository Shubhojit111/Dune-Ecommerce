/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Palette pulled from Dune's own product copy (oat, sand, sage, taupe, camel, charcoal)
        cream: "#F5F0E6",
        sand: "#E4D8C3",
        oat: "#DCCBAE",
        taupe: "#A98F72",
        sage: "#8C9484",
        camel: "#B0794A",
        charcoal: "#2B2620",
        ink: "#1E1B17",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      letterSpacing: {
        widest2: ".22em",
      },
    },
  },
  plugins: [],
};
