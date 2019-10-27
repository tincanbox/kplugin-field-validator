const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // webpack-dev-serverの公開フォルダ
    contentBase: path.join(__dirname,'dist')
  },
});
