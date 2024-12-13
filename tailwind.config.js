/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This tells Tailwind to scan all HTML and TypeScript files
  ],
  theme: {
    extend: {
      // Here we can extend Tailwind's default theme
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      // Custom colors if needed
      colors: {
        'brand-blue': '#3182ce',
        'brand-gray': '#4a5568',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
