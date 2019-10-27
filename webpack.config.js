MODE = 'development';

//
const path = require("path");
const KintonePlugin = require("@kintone/webpack-plugin-kintone-plugin");
const enabledSourceMap = MODE === "development";

//
module.exports = {
  mode: MODE,
  entry: {
    desktop: './src/script/hook/desktop.js',
    config: './src/script/hook/config.js',
    mobile: './src/script/hook/mobile.js',
  },
  output: {
    path: path.resolve(__dirname, 'src', '.build'),
    filename: '[name].js'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: MODE == 'development',
            }
          },

        ],
      },
    ],
  },
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './src/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin.zip'
    })
  ]
};
