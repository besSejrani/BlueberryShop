// i18n
// const nextTranslate = require("next-translate");

// Esbuild
const { ESBuildMinifyPlugin } = require("esbuild-loader");

function useEsbuildMinify(config, options) {
  const terserIndex = config.optimization.minimizer.findIndex(
    (minimizer) => minimizer.constructor.name === "TerserPlugin"
  );
  if (terserIndex > -1) {
    config.optimization.minimizer.splice(terserIndex, 1, new ESBuildMinifyPlugin(options));
  }
}

function useEsbuildLoader(config, options) {
  const jsLoader = config.module.rules.find((rule) => rule.test && rule.test.test(".js"));

  if (jsLoader) {
    jsLoader.use.loader = "esbuild-loader";
    jsLoader.use.options = options;
  }
}

module.exports = {
  webpack: (config, { isServer, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );

    useEsbuildMinify(config);

    useEsbuildLoader(config, {
      // Specify `tsx` if you're using TypeSCript
      loader: "tsx",
      target: "es2017",
    });

    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },

  // ...nextTranslate(),

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
