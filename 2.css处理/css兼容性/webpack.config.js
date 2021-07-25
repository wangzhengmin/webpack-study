const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({})
  ]
}