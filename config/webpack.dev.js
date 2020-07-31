const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


const CONFIG = {
  //host: '192.168.3.2',
  host: 'localhost',
  port: 8082,
}


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    host: CONFIG.host,
    port: CONFIG.port,
    openPage: `http://${CONFIG.host}:${CONFIG.port}/`,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
});
