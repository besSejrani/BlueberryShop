// const withPlugins = require("next-compose-plugins");

// const withMDX = require("@next/mdx")({
//   extension: /\.mdx$/,
// });

// const nextConfig = {
//   images: {
//     domains: ["blueberryshop.s3.eu-west-3.amazonaws.com"],
//   },
//   poweredByHeader: false,
// };

// module.exports = withPlugins(
//   [
//     // [
//     //   withMDX,
//     //   {
//     //     pageExtensions: ["js", "jsx", "md", "mdx"],
//     //   },
//     // ],

//   ],
//   nextConfig
// );

module.exports = {
  webpack: (config, { isServer }) => {
    // console.log({ config });
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = { fs: "empty" };
    }
    return config;
  },

  images: {
    domains: [
      "blueberryshop.s3.eu-west-3.amazonaws.com",
      "bessejrani.github.io",
      "mediatemple.net",
      "images.unsplash.com/",
    ],
  },
};
