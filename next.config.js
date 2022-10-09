const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
  rewrites: async () => {
    return [
      {
        source: "/panel-bear-analytics.js",
        destination: "https://cdn.panelbear.com/analytics.js",
      },
    ];
  },
};

module.exports = nextConfig;
