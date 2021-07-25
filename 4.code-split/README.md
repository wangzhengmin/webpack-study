## 代码分割

> 配置多入口
``` js
  entry: {
    main: './src/main.js',
    test: './src/test.js',
  },
```

> 使用`optimization`
``` js
  /**
   * 可以将 node_modules 单独打包成一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
```

> 使用`import()`动态导入
``` js
import('./test.js');
```