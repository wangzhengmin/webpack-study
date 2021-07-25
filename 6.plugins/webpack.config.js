// const Plugin = require('./Plugin');
const CopyWebpackPlugin = require('./CopyWebpackPlugin.js')
module.exports = {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html']
    })
  ]
}