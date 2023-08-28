const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  entry: './src/main.ts', // プロジェクトのエントリーファイルを指定
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }, 
  plugins: [
    new HtmlInlineScriptPlugin(),
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$',
      template: "./src/index.html",
      minify: false,
    }),
  ]
};
