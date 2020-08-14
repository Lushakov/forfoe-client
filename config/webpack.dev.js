const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


const CONFIG = {
  //host: '192.168.1.73',
  //host: '0.0.0.0',
  host: '172.27.208.2',
  port:8082,
}


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
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
