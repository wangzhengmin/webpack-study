## 懒加载
``` js
button.onclick = function(){
  import(/* webpackChunkName: 'test' */'./test.js').then(()=>{
    console.log("加载完毕")
  })
}
```

## 预加载
``` js
button.onclick = function(){
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test.js').then(()=>{
    console.log("加载完毕")
  })
}
```
不知道怎么回事没有生效