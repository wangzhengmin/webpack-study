const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    test: './src/test.js'
  },
  /**
   * 可以将 node_modules 单独打包成一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'./dist')
  }
}