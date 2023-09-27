const CopyPlugin = require("copy-webpack-plugin");
var path = require('path');

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
    new CopyPlugin({
      patterns : [
        {from:"./CubismSdkForWeb/Core/live2dcubismcore.min.js", to : "./live2dcubismcore.min.js"},
        {from:"./src/index.html", to : "./index.html"},
        {from:"./src/style.css", to : "./style.css"},
        {from:"./assets", to : "./assets"},
      ]
    })
  ]
}
