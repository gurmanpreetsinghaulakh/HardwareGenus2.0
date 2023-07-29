/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      domains: ['cdn.mos.cms.futurecdn.net','cdn.vox-cdn.com','cdn.wccftech.com','s.yimg.com','www.freepnglogos.com'], // Add the domain here
    },


  plugins: [
    // restore the Next.js default behavior
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      // configure PurgeCSS
      "@fullhuman/postcss-purgecss",
      {
        content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ["html", "body"],
        },
      },
    ],
  ]
};