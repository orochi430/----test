cordova.define("xsf.IFlytekSpeechRecognition", function(require, exports, module) {
var exec = require('cordova/exec');


/**
arg0 :{ UIType: "IFlyUI" }
IFlyUI 使用讯飞弹窗UI
*/
var IFlytekSpeechRecognition = {
    SpeechRecognition:function(arg0) {//绑定
        exec(null, null, "IFlytekSpeechRecognition", "SpeechRecognition", [arg0]);
    },
    SpeechRecognition:function(arg0,success,fail) {//绑定
       exec(success, fail, "IFlytekSpeechRecognition", "SpeechRecognition", [arg0]);
    },
};

module.exports = IFlytekSpeechRecognition;
});