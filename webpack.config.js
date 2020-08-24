////"dev": "webpack-dev-server --config config/webpack.dev.js",
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const webpack = require('webpack');



const PATHS = {
    //src:  path.join(__dirname, './src'),
    dist:  path.resolve(__dirname, '../dist'),
}

const CONFIG = {
  //host: '192.168.3.2',
  host: 'localhost',
  port: 8082,
}



module.exports = {
  //context: PATHS.src,
  entry: path.resolve(__dirname, '../UI/src/index.js'),
  output: {
    filename: `[name]/[name].js`,
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
        //test: /\.css$/,
        //test: /\.(sa|sc|c)ss$/,
        test: /\.(sa|sc)ss$/,
        use: [
          'style-loader',
          //MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
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
          //'resolve-url-loader',
          {
            loader: 'sass-loader',
          },
        ]
      },
      
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `public/css/[name].css`,
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
    /*proxy: [
      {
        context: ['/api',],
        target: 'http://localhost:3001',
      },
      {
        context: ['/', '/mapeditor', '/points', '/navigator'],
        target: `http://${CONFIG.host}:${CONFIG.port}/index.html`,
        pathRewrite: {
          '^/mapeditor': '', 
          '^/points': '',
          '^/navigator': ''
        },
      }
    ], */
    //hot: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

//${PATHS.assets}js/
///[name]/index.html