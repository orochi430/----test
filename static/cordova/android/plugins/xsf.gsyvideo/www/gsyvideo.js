cordova.define("gsyvideo", function(require, exports, module) {
var exec = require('cordova/exec');


var GSYVideoPlugin = {
   play:function(arg0) { //打开播放页面
        exec(null, null, "GSYVideoPlugin", "play", [arg0]);
    },
     close:function(arg0) { //关闭播放页面
            exec(null, null, "GSYVideoPlugin", "close", [arg0]);
        }

};

module.exports = GSYVideoPlugin;
});
