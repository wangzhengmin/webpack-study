
      (function(depsGraph){
        console.log(typeof depsGraph)
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
        require("./src/index.js")
      })({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log((0, _add.default)(1, 2));\nconsole.log((0, _count.default)(3, 5));","deps":{"./add.js":"D:\\interview\\webpack\\7.my-webpack\\src\\add.js","./count.js":"D:\\interview\\webpack\\7.my-webpack\\src\\count.js"}},"D:\\interview\\webpack\\7.my-webpack\\src\\add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction add(x, y) {\n  return x + y;\n}\n\nvar _default = add;\nexports.default = _default;","deps":{}},"D:\\interview\\webpack\\7.my-webpack\\src\\count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction count(x, y) {\n  return x - y;\n}\n\nvar _default = count;\nexports.default = _default;","deps":{}}})
    