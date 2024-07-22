// 江苏烟草统一邮件
const exportObj = {};
exportObj.initHandle = function (vueData) {
  vueData.alwaysShowStatus = true
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  console.log(4,itemValue)
  if(itemValue['UNIFY-DATA-0021']) {
    wx.invoke('openUrl', {
      "type": 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
      "url": itemValue['UNIFY-DATA-0021'] //url地址
    }, function(res){
        if (res.err_msg != "openUrl:ok") {
            //错误处理
        }
    });
  }else {
    dsf.layer.toast('无跳转地址')
  }
}
export default exportObj;
