## 打包样式
- css-loader
- sass-loader
- style-loader

``` js
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
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
```

## 打包html

`npm install html-webpack-plugin --save-dev`

自动生成 html并引入打包后的js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: '打包样式'
    })
  ]
}
```

## 打包图片

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource'
      }
    ]
  }
}
```

## 打包字体文件

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      }
    ]
  }
}
```
