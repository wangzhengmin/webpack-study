## 压缩css
使用 `css-minimizer-webpack-plugin` 插件

`webpack.config.js` 配置

``` js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
}
```