const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.js',  
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
  },
  resolve: { roots: [ path.resolve('./src') ] },
  plugins: [
  new CopyPlugin({
    patterns : [
      {from:"./CubismSdkForWeb/Core/live2dcubismcore.min.js", to : "./scripts/live2d/Core/live2dcubismcore.min.js"},
      {from:"./src/index.html", to : "./index.html"},
      {from:"./assets", to : "./assets"},
    ]
  })]
};
