const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.js',  
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
  },
  plugins: [
  new CopyPlugin({
    patterns : [
      {from:"./CubismSdkForWeb/Core/live2dcubismcore.min.js", to : "./scripts/live2d/Core/live2dcubismcore.min.js"},
      {from:"./CubismSdkForWeb/Framework/dist", to : "./scripts/live2d/Framework", filter: (resourcePath) => {
        return resourcePath.endsWith(".js");
      }},
      {from:"./Live2DRender.js", to : "./scripts/live2d/Live2DRender.js" },
      {from:"./src/index.html", to : "./index.html"},
      {from:"./assets", to : "./assets"},
    ]
  })]
};
