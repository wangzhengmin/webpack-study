const { SyncHook, SyncBailHook,AsyncParallelHook, AsyncSeriesHook} = require('tapable');
class Lesson {
  constructor() {
    this.hooks = {
      go: new SyncHook(['name']),
      leave: new AsyncParallelHook(['name','age']), // 异步并行
      after: new AsyncSeriesHook(['name','age']), //异步并行
    }
  }
  tap() {
    this.hooks.go.tap('class', name => {
      console.log('0.hello word ', name)
    })
    this.hooks.leave.tapAsync('class2', (name,age,cb) => {
     setTimeout(()=> {
      console.log('1.my name is',name);
      console.log('1.my age is',age);
      cb()
     },2000)
    })
    this.hooks.leave.tapPromise('class2', (name,age,cb) => {
      return new Promise((resolve,reject)=>{
        setTimeout(()=> {
          console.log('2.my name is',name);
          console.log('2.my age is',age);
          resolve();
         },1000)
      })
    })
  }
  start() {
    this.hooks.go.call('wang');
    this.hooks.leave.callAsync('wang',22,function() {
      console.log('end')
    });
  }
}
let lesson = new Lesson();
lesson.tap();
lesson.start();