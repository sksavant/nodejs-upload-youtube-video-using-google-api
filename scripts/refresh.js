#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

var youtube = require('../library/googleyoutube');
var youtube = new youtube();
fs = require('fs');



var toBaseString = function(var_name, val) {
  return 'exports.'+var_name+'="'+val+'";';
}

var printToJS = function (tokens, file) {
  var toString = function(key){ return toBaseString(key, tokens[key]);}
  string = toString('access_token') + '\n' + toString('refresh_token')
  fs.writeFile(file, string);

}

var tokens = youtube.fetchTokenFromFile();
//console.log(tokens['access_token'])
//console.log(tokens['expiry_date'])
//printToJS(tokens, 'token.js')

var new_tokens = youtube.refreshToken(tokens, function(){});
if (new_tokens){
  console.log(new_tokens)
  printToJS(new_tokens, '/Users/savant/Sites/australia-4-dolphins/cfg/token.js');
}
else{
  console.log('Same Tokens. No update');
}
