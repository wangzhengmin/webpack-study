
> `webpack.config.js` 配置

``` js
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({})
  ]
}
```

也可以使用 `postcss.config.js`

``` js
module.exports = {
  plugins: [
    require('postcss-preset-env')()
  ]
}
```
> `package.json` 中配置

``` json
 "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.2%",
      "not dead"
    ]
  } 
```