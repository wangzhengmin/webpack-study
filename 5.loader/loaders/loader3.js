const {getOptions} = require('loader-utils'); // 获取options 库
const {validate} = require("schema-utils"); // 验证options 是否规范

const schema = require('./schema.json');
validate(schema,{name: 'efsaf'},{
  name: 'loader3'
})

module.exports = function(content,map,meta) {
  let callback  = this.async();
  // 获取options
  let options = getOptions(this);
  // 校验 options
 
  console.log(options)
  setTimeout(()=>{
    console.log('异步 loader 3');
    callback(null,content,map,meta)
  },1000)
}


module.exports.pitch = function() {
  console.log('loader3 pitch')
  return 'loader3 pitch'
}