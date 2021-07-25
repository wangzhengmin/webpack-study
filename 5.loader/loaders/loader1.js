// loader 本质是一个函数

/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
 function webpackLoader(content, map, meta) {
  console.log('loader 1')
  return `console.log('loader 1')`;
  // 你的 webpack loader 代码
}


module.exports = webpackLoader;
module.exports.pitch = function() {
  console.log('loader1 pitch')
}