const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js',
    test: './src/test.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'./dist')
  }
}