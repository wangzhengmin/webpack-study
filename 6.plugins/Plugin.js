const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const webpack = require('webpack');
const {RawSource} = webpack.sources;
class Plugin{
  apply(complier) {
    complier.hooks.emit.tap('plugin',(compilation)=> {
      console.log('emit')
    })
    complier.hooks.afterEmit.tap('plugin',(compilation)=> {
      console.log('afterEmit')
    })
    complier.hooks.thisCompilation.tap('plugin',(compilation)=> {
      console.log('thisCompilation');
      compilation.hooks.additionalAssets.tapAsync('plugin',async (cb) => {
        let content = 'hello word';
        compilation.assets['test.txt'] = {
          size() {
            return content.length;
          },
          source() {
            return content
          }
        }
        let data = await readFile(path.resolve(__dirname,'study.md'));
        // compilation.assets['test.md'] = new RawSource(data);
        compilation.emitAsset('test.md',new RawSource(data));
        cb();
      })
    })
  }
}
module.exports = Plugin;