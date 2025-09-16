/** @type {import('next').NextConfig} */

const path = require("path");
pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"];

const nextConfig = {
  output: "standalone",

  images: {
    domains: [
      "https://mjj7661.bsite.net",
      "localhost",
      "trustseal.enamad.ir",
      "api.codedevelopers.ir",
      "zibal.ir",
    ],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mjj7661.bsite.net",
        pathname: "/api/Images/**",
      },
    ],
  },
  // other settings...
  webpack(config) {
    let hasFound = false;

    for (let i = 0; i < config.module.rules.length; i++) {
      const rule = config.module.rules[i];

      if (!rule.oneOf) continue;

      rule.oneOf.forEach((one) => {
        if (!`${one.issuer?.and}`.includes("_app")) return;
        one.issuer.and = [path.resolve(__dirname)];
        hasFound = true;
      });

      if (hasFound) break;
    }
    return config;
  },
};

module.exports = nextConfig;
