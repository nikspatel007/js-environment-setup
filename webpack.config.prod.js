import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate an external css file with a hash in the fileName.
    new ExtractTextPlugin('[name].[contenthash].css'),
    //Hashthe the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
    //Create HTML file that includes refernce to bundled JS.
    new HtmlwebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComponents: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    //Minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap')
      }
    ]
  }
}
