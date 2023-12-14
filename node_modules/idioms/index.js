var fs = require('fs')
var path = require('path')

var Idioms = {
  getIdioms: getIdioms
}

function getIdioms(callback){
  idioms = []
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/idioms.txt')
  });

  rl.on('line', function(line) {
    idioms.push(line)
  });
  rl.on('close', function(){
    callback(idioms)
  })
}

module.exports = Idioms
