const path = require('path')
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'loader1',
          'loader2',
          {
            loader: 'loader3',
            options: {
              name: 'test get options',
              age: 22,
            }
          }
        ]
      }
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname,'loaders')
    ]
  }
}