const fs = require("fs");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },

  i18n: {
    locales: ["en", "fr", "de"],
    defaultLocale: "en",
  },

  images: {
    domains: [
      "blueberryshop.s3.eu-west-3.amazonaws.com",
      "bessejrani.github.io",
      "mediatemple.net",
      "images.unsplash.com/",
    ],
  },

  poweredByHeader: false,
};
