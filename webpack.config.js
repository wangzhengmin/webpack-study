const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');  // 体积分析
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动构建index.html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 打包成单独文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename:"[name].[contenthash].js",
    path: path.resolve(__dirname,'./dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    // 项目构建后路径
    contentBase: path.resolve(__dirname,'./dist'),
     // 启动gzip压缩
     compress: true,
     // 端口号
     port: 3000,
     // 自动打开浏览器
     open: true,
     hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',"sass-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    // 自动构建html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    // 体积分析
    new BundleAnalyzerPlugin({
      analyzerPort: 8889, // 指定端口号
      openAnalyzer: false,
    }),
    // 将css 打包成单独文件
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    })
  ],
  optimization: {
    // 压缩css
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
}