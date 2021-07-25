const {getAst,getCode,getDeps} = require('./parser');
const fs = require('fs');
const path = require('path');

class Compiler {
  constructor(options = {}) {
    // webpack 配置对象
    this.options = options;
    // 所有依赖的容器
    this.modules = [];
  }
  // 启动webpack 打包
  run() {
    // 1.读取入口文件内容
    const filePath = this.options.entry;
    // 第一次构建，得到入口文件的信息
    const fileInfo = this.build(filePath);
    this.modules.push(fileInfo);
    // 遍历所有依赖
    this.modules.forEach(fileInfo => {
      /**
       *  deps: {
            './add,js': 'D:\\interview\\webpack\\7.my-webpack\\src\\add,js',
            './count.js': 'D:\\interview\\webpack\\7.my-webpack\\src\\count.js'
          }, 
       */
      // 取出当前文件的所有依赖
      const deps = fileInfo.deps;
      // 遍历
      for(let relativePath in deps) {
        const absolutePath = deps[relativePath];
        const fileInfo = this.build(absolutePath);
        this.modules.push(fileInfo)
      }
    });
    // 将依赖整理成更好的依赖关系图
    const depsGraph =   this.modules.reduce((graph, module) => {
      return {
        ...graph,
        [module.filePath]: {
          code: module.code,
          deps: module.deps
        }
      }
    },{});
    this.generate(depsGraph);
  }
  build(filePath) {
    // 将文件解析成AST
    const Ast = getAst(filePath);
    // 收集依赖
    const deps = getDeps(filePath,Ast);
    // 将AST解析成code
    const code = getCode(Ast);
    return {
      filePath,
      deps,
      code
    }
  }
  // 生成输出资源
  generate(depsGraph) {
    console.log(depsGraph)
    const bundle = `
      (function(depsGraph){
        // 加载入口文件
        function require(module) {
          // 定义内部的require 函数
          function localRequire(relativePath) {
            return require(depsGraph[module].deps[relativePath])
          }
          var exports = {};
          (function(require,exports,code) {
            eval(code)
          })(localRequire,exports,depsGraph[module].code)
          return exports;
        }
        require("${this.options.entry}")
      })(${JSON.stringify(depsGraph)})
    `;
    const  filePath = path.resolve(this.options.output.path,this.options.output.filename);
    fs.writeFileSync(filePath,bundle,'utf-8')
  }
}

module.exports = Compiler;