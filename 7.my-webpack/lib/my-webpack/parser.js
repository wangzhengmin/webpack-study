const babelParser = require('@babel/parser'); // 解析成AST 语法树
const fs = require('fs');
const traverse = require("@babel/traverse").default;  // 收集依赖
const { transformFromAst } = require("@babel/core");  // 
const path = require('path');

const parser = {
  // 获取AST
  getAst(filePath) {
    const file = fs.readFileSync(filePath, 'utf-8');
    // 2.将其解析成AST抽象语法树
    const AST = babelParser.parse(file, {
      sourceType: 'module' // 解析文件的模块化方案是 ES Module
    });
    return AST;
  },
  // 获取依赖
  getDeps(filePath, AST) {
    //获取到文件文件夹路径
    const dirname = path.dirname(filePath);

    // 存储依赖的容器
    const deps = {};
    // 收集依赖
    traverse(AST, {
      // 内部会遍历AST中program.body，判断里面语句类型
      // 如果 type: ImportDeclaration 就会触发当前函数
      ImportDeclaration({ node }) {
        // 相对路径
        const relativePath = node.source.value;
        //生成基于入口文件的绝对路径
        const absolutePath = path.resolve(dirname, relativePath);
        // 添加依赖
        deps[relativePath] = absolutePath;
      }
    })
    return deps;
  },
  // 解析AST
  getCode(AST) {
    // 编译代码： 将代码中浏览器不能识别的语法进行编译
    const { code } = transformFromAst(AST, null, {
      presets: ['@babel/preset-env']
    });
    return code;
  }
}
module.exports = parser;