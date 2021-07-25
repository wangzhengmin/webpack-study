const { validate } = require('schema-utils');
const schema = require('./schema.json');
const path  = require('path');
const fs = require('fs');
const webpack = require('webpack');
const {RawSource} = webpack.sources;
const globby = require('globby');
const util = require('util');
const readFile = util.promisify(fs.readFile);

class CopyPlugin{
  constructor(options = {}) {
    console.log(options)
    validate(schema, options, {
      name: 'CopyPlugin'
    })
    this.options = options;
  }
  apply(complier) {
    complier.hooks.thisCompilation.tap('CopyPlugin', compilation => {
      compilation.hooks.additionalAssets.tapAsync('CopyPlugin',async (cb)=> {
        const { from, ignore } = this.options;
        const to = this.options.to ? this.options.to : '.';
        const context = complier.options.context; // 运行指令的目录
        // 将输入路径变成绝对路径
        const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context,from);
        // 绝对路径不行 不知道怎么回事
        const paths = await globby(from,{ignore});
        
        // 读取文件
        let files =await Promise.all(
          paths.map(async (dir)=>{
            let dirPath =  path.isAbsolute(dir) ? dir : path.resolve(context,dir)
            let data = await readFile(dirPath);
            let filename = path.join(to,path.basename(dirPath))
            
            return {
              data,
              filename,
            }
          })
        )
        //  生成webpack 格式的资源
        const assets = files.map(file=> {
          let source = new RawSource(file.data);
          return {
            source,
            filename: file.filename
          }
        });
        // 添加资源
        assets.forEach(asset => {
          compilation.emitAsset(asset.filename, asset.source);
        })
        cb();
      })
    })
  }
}
module.exports = CopyPlugin;