console.log('main 加载');
let button = document.createElement('button');
button.innerHTML = 'hello word';
button.onclick = function(){
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test.js').then(()=>{
    console.log("加载完毕")
  })
}
document.documentElement.appendChild(button)