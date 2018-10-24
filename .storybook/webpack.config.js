const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.js$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: { parser: 'javascript' }
          }
        ],
        enforce: 'pre',
      },
    ],
  },
};