
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  mode: 'production',
  target: ['web', 'es5'],
  entry: ['./src/main.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlInlineScriptPlugin(),
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$',
      template: "./src/index.html",
      minify: false,
    }),
  ]
}
