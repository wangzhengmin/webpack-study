const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'./dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        type: "asset/resource"
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '打包样式'
    })
  ]
}