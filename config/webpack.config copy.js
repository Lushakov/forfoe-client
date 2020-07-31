const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const webpack = require('webpack');


const PATHS = {
    dist:  path.join(__dirname, './dist'),
}


const CONFIG = {
  //host: '192.168.3.2',
  host: 'localhost',
  port: 8082,
}


module.exports = {
  entry:  {
    UI: path.join(__dirname, './UI/src/index.js'),
  },
  output: {
    filename: `js/[name].js`,
    path: PATHS.dist,
    publicPath: './'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: 
        {
            name: '[path][name].[ext]'
        }
      }, 
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, url: false }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
    }),

    new HtmlWebpackPlugin({
      //hash: false,
      path: PATHS.dist,
      template: path.join(__dirname, './index.html'),
      filename: `${PATHS.dist}/index.html`,
      chunks: ['index']
    }),
    
    new webpack.HotModuleReplacementPlugin(),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),

    //new CopyWebpackPlugin([
      //{ from: `${PATHS.src}/[name]/img`, to: `${PATHS.dist}/[name]/img` },
      // { from: `${PATHS.src}/static`, to: '' },
    //])
  ],


  
  devtool: 'eval-source-map',
  devServer: {
    contentBase:  PATHS.dist,
    publicPath: '/',
    host: CONFIG.host,
    port: CONFIG.port,
    openPage: `http://${CONFIG.host}:${CONFIG.port}/`,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}